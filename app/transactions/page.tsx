import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarDays,
  CircleDollarSign,
  ReceiptText,
  Trash2,
} from "lucide-react";
import {
  createTransaction,
  deleteTransaction,
} from "@/app/transactions/actions";
import {
  getCategories,
  getHouseholdContext,
  getTransactions,
  type Category,
  type HouseholdContext,
  type Transaction,
} from "@/lib/finance";
import {
  getPeriod,
  isInPeriod,
  type Period,
} from "@/lib/period";

type TransactionsPageProps = {
  searchParams?: Promise<{
    error?: string;
    message?: string;
    month?: string;
    quarter?: string;
    view?: string;
    year?: string;
  }>;
};

const moneyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatMoney(cents: number, type?: Transaction["type"]) {
  const value = cents / 100;
  const formatted = moneyFormatter.format(value);

  if (type === "expense") {
    return `-${formatted}`;
  }

  if (type === "income") {
    return `+${formatted}`;
  }

  return formatted;
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00`));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function TransactionRow({
  period,
  transaction,
}: {
  period: Period;
  transaction: Transaction;
}) {
  const isIncome = transaction.type === "income";
  const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;

  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 rounded-lg border border-slate-100 bg-white p-4">
      <div
        className={`flex size-10 items-center justify-center rounded-full ${
          isIncome ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
        }`}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{transaction.title}</p>
        <p className="mt-1 truncate text-xs text-slate-500">
          {transaction.categories?.name ?? "Ohne Kategorie"} ·{" "}
          {formatDate(transaction.transaction_date)}
        </p>
        {transaction.note ? (
          <p className="mt-1 truncate text-xs text-slate-400">
            {transaction.note}
          </p>
        ) : null}
      </div>
      <p
        className={`text-right text-sm font-bold ${
          isIncome ? "text-emerald-700" : "text-red-600"
        }`}
      >
        {formatMoney(transaction.amount_cents, transaction.type)}
      </p>
      <form action={deleteTransaction}>
        <input type="hidden" name="transaction_id" value={transaction.id} />
        <input type="hidden" name="view" value={period.params.view} />
        <input type="hidden" name="year" value={period.params.year} />
        <input type="hidden" name="month" value={period.params.month ?? ""} />
        <input type="hidden" name="quarter" value={period.params.quarter ?? ""} />
        <button
          type="submit"
          aria-label={`${transaction.title} loeschen`}
          className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          title="Loeschen"
        >
          <Trash2 className="size-4" />
        </button>
      </form>
    </div>
  );
}

type TransactionsPageData =
  | {
      ok: true;
      context: HouseholdContext;
      categories: Category[];
      transactions: Transaction[];
    }
  | {
      ok: false;
      message: string;
    };

async function loadTransactionsPageData(): Promise<TransactionsPageData> {
  try {
    const context = await getHouseholdContext();
    const [categories, transactions] = await Promise.all([
      getCategories(context.householdId),
      getTransactions(context.householdId),
    ]);

    return {
      ok: true,
      context,
      categories,
      transactions,
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Die Transaktionen konnten nicht vorbereitet werden.",
    };
  }
}

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const params = await searchParams;
  const pageData = await loadTransactionsPageData();

  if (!pageData.ok) {
    return (
      <section className="rounded-lg border border-red-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <ReceiptText className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Datenbank-Setup pruefen</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              {pageData.message}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-slate-500">
              Wahrscheinlich fehlen noch RLS-Policies fuer Profile, Haushalte,
              Mitgliedschaften, Kategorien oder Transaktionen.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { categories, context, transactions } = pageData;
  const period = getPeriod(params ?? {});
  const periodTransactions = transactions.filter((transaction) =>
    isInPeriod(transaction.transaction_date, period),
  );
  const incomeCents = periodTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount_cents, 0);
  const expenseCents = periodTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount_cents, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-[24rem_1fr] lg:items-start">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <ReceiptText className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Neue Buchung</h2>
              <p className="mt-1 text-sm text-slate-500">
                Haushalt: {context.householdName}
              </p>
            </div>
          </div>

          {params?.message ? (
            <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              {params.message}
            </div>
          ) : null}

          {params?.error ? (
            <div className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {params.error}
            </div>
          ) : null}

          <form action={createTransaction} className="mt-5 space-y-4">
            <input type="hidden" name="view" value={period.params.view} />
            <input type="hidden" name="year" value={period.params.year} />
            <input type="hidden" name="month" value={period.params.month ?? ""} />
            <input type="hidden" name="quarter" value={period.params.quarter ?? ""} />
            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="type">
                Typ
              </label>
              <select
                id="type"
                name="type"
                defaultValue="expense"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="expense">Ausgabe</option>
                <option value="income">Einnahme</option>
              </select>
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="title"
              >
                Titel
              </label>
              <input
                id="title"
                name="title"
                required
                placeholder="z.B. REWE oder Gehalt"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <label
                  className="text-sm font-semibold text-slate-700"
                  htmlFor="amount"
                >
                  Betrag
                </label>
                <input
                  id="amount"
                  name="amount"
                  inputMode="decimal"
                  required
                  placeholder="49,90"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  className="text-sm font-semibold text-slate-700"
                  htmlFor="transaction_date"
                >
                  Datum
                </label>
                <input
                  id="transaction_date"
                  name="transaction_date"
                  type="date"
                  defaultValue={today()}
                  required
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div>
              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="category_id"
              >
                Kategorie
              </label>
              <select
                id="category_id"
                name="category_id"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                <option value="">Ohne Kategorie</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700" htmlFor="note">
                Notiz
              </label>
              <textarea
                id="note"
                name="note"
                rows={3}
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              <CircleDollarSign className="size-4" />
              Buchung speichern
            </button>
          </form>
        </section>

        <div className="space-y-4">
          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Einnahmen</p>
              <p className="mt-2 text-2xl font-bold text-emerald-700">
                {formatMoney(incomeCents)}
              </p>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Ausgaben</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {formatMoney(expenseCents)}
              </p>
            </article>
            <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">Saldo</p>
              <p className="mt-2 text-2xl font-bold">
                {formatMoney(incomeCents - expenseCents)}
              </p>
            </article>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Transaktionen</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {periodTransactions.length} Buchungen in {period.label}.
                </p>
              </div>
              <CalendarDays className="size-5 text-slate-400" />
            </div>

            <div className="mt-5 space-y-3">
              {periodTransactions.length ? (
                periodTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    period={period}
                    transaction={transaction}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                  Keine Buchungen im ausgewählten Zeitraum. Lege links eine Einnahme
                  oder Ausgabe an.
                </div>
              )}
            </div>
          </section>
        </div>
    </div>
  );
}
