"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCategories, getHouseholdContext, type TransactionType } from "@/lib/finance";
import { createClient } from "@/utils/supabase/server";

const seedMarker = "seed:month-demo-2024";

const seedTransactions = [
  ["2024-02-01", "Gehalt Februar", "income", 345000, "Gehalt"],
  ["2024-02-04", "Miete", "expense", 78000, "Wohnen"],
  ["2024-02-08", "REWE Wocheneinkauf", "expense", 8640, "Lebensmittel"],
  ["2024-02-14", "Tankstelle", "expense", 6220, "Mobilitaet"],
  ["2024-02-21", "Kino und Essen", "expense", 7450, "Freizeit"],
  ["2024-03-01", "Gehalt Maerz", "income", 345000, "Gehalt"],
  ["2024-03-05", "Miete", "expense", 78000, "Wohnen"],
  ["2024-03-09", "Edeka", "expense", 10230, "Lebensmittel"],
  ["2024-03-15", "Autowerkstatt", "expense", 18800, "Mobilitaet"],
  ["2024-03-25", "Versicherung", "expense", 11200, "Versicherungen"],
  ["2024-04-01", "Gehalt April", "income", 345000, "Gehalt"],
  ["2024-04-03", "Freelance Projekt", "income", 42000, "Nebenverdienst"],
  ["2024-04-04", "Miete", "expense", 78000, "Wohnen"],
  ["2024-04-10", "Lidl", "expense", 9340, "Lebensmittel"],
  ["2024-04-17", "Bahn Monatskarte", "expense", 6900, "Mobilitaet"],
  ["2024-04-28", "Konzert", "expense", 12900, "Freizeit"],
  ["2024-05-01", "Gehalt Mai", "income", 345000, "Gehalt"],
  ["2024-05-04", "Miete", "expense", 78000, "Wohnen"],
  ["2024-05-07", "REWE", "expense", 6748, "Lebensmittel"],
  ["2024-05-13", "Aral Tankstelle", "expense", 5422, "Mobilitaet"],
  ["2024-05-20", "Streaming-Abos", "expense", 3299, "Freizeit"],
  ["2024-05-24", "Haftpflicht", "expense", 2100, "Versicherungen"],
  ["2024-06-01", "Gehalt Juni", "income", 352000, "Gehalt"],
  ["2024-06-04", "Miete", "expense", 78000, "Wohnen"],
  ["2024-06-08", "Edeka", "expense", 11920, "Lebensmittel"],
  ["2024-06-16", "Tankstelle", "expense", 7110, "Mobilitaet"],
  ["2024-06-22", "Kurztrip", "expense", 23600, "Freizeit"],
  ["2024-07-01", "Gehalt Juli", "income", 352000, "Gehalt"],
  ["2024-07-04", "Miete", "expense", 78000, "Wohnen"],
  ["2024-07-09", "Aldi", "expense", 8840, "Lebensmittel"],
  ["2024-07-19", "Sommerfest", "expense", 6800, "Freizeit"],
  ["2024-07-27", "Inspektion", "expense", 15900, "Mobilitaet"],
  ["2024-08-01", "Gehalt August", "income", 352000, "Gehalt"],
  ["2024-08-04", "Miete", "expense", 78000, "Wohnen"],
  ["2024-08-11", "REWE", "expense", 9730, "Lebensmittel"],
  ["2024-08-18", "Benzin", "expense", 6380, "Mobilitaet"],
  ["2024-08-25", "Freizeitpark", "expense", 18400, "Freizeit"],
] satisfies Array<
  [
    transactionDate: string,
    title: string,
    type: TransactionType,
    amountCents: number,
    categoryName: string,
  ]
>;

export async function seedDemoTransactions() {
  if (process.env.NODE_ENV === "production") {
    redirect("/settings?error=Testdaten%20sind%20nur%20lokal%20verfuegbar.");
  }

  const context = await getHouseholdContext();
  const categories = await getCategories(context.householdId);
  const categoryByName = new Map(
    categories.map((category) => [category.name, category.id]),
  );
  const supabase = await createClient();
  const timestamp = new Date().toISOString();

  const { error: deleteError } = await supabase
    .from("transactions")
    .update({
      deleted_at: timestamp,
      updated_at: timestamp,
    })
    .eq("household_id", context.householdId)
    .eq("note", seedMarker)
    .is("deleted_at", null);

  if (deleteError) {
    redirect(`/settings?error=${encodeURIComponent(deleteError.message)}`);
  }

  const { error: insertError } = await supabase.from("transactions").insert(
    seedTransactions.map(([transactionDate, title, type, amountCents, categoryName]) => ({
      household_id: context.householdId,
      created_by: context.userId,
      paid_by: context.userId,
      type,
      amount_cents: amountCents,
      currency: "EUR",
      title,
      category_id: categoryByName.get(categoryName) ?? null,
      transaction_date: transactionDate,
      note: seedMarker,
    })),
  );

  if (insertError) {
    redirect(`/settings?error=${encodeURIComponent(insertError.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/transactions");
  revalidatePath("/settings");
  redirect("/settings?message=Testdaten%20wurden%20angelegt.");
}
