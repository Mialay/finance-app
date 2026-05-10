import {
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  FileText,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Wallet,
} from "lucide-react";

type CategoryItem = [
  label: string,
  amount: string,
  percent: string,
  colorClass: string,
];

const stats = [
  {
    title: "Einnahmen",
    value: "3.450 €",
    detail: "Netto im Mai",
    change: "+5,2 %",
    tone: "green",
    icon: Wallet,
  },
  {
    title: "Ausgaben",
    value: "2.362 €",
    detail: "Im Mai",
    change: "+8,7 %",
    tone: "red",
    icon: TrendingDown,
  },
  {
    title: "Übrig",
    value: "1.088 €",
    detail: "Verfügbar",
    change: "Familienbudget",
    tone: "green",
    icon: PiggyBank,
  },
  {
    title: "Sparquote",
    value: "31 %",
    detail: "Ziel: 30 %",
    change: "",
    tone: "progress",
    icon: Sparkles,
  },
];

const categories: CategoryItem[] = [
  ["Wohnen", "850 €", "36 %", "bg-emerald-500"],
  ["Lebensmittel", "420 €", "18 %", "bg-amber-400"],
  ["Auto & Mobilität", "320 €", "14 %", "bg-sky-500"],
  ["Freizeit", "280 €", "12 %", "bg-violet-500"],
  ["Versicherungen", "210 €", "9 %", "bg-orange-500"],
  ["Sonstiges", "282 €", "11 %", "bg-slate-300"],
];

const expenseDetails = [
  ["Größte Einzelbuchung", "Miete", "780 €"],
  ["Häufigste Kategorie", "Lebensmittel", "12 Buchungen"],
  ["Über Budget", "Freizeit", "+45 €"],
];

const transactions = [
  {
    merchant: "REWE",
    category: "Lebensmittel",
    amount: "-67,48 €",
    date: "Heute",
    icon: ReceiptText,
    tone: "text-red-500 bg-red-50",
  },
  {
    merchant: "Aral Tankstelle",
    category: "Auto & Mobilität",
    amount: "-54,22 €",
    date: "Gestern",
    icon: CircleDollarSign,
    tone: "text-blue-600 bg-blue-50",
  },
  {
    merchant: "Netflix",
    category: "Freizeit",
    amount: "-13,99 €",
    date: "12. Mai",
    icon: FileText,
    tone: "text-red-600 bg-red-50",
  },
  {
    merchant: "Gehalt",
    category: "Einnahmen",
    amount: "+3.450,00 €",
    date: "1. Mai",
    icon: Wallet,
    tone: "text-emerald-600 bg-emerald-50",
  },
];

const opportunities = [
  {
    title: "Versicherung überprüfen",
    text: "Du zahlst durchschnittlich 24 % mehr als vergleichbare Tarife.",
    value: "128 € / Jahr",
    icon: ShieldCheck,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    title: "Streaming-Abos",
    text: "Du hast 3 aktive Abos. Wirst du alle regelmäßig nutzen?",
    value: "32 € / Monat",
    icon: ReceiptText,
    tone: "bg-red-50 text-red-500",
  },
  {
    title: "Stromtarif vergleichen",
    text: "Ein Wechsel könnte sich für dich lohnen.",
    value: "95 € / Jahr",
    icon: Sparkles,
    tone: "bg-sky-50 text-sky-600",
  },
];

const chartPoints = [
  "left-[8%] top-[48%]",
  "left-[24%] top-[51%]",
  "left-[40%] top-[40%]",
  "left-[56%] top-[35%]",
  "left-[72%] top-[41%]",
  "left-[88%] top-[24%]",
];

function MiniDonut({ size = "large" }: { size?: "large" | "small" }) {
  const dimensions = size === "large" ? "size-48" : "size-28";

  return (
    <div
      className={`${dimensions} aspect-square shrink-0 rounded-full bg-[conic-gradient(#31b76a_0_36%,#f7bf2d_36%_54%,#3288db_54%_68%,#8b5cf6_68%_80%,#fb7a45_80%_89%,#cbd5e1_89%_100%)] p-[22px]`}
    >
      <div className="size-full rounded-full bg-white" />
    </div>
  );
}

