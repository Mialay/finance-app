"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getHouseholdContext, type TransactionType } from "@/lib/finance";
import { createClient } from "@/utils/supabase/server";

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseAmountToCents(value: string) {
  const normalized = value.replace(/\s/g, "").replace(",", ".");
  const amount = Number(normalized);

  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }

  return Math.round(amount * 100);
}

function isTransactionType(value: string): value is TransactionType {
  return value === "income" || value === "expense";
}

function getSafeMonth(formData: FormData) {
  const month = readString(formData, "month");
  return /^\d{4}-\d{2}$/.test(month) ? month : "";
}

function getSafePeriodParams(formData: FormData) {
  const params = new URLSearchParams();
  const view = readString(formData, "view");
  const year = readString(formData, "year");
  const month = getSafeMonth(formData);
  const quarter = readString(formData, "quarter");

  if (view === "month" || view === "quarter" || view === "year") {
    params.set("view", view);
  }

  if (/^\d{4}$/.test(year)) {
    params.set("year", year);
  }

  if (month) {
    params.set("month", month);
  }

  if (/^[1-4]$/.test(quarter)) {
    params.set("quarter", quarter);
  }

  return params;
}

function buildTransactionsRedirect(
  type: "error" | "message",
  message: string,
  periodParams?: URLSearchParams,
) {
  const params = new URLSearchParams(periodParams);

  params.set(type, message);

  return `/transactions?${params.toString()}`;
}

function redirectWithError(message: string, periodParams?: URLSearchParams) {
  redirect(buildTransactionsRedirect("error", message, periodParams));
}

export async function createTransaction(formData: FormData) {
  const periodParams = getSafePeriodParams(formData);
  const title = readString(formData, "title");
  const type = readString(formData, "type");
  const amountCents = parseAmountToCents(readString(formData, "amount"));
  const transactionDate = readString(formData, "transaction_date");
  const categoryId = readString(formData, "category_id");
  const note = readString(formData, "note");

  if (!title) {
    redirectWithError("Bitte gib einen Titel ein.", periodParams);
  }

  if (!isTransactionType(type)) {
    redirectWithError("Bitte waehle Einnahme oder Ausgabe.", periodParams);
  }

  if (!amountCents) {
    redirectWithError("Bitte gib einen gueltigen Betrag ein.", periodParams);
  }

  if (!transactionDate) {
    redirectWithError("Bitte waehle ein Datum.", periodParams);
  }

  const context = await getHouseholdContext();
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert({
    household_id: context.householdId,
    created_by: context.userId,
    paid_by: context.userId,
    type,
    amount_cents: amountCents,
    title,
    category_id: categoryId || null,
    transaction_date: transactionDate,
    note: note || null,
  });

  if (error) {
    redirectWithError(error.message, periodParams);
  }

  revalidatePath("/transactions");
  revalidatePath("/");
  redirect(
    buildTransactionsRedirect("message", "Buchung gespeichert.", periodParams),
  );
}

export async function deleteTransaction(formData: FormData) {
  const periodParams = getSafePeriodParams(formData);
  const transactionId = readString(formData, "transaction_id");

  if (!transactionId) {
    redirectWithError("Die Buchung konnte nicht gefunden werden.", periodParams);
  }

  const context = await getHouseholdContext();
  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", transactionId)
    .eq("household_id", context.householdId)
    .is("deleted_at", null);

  if (error) {
    redirectWithError(error.message, periodParams);
  }

  revalidatePath("/transactions");
  revalidatePath("/");
  redirect(
    buildTransactionsRedirect("message", "Buchung geloescht.", periodParams),
  );
}
