import Link from "next/link";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarDays,
  CircleDollarSign,
  PiggyBank,
  ReceiptText,
  Sparkles,
  TrendingDown,
  Wallet,
} from "lucide-react";
import {
  getHouseholdContext,
  getTransactions,
  type HouseholdContext,
  type Transaction,
} from "@/lib/finance";
import { getPeriod, isInPeriod, periodToSearchParams } from "@/lib/period";

type DashboardData =
  | {
      ok: true;
      context: HouseholdContext;
      transactions: Transaction[];
    }
  | {
      ok: false;
      message: string;
    };

type CategorySummary = {
  name: string;
  color: string;
  amountCents: number;
  percent: number;
};

type MonthSeriesItem = {
  balanceCents: number;
  expenseCents: number;
  incomeCents: number;
  label: string;
};

type OverviewPageProps = {
  searchParams?: Promise<{
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
});

const shortMonthFormatter = new Intl.DateTimeFormat("de-DE", {
  month: "short",
});

function formatMoney(cents: number) {
  return moneyFormatter.format(cents / 100);
}

function formatSignedMoney(transaction: Transaction) {
  const sign = transaction.type === "income" ? "+" : "-";
  return `${sign}${formatMoney(transaction.amount_cents)}`;
}

function buildCategorySummaries(transactions: Transaction[]) {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );
  const totalCents = expenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount_cents,
    0,
  );
  const summaries = new Map<string, CategorySummary>();

  for (const transaction of expenseTransactions) {
    const name = transaction.categories?.name ?? "Ohne Kategorie";
    const existing = summaries.get(name);

    summaries.set(name, {
      name,
      color: transaction.categories?.color ?? "#94a3b8",
      amountCents: (existing?.amountCents ?? 0) + transaction.amount_cents,
      percent: 0,
    });
  }

  return [...summaries.values()]
    .map((summary) => ({
      ...summary,
      percent: totalCents ? Math.round((summary.amountCents / totalCents) * 100) : 0,
    }))
    .sort((a, b) => b.amountCents - a.amountCents);
}

function buildDonutGradient(categories: CategorySummary[]) {
  if (!categories.length) {
    return "#e2e8f0";
  }

  let cursor = 0;
  const parts = categories.map((category) => {
    const start = cursor;
    cursor += category.percent;
    return `${category.color} ${start}% ${Math.max(cursor, start + 1)}%`;
  });

  return `conic-gradient(${parts.join(", ")})`;
}

function buildMonthSeries(transactions: Transaction[], start: Date, end: Date) {
  const months: MonthSeriesItem[] = [];

  for (
    let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    cursor < end;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
  ) {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    const monthTransactions = transactions.filter((transaction) =>
      isInPeriod(transaction.transaction_date, { start: cursor, end: next }),
    );
    const incomeCents = monthTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount_cents, 0);
    const expenseCents = monthTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount_cents, 0);

    months.push({
      balanceCents: incomeCents - expenseCents,
      expenseCents,
      incomeCents,
      label: shortMonthFormatter.format(cursor),
    });
  }

  return months;
}

async function loadDashboardData(): Promise<DashboardData> {
  try {
    const context = await getHouseholdContext();
    const transactions = await getTransactions(context.householdId);

    return {
      ok: true,
      context,
      transactions,
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Das Dashboard konnte nicht geladen werden.",
    };
  }
}

function StatCard({
  title,
  value,
  detail,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  tone: "green" | "red" | "blue";
  icon: typeof Wallet;
}) {
  const toneClass =
    tone === "red"
      ? "bg-red-100 text-red-500"
      : tone === "blue"
        ? "bg-sky-100 text-sky-600"
        : "bg-emerald-100 text-emerald-600";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-600">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={`flex size-14 items-center justify-center rounded-full ${toneClass}`}>
          <Icon className="size-7" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{detail}</p>
    </article>
  );
}

