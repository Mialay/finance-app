import Link from "next/link";
import { UserPlus, Wallet } from "lucide-react";
import { signup } from "@/app/auth/actions";

type SignupPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f8] px-4 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Wallet className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Registrieren</h1>
            <p className="text-sm text-slate-500">Konto fuer Finanzen anlegen</p>
          </div>
        </div>

        {params?.error ? (
          <div className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {params.error}
          </div>
        ) : null}

        <form action={signup} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-slate-700"
            >
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-slate-700"
            >
              Passwort wiederholen
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            <UserPlus className="size-4" />
            Konto anlegen
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Schon registriert?{" "}
          <Link href="/login" className="font-bold text-emerald-700">
            Anmelden
          </Link>
        </p>
      </section>
    </main>
  );
}
