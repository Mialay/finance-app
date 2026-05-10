"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getSafeNextPath(formData: FormData) {
  const next = getString(formData, "next");

  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }

  return next;
}

function redirectWithMessage(
  path: string,
  type: "error" | "message",
  message: string,
) {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export async function login(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = getSafeNextPath(formData);

  if (!email || !password) {
    redirectWithMessage("/login", "error", "E-Mail und Passwort sind Pflicht.");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectWithMessage("/login", "error", error.message);
  }

  redirect(next);
}

export async function signup(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const confirmPassword = getString(formData, "confirmPassword");
  const origin = (await headers()).get("origin");

  if (!email || !password || !confirmPassword) {
    redirectWithMessage(
      "/signup",
      "error",
      "E-Mail und beide Passwortfelder sind Pflicht.",
    );
  }

  if (password.length < 8) {
    redirectWithMessage(
      "/signup",
      "error",
      "Das Passwort muss mindestens 8 Zeichen haben.",
    );
  }

  if (password !== confirmPassword) {
    redirectWithMessage(
      "/signup",
      "error",
      "Die Passwoerter stimmen nicht ueberein.",
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) {
    redirectWithMessage("/signup", "error", error.message);
  }

  redirectWithMessage(
    "/login",
    "message",
    "Registrierung angelegt. Pruefe ggf. dein E-Mail-Postfach und melde dich danach an.",
  );
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login?message=Du%20bist%20abgemeldet.");
}
