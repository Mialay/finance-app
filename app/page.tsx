import {
  BarChart3,
  Bell,
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Goal,
  Home as HomeIcon,
  Menu,
  PiggyBank,
  Plus,
  ReceiptText,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Upload,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconItem = [label: string, icon: LucideIcon];
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

const navItems: IconItem[] = [
  ["Übersicht", HomeIcon],
  ["Transaktionen", ReceiptText],
  ["Belege", FileText],
  ["Budgets", Wallet],
  ["Auswertungen", BarChart3],
  ["Einsparpotenzial", ShieldCheck],
  ["Ziele", Goal],
  ["Einstellungen", Settings],
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
      className={`${dimensions} rounded-full bg-[conic-gradient(#31b76a_0_36%,#f7bf2d_36%_54%,#3288db_54%_68%,#8b5cf6_68%_80%,#fb7a45_80%_89%,#cbd5e1_89%_100%)] p-[22px]`}
    >
      <div className="size-full rounded-full bg-white" />
    </div>
  );
}

function MonthPicker() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm">
      <ChevronLeft className="size-4" />
      <span className="px-6">Mai 2024</span>
      <ChevronRight className="size-4" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f7f8] pt-[max(env(safe-area-inset-top),1rem)] text-slate-950 lg:pt-0">
      <input
        id="mobile-navigation"
        type="checkbox"
        className="peer sr-only"
        aria-hidden="true"
      />

      <div className="mobile-navigation-overlay pointer-events-none fixed inset-0 z-40 opacity-0 transition-opacity peer-checked:pointer-events-auto peer-checked:opacity-100 lg:hidden">
        <label
          htmlFor="mobile-navigation"
          aria-label="Navigation schließen"
          className="absolute inset-0 bg-slate-950/45"
        />

        <aside className="mobile-navigation-panel relative flex h-full w-[min(82vw,22rem)] flex-col bg-[#102033] px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)] text-white shadow-2xl transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-emerald-500">
                  <Wallet className="size-5" />
                </div>
                <span className="text-lg font-bold">Finanzen</span>
              </div>
              <label
                htmlFor="mobile-navigation"
                aria-label="Navigation schließen"
                className="flex size-10 items-center justify-center rounded-lg text-slate-100 transition hover:bg-white/10"
              >
                <X className="size-5" />
              </label>
            </div>

            <nav className="mt-8 flex flex-col gap-2">
              {navItems.map(([label, Icon], index) => (
                <label
                  key={label}
                  htmlFor="mobile-navigation"
                  className={`flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition ${
                    index === 0
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  <Icon className="size-5" />
                  {label}
                </label>
              ))}
            </nav>

            <div className="mt-auto flex items-center gap-3 rounded-lg px-2 py-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 to-sky-300 text-sm font-bold text-slate-900">
                C
              </div>
              <div>
                <p className="text-sm font-semibold">Hallo, Christian</p>
                <p className="text-xs text-slate-300">Profil</p>
              </div>
            </div>
          </aside>
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1720px]">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#102033] px-5 py-7 text-white lg:flex">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md bg-emerald-500">
              <Wallet className="size-5" />
            </div>
            <span className="text-lg font-bold">Finanzen</span>
          </div>

          <nav className="mt-10 flex flex-col gap-2">
            {navItems.map(([label, Icon], index) => (
              <button
                key={label as string}
                className={`flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition ${
                  index === 0
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                    : "text-slate-200 hover:bg-white/10"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto flex items-center gap-3 rounded-lg px-2 py-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-200 to-sky-300 text-sm font-bold text-slate-900">
              C
            </div>
            <div>
              <p className="text-sm font-semibold">Hallo, Christian</p>
              <p className="text-xs text-slate-300">Profil</p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="hidden items-center justify-between px-8 pt-7 lg:flex">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Übersicht</h1>
              <p className="mt-1 text-sm text-slate-500">
                Gemeinsamer Überblick über eure Finanzen
              </p>
            </div>

            <div className="flex items-center gap-5">
              <MonthPicker />
              <Bell className="size-5" />
              <Users className="size-5" />
            </div>
          </header>

          <header className="flex items-center justify-between px-5 py-5 lg:hidden">
            <label
              htmlFor="mobile-navigation"
              aria-label="Navigation öffnen"
              className="flex size-10 items-center justify-center rounded-lg transition hover:bg-white"
            >
              <Menu className="size-6" />
            </label>
            <h1 className="text-base font-bold">Übersicht</h1>
            <Bell className="size-5" />
          </header>

          <div className="flex-1 px-4 pb-28 lg:px-8 lg:pb-8 lg:pt-6">
            <div className="mx-auto flex max-w-7xl items-center justify-center pb-4 lg:hidden">
              <div className="flex items-center gap-8 text-sm font-semibold">
                <ChevronLeft className="size-4" />
                Mai 2024
                <ChevronRight className="size-4" />
              </div>
            </div>

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
                          stat.tone === "red"
                            ? "text-red-500"
                            : "text-emerald-600"
                        }
                      >
                        {stat.change}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
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
                          {amount}{" "}
                          <span className="text-slate-500">({percent})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="mt-6 hidden items-center gap-2 text-sm font-semibold lg:flex">
                  <ChevronRight className="size-4" />
                  Details ansehen
                </button>
              </article>

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
                    {["4.000 €", "3.000 €", "2.000 €", "1.000 €"].map(
                      (label) => (
                        <div
                          key={label}
                          className="border-t border-slate-100 pt-1"
                        >
                          {label}
                        </div>
                      ),
                    )}
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
                    {["Dez", "Jan", "Feb", "Mär", "Apr", "Mai"].map(
                      (month) => (
                        <span key={month}>{month}</span>
                      ),
                    )}
                  </div>
                </div>

                <button className="mt-3 flex items-center gap-2 text-sm font-semibold">
                  <ChevronRight className="size-4" />
                  Details ansehen
                </button>
              </article>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <article className="hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:block">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold">Einsparpotenzial</h2>
                    <p className="text-sm text-slate-500">
                      3 Vorschläge für dich
                    </p>
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
                        <p className="text-sm font-bold">
                          {transaction.merchant}
                        </p>
                        <p className="text-xs text-slate-500">
                          {transaction.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">
                          {transaction.amount}
                        </p>
                        <p className="text-xs text-slate-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white px-5 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden">
        <input
          id="quick-action-menu"
          type="checkbox"
          className="peer/action sr-only"
          aria-hidden="true"
        />

        <label
          htmlFor="quick-action-menu"
          aria-label="Schnellauswahl schliessen"
          className="pointer-events-none fixed inset-0 bottom-[4.5rem] z-20 opacity-0 transition peer-checked/action:pointer-events-auto"
        />

        <div className="pointer-events-none fixed inset-x-5 bottom-24 z-30 mx-auto w-[min(20rem,calc(100vw-2.5rem))] translate-y-3 rounded-lg border border-slate-200 bg-white p-4 opacity-0 shadow-2xl transition duration-200 peer-checked/action:pointer-events-auto peer-checked/action:translate-y-0 peer-checked/action:opacity-100">
          <div className="space-y-4">
            {(
              [
              ["Ausgabe hinzufügen", Wallet],
              ["Einnahme hinzufügen", PiggyBank],
              ["Beleg hochladen", Camera],
              ["Überweisung / Dauerauftrag", Upload],
              ] as IconItem[]
            ).map(([label, Icon], index) => (
              <button
                key={label as string}
                className="flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left text-sm font-medium hover:bg-slate-50"
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-full ${
                    index === 3
                      ? "bg-violet-50 text-violet-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  <Icon className="size-4" />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-md grid-cols-5 items-center text-[11px] font-medium text-slate-500">
          {(
            [
            ["Übersicht", HomeIcon],
            ["Transaktionen", ReceiptText],
            ["", Plus],
            ["Belege", FileText],
            ["Auswertung", BarChart3],
            ] as IconItem[]
          ).map(([label, Icon], index) => {
            const itemClass = `flex flex-col items-center gap-1 ${
              index === 0 ? "text-emerald-700" : ""
            }`;
            const iconWrapClass =
              index === 2
                ? "mb-1 flex size-14 -translate-y-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition peer-checked/action:rotate-45"
                : "";

            if (index === 2) {
              return (
                <label
                  key={index}
                  htmlFor="quick-action-menu"
                  aria-label="Schnellauswahl oeffnen"
                  className={`${itemClass} cursor-pointer`}
                >
                  <span className={iconWrapClass}>
                    <Icon className="size-7" />
                  </span>
                  {label}
                </label>
              );
            }

            return (
              <button key={index} className={itemClass}>
                <span className={iconWrapClass}>
                  <Icon className="size-5" />
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* <div className="fixed bottom-24 right-5 hidden w-80 rounded-lg border border-slate-200 bg-white p-4 shadow-2xl xl:block">
        <div className="space-y-4">
          {(
            [
            ["Ausgabe hinzufügen", Wallet],
            ["Einnahme hinzufügen", PiggyBank],
            ["Beleg hochladen", Camera],
            ["Überweisung / Dauerauftrag", Upload],
            ] as IconItem[]
          ).map(([label, Icon]) => (
            <button
              key={label as string}
              className="flex w-full items-center gap-4 rounded-lg px-2 py-2 text-left text-sm font-medium hover:bg-slate-50"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon className="size-4" />
              </span>
              {label}
            </button>
          ))}
          <button className="h-11 w-full rounded-lg border border-slate-200 text-sm font-semibold">
            Abbrechen
          </button>
        </div>
      </div> */}
    </main>
  );
}
