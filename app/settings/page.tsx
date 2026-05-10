import { Database, Settings } from "lucide-react";
import { logout } from "@/app/auth/actions";
import { seedDemoTransactions } from "@/app/settings/actions";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

type SettingsPageProps = {
  searchParams?: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("finance_app_smoke_test")
    .select("id,message,created_at")
    .limit(1)
    .maybeSingle();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-4">
      <PlaceholderPage
        title="Einstellungen"
        description="Hier werden spaeter Profil, Haushaltsmitglieder, Benachrichtigungen und App-Einstellungen verwaltet."
        icon={Settings}
        items={["Profil", "Haushalt", "Benachrichtigungen"]}
      />

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div
            className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${
              error ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <Database className="size-6" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-bold">Supabase Smoke Test</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Live-Lesezugriff auf public.finance_app_smoke_test.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4">
          {error ? (
            <div>
              <p className="text-sm font-semibold text-red-600">
                Supabase konnte nicht gelesen werden.
              </p>
              <p className="mt-2 break-words text-sm text-slate-600">
                {error.message}
              </p>
            </div>
          ) : data ? (
            <div className="grid gap-3 text-sm md:grid-cols-3">
              <div>
                <p className="font-medium text-slate-500">Status</p>
                <p className="mt-1 font-bold text-emerald-700">Verbunden</p>
              </div>
              <div>
                <p className="font-medium text-slate-500">Testzeile</p>
                <p className="mt-1 font-bold">{data.message}</p>
              </div>
              <div>
                <p className="font-medium text-slate-500">ID</p>
                <p className="mt-1 font-bold">{data.id}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold text-amber-700">
              Verbindung steht, aber die Testtabelle ist leer.
            </p>
          )}
        </div>
      </section>

      {params?.message ? (
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {params.message}
        </div>
      ) : null}

      {params?.error ? (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {params.error}
        </div>
      ) : null}

      {process.env.NODE_ENV !== "production" ? (
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Demo-Daten</h2>
              <p className="mt-1 text-sm text-slate-500">
                Legt Testbuchungen von Februar bis August 2024 fuer deinen
                Haushalt an.
              </p>
            </div>
            <form action={seedDemoTransactions}>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-500 px-4 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                Testdaten anlegen
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Sitzung</h2>
            <p className="mt-1 text-sm text-slate-500">
              Angemeldet als {user?.email ?? "unbekannter Nutzer"}.
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Abmelden
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
