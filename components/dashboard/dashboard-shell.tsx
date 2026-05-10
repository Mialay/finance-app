"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Camera,
  ChevronLeft,
  ChevronRight,
  FileText,
  Goal,
  Home as HomeIcon,
  Menu,
  PiggyBank,
  Plus,
  ReceiptText,
  Settings,
  ShieldCheck,
  Upload,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
};

type QuickAction = [label: string, icon: LucideIcon];

const navItems: NavItem[] = [
  {
    label: "Übersicht",
    href: "/",
    icon: HomeIcon,
    description: "Gemeinsamer Überblick über eure Finanzen",
  },
  {
    label: "Transaktionen",
    href: "/transactions",
    icon: ReceiptText,
    description: "Einnahmen, Ausgaben und Buchungen im Blick",
  },
  {
    label: "Belege",
    href: "/receipts",
    icon: FileText,
    description: "Quittungen und Dokumente sammeln",
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: Wallet,
    description: "Monatliche Grenzen und Kategorien planen",
  },
  {
    label: "Auswertungen",
    href: "/analytics",
    icon: BarChart3,
    description: "Trends und Muster verstehen",
  },
  {
    label: "Einsparpotenzial",
    href: "/savings",
    icon: ShieldCheck,
    description: "Möglichkeiten zum Sparen priorisieren",
  },
  {
    label: "Ziele",
    href: "/goals",
    icon: Goal,
    description: "Sparziele und Fortschritt verfolgen",
  },
  {
    label: "Einstellungen",
    href: "/settings",
    icon: Settings,
    description: "Profil, Haushalt und App-Verhalten verwalten",
  },
];

const quickActions: QuickAction[] = [
  ["Ausgabe hinzufügen", Wallet],
  ["Einnahme hinzufügen", PiggyBank],
  ["Beleg hochladen", Camera],
  ["Überweisung / Dauerauftrag", Upload],
];

const mobileNavItems = [
  navItems[0],
  navItems[1],
  null,
  navItems[2],
  navItems[4],
];

function MonthPicker() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm">
      <ChevronLeft className="size-4" />
      <span className="px-6">Mai 2024</span>
      <ChevronRight className="size-4" />
    </div>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function useCurrentPage() {
  const pathname = usePathname();
  const currentPage =
    navItems.find((item) => isActivePath(pathname, item.href)) ?? navItems[0];

  return { pathname, currentPage };
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { pathname, currentPage } = useCurrentPage();

  if (pathname === "/login" || pathname === "/signup") {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen bg-[#f4f7f8] pt-[max(env(safe-area-inset-top),1rem)] text-slate-950 lg:pt-0">
      {/* CSS-only mobile drawer state keeps the shell usable without extra client state. */}
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
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition ${
                    active
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
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
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-12 items-center gap-3 rounded-lg px-4 text-left text-sm font-medium transition ${
                    active
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                      : "text-slate-200 hover:bg-white/10"
                  }`}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
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
              <h1 className="text-3xl font-bold tracking-tight">
                {currentPage.label}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {currentPage.description}
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
            <h1 className="text-base font-bold">{currentPage.label}</h1>
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

            {children}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white px-5 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden">
        {/* CSS-only quick action menu for the mobile bottom navigation. */}
        <input
          id="quick-action-menu"
          type="checkbox"
          className="peer/action sr-only"
          aria-hidden="true"
        />

        <label
          htmlFor="quick-action-menu"
          aria-label="Schnellauswahl schließen"
          className="pointer-events-none fixed inset-0 bottom-[4.5rem] z-20 opacity-0 transition peer-checked/action:pointer-events-auto"
        />

        <div className="pointer-events-none fixed inset-x-5 bottom-24 z-30 mx-auto w-[min(20rem,calc(100vw-2.5rem))] translate-y-3 rounded-lg border border-slate-200 bg-white p-4 opacity-0 shadow-2xl transition duration-200 peer-checked/action:pointer-events-auto peer-checked/action:translate-y-0 peer-checked/action:opacity-100">
          <div className="space-y-4">
            {quickActions.map(([label, Icon], index) => (
              <button
                key={label}
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
          {mobileNavItems.map((item) => {
            if (!item) {
              return (
                <label
                  key="quick-action"
                  htmlFor="quick-action-menu"
                  aria-label="Schnellauswahl öffnen"
                  className="flex cursor-pointer flex-col items-center gap-1"
                >
                  <span className="mb-1 flex size-14 -translate-y-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition peer-checked/action:rotate-45">
                    <Plus className="size-7" />
                  </span>
                </label>
              );
            }

            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 ${
                  active ? "text-emerald-700" : ""
                }`}
              >
                <Icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