function RecentTransaction({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";
  const Icon = isIncome ? ArrowUpCircle : ArrowDownCircle;

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <div
        className={`flex size-9 items-center justify-center rounded-full ${
          isIncome ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
        }`}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold">{transaction.title}</p>
        <p className="truncate text-xs text-slate-500">
          {transaction.categories?.name ?? "Ohne Kategorie"}
        </p>
      </div>
      <div className="text-right">
        <p
          className={`text-sm font-bold ${
            isIncome ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {formatSignedMoney(transaction)}
        </p>
        <p className="text-xs text-slate-500">
          {dateFormatter.format(new Date(`${transaction.transaction_date}T00:00:00`))}
        </p>
      </div>
    </div>
  );
}

export default async function OverviewPage({ searchParams }: OverviewPageProps) {
  const params = await searchParams;
  const data = await loadDashboardData();

  if (!data.ok) {
    return (
      <section className="rounded-lg border border-red-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <ReceiptText className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Dashboard konnte nicht geladen werden</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">{data.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const period = getPeriod(params ?? {});
  const periodSearch = periodToSearchParams(period).toString();
  const periodTransactions = data.transactions.filter((transaction) =>
    isInPeriod(transaction.transaction_date, period),
  );
  const recentTransactions = data.transactions.slice(0, 5);
  const incomeCents = periodTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount_cents, 0);
  const expenseCents = periodTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount_cents, 0);
  const balanceCents = incomeCents - expenseCents;
  const savingsRate = incomeCents
    ? Math.max(0, Math.round((balanceCents / incomeCents) * 100))
    : 0;
  const categorySummaries = buildCategorySummaries(periodTransactions);
  const largestExpense = categorySummaries[0];
  const donutGradient = buildDonutGradient(categorySummaries);
  const monthSeries = buildMonthSeries(periodTransactions, period.start, period.end);
  const maxSeriesCents = Math.max(
    1,
    ...monthSeries.map((month) => Math.max(month.incomeCents, month.expenseCents)),
  );

  return (
    <>
      <div className="mb-4 rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm lg:hidden">
        <p className="text-xs font-semibold">Saldo im Zeitraum</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{formatMoney(balanceCents)}</p>
            <p className="mt-1 text-sm text-slate-600">{period.label}</p>
          </div>
          <div className="flex size-16 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Wallet className="size-8" />
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-emerald-100">
          <div
            className="h-2 rounded-full bg-emerald-500"
            style={{ width: `${Math.min(100, savingsRate)}%` }}
          />
        </div>
      </div>

      <div className="hidden grid-cols-4 gap-4 lg:grid">
        <StatCard
          title="Einnahmen"
          value={formatMoney(incomeCents)}
          detail={period.label}
          tone="green"
          icon={Wallet}
        />
        <StatCard
          title="Ausgaben"
          value={formatMoney(expenseCents)}
          detail={period.label}
          tone="red"
          icon={TrendingDown}
        />
        <StatCard
          title="Saldo"
          value={formatMoney(balanceCents)}
          detail={data.context.householdName}
          tone="green"
          icon={PiggyBank}
        />
        <StatCard
          title="Sparquote"
          value={`${savingsRate} %`}
          detail={incomeCents ? "Aus gewähltem Zeitraum" : "Noch keine Einnahmen"}
          tone="blue"
          icon={Sparkles}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Ausgaben nach Kategorie</h2>
                <p className="mt-1 text-3xl font-bold">{formatMoney(expenseCents)}</p>
              </div>
              <Link
                href={`/transactions?${periodSearch}`}
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Details
              </Link>
            </div>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center lg:gap-10">
              <div
                className="size-48 aspect-square shrink-0 rounded-full p-[22px]"
                style={{ background: donutGradient }}
              >
                <div className="size-full rounded-full bg-white" />
              </div>
              <div className="w-full space-y-3">
                {categorySummaries.length ? (
                  categorySummaries.map((category) => (
                    <div
                      key={category.name}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm"
                    >
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                      <span className="font-semibold">
                        {formatMoney(category.amountCents)}{" "}
                        <span className="text-slate-500">({category.percent} %)</span>
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    Noch keine Ausgaben in diesem Zeitraum.
                  </div>
                )}
              </div>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">Zeitraumblick</h2>
                <p className="text-sm text-slate-500">
                  {periodTransactions.length} Buchungen
                </p>
              </div>
              <CalendarDays className="size-5 text-slate-400" />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Groesste Kategorie</p>
                <p className="mt-1 text-sm font-bold">
                  {largestExpense?.name ?? "Noch offen"}
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Ausgabenquote</p>
                <p className="mt-1 text-sm font-bold">
                  {incomeCents ? `${Math.round((expenseCents / incomeCents) * 100)} %` : "0 %"}
                </p>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Saldo</p>
                <p className="mt-1 text-sm font-bold">{formatMoney(balanceCents)}</p>
              </div>
            </div>
          </article>
        </div>

        <div className="space-y-4">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Letzte Transaktionen</h2>
              <Link
                href={`/transactions?${periodSearch}`}
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Alle anzeigen
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {recentTransactions.length ? (
                recentTransactions.map((transaction) => (
                  <RecentTransaction
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                  Noch keine Transaktionen. Lege unter Transaktionen deine erste Buchung an.
                </div>
              )}
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Verlauf</h2>
                <p className="mt-1 text-sm text-slate-500">{period.label}</p>
              </div>
              <CircleDollarSign className="size-5 text-slate-400" />
            </div>

            <div className="mt-5 space-y-4">
              {monthSeries.map((month) => (
                <div
                  key={month.label}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 text-sm"
                >
                  <span className="font-semibold capitalize text-slate-500">
                    {month.label}
                  </span>
                  <div className="space-y-1.5">
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-emerald-500"
                        style={{
                          width: `${Math.max(3, (month.incomeCents / maxSeriesCents) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-red-400"
                        style={{
                          width: `${Math.max(3, (month.expenseCents / maxSeriesCents) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-right font-bold ${
                      month.balanceCents >= 0 ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {formatMoney(month.balanceCents)}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