export default function OverviewPage() {
  return (
    <>
      <div className="mb-4 rounded-lg border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm lg:hidden">
        <p className="text-xs font-semibold">Übrig diesen Monat</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">1.088 €</p>
            <p className="mt-1 text-sm">von 3.450 €</p>
          </div>
          <div className="flex size-16 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Wallet className="size-8" />
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-emerald-100">
          <div className="h-2 w-[72%] rounded-full bg-emerald-500" />
        </div>
      </div>

      <div className="hidden grid-cols-4 gap-4 lg:grid">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{stat.title}</p>
                <p className="mt-3 text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex size-14 items-center justify-center rounded-full ${
                  stat.tone === "red"
                    ? "bg-red-100 text-red-500"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <stat.icon className="size-7" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600">{stat.detail}</span>
              {stat.tone === "progress" ? (
                <span className="h-2 w-24 rounded-full bg-slate-100">
                  <span className="block h-2 w-[74%] rounded-full bg-emerald-500" />
                </span>
              ) : (
                <span
                  className={
                    stat.tone === "red" ? "text-red-500" : "text-emerald-600"
                  }
                >
                  {stat.change}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          {/* CSS-only disclosure for lightweight mock details in the overview card. */}
          <input
            id="expense-details"
            type="checkbox"
            className="peer/expense sr-only"
            aria-hidden="true"
          />

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Ausgaben im Mai</h2>
              <p className="mt-1 text-3xl font-bold">2.362 €</p>
            </div>
            <button className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium lg:flex">
              Nach Kategorien
              <ChevronDown className="size-4" />
            </button>
            <button className="text-xs font-medium lg:hidden">Mehr</button>
          </div>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center lg:gap-10">
            <MiniDonut size="large" />
            <div className="w-full space-y-3">
              {categories.map(([label, amount, percent, color]) => (
                <div
                  key={label}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm"
                >
                  <span className={`size-3 rounded-full ${color}`} />
                  <span>{label}</span>
                  <span className="font-semibold">
                    {amount} <span className="text-slate-500">({percent})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <label
            htmlFor="expense-details"
            className="mt-6 hidden cursor-pointer items-center gap-2 text-sm font-semibold lg:flex"
          >
            <ChevronRight className="size-4 transition-transform peer-checked/expense:rotate-90" />
            Details ansehen
          </label>

          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 peer-checked/expense:mt-4 peer-checked/expense:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="grid gap-3 md:grid-cols-3">
                  {expenseDetails.map(([label, name, value]) => (
                    <div key={label}>
                      <p className="text-xs font-medium text-slate-500">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-bold">{name}</p>
                      <p className="mt-1 text-sm text-slate-600">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:block">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold">Einsparpotenzial</h2>
              <p className="text-sm text-slate-500">3 Vorschläge für dich</p>
            </div>
            <button className="text-sm text-slate-500">Alle anzeigen</button>
          </div>

          <div className="mt-4 space-y-3">
            {opportunities.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3"
              >
                <div
                  className={`flex size-10 items-center justify-center rounded-lg ${item.tone}`}
                >
                  <item.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.text}</p>
                </div>
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-700">
                  {item.value}
                </span>
                <ChevronRight className="size-4 text-slate-500" />
              </div>
            ))}
          </div>
        </article>

        </div>

        <div className="space-y-4">
        <article className="hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:block">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Entwicklung</h2>
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium">
              6 Monate
              <ChevronDown className="size-4" />
            </button>
          </div>

          <div className="mt-5 flex gap-7 text-sm">
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-emerald-500" />
              Einnahmen
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500" />
              Ausgaben
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-blue-500" />
              Sparen
            </span>
          </div>

          <div className="relative mt-6 h-56 rounded-lg">
            <div className="absolute inset-0 grid grid-rows-4 text-xs text-slate-400">
              {["4.000 €", "3.000 €", "2.000 €", "1.000 €"].map((label) => (
                <div key={label} className="border-t border-slate-100 pt-1">
                  {label}
                </div>
              ))}
            </div>
            <svg
              className="absolute inset-x-10 inset-y-4 h-[170px] w-[calc(100%-5rem)] overflow-visible"
              viewBox="0 0 500 170"
              aria-hidden="true"
            >
              <polyline
                points="0,80 100,86 200,64 300,56 400,66 500,34"
                fill="none"
                stroke="#31b76a"
                strokeWidth="3"
              />
              <polyline
                points="0,118 100,112 200,106 300,106 400,112 500,96"
                fill="none"
                stroke="#ef5149"
                strokeWidth="3"
              />
              <polyline
                points="0,154 100,152 200,146 300,134 400,144 500,128"
                fill="none"
                stroke="#3288db"
                strokeWidth="3"
              />
            </svg>
            {chartPoints.map((position) => (
              <span
                key={position}
                className={`absolute ${position} size-3 rounded-full bg-emerald-500 ring-4 ring-white`}
              />
            ))}
            <div className="absolute inset-x-10 bottom-0 flex justify-between text-sm text-slate-500">
              {["Dez", "Jan", "Feb", "Mär", "Apr", "Mai"].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>

          <button className="mt-3 flex items-center gap-2 text-sm font-semibold">
            <ChevronRight className="size-4" />
            Details ansehen
          </button>
        </article>
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Letzte Transaktionen</h2>
            <button className="text-sm text-slate-500">Alle anzeigen</button>
          </div>

          <div className="mt-4 space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.merchant}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
              >
                <div
                  className={`flex size-9 items-center justify-center rounded-full ${transaction.tone}`}
                >
                  <transaction.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">{transaction.merchant}</p>
                  <p className="text-xs text-slate-500">
                    {transaction.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{transaction.amount}</p>
                  <p className="text-xs text-slate-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
          </article>
        </div>
      </div>
    </>
  );
}
