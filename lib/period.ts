export type PeriodView = "month" | "quarter" | "year";

export type PeriodParams = {
  month?: string;
  quarter?: string;
  view?: string;
  year?: string;
};

export type Period = {
  end: Date;
  label: string;
  params: {
    month?: string;
    quarter?: string;
    view: PeriodView;
    year: string;
  };
  start: Date;
  view: PeriodView;
};

const monthLabelFormatter = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
});

function formatMonthValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function parseYear(value?: string) {
  const year = Number(value);
  return Number.isInteger(year) && year >= 1900 && year <= 2200 ? year : 2024;
}

function parseQuarter(value?: string) {
  const quarter = Number(value);
  return quarter >= 1 && quarter <= 4 ? quarter : 2;
}

function parseMonth(value?: string) {
  if (!value || !/^\d{4}-\d{2}$/.test(value)) {
    return new Date(2024, 4, 1);
  }

  const [year, month] = value.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function parseView(value?: string): PeriodView {
  return value === "quarter" || value === "year" ? value : "month";
}

export function getPeriod(params: PeriodParams): Period {
  const view = parseView(params.view);

  if (view === "year") {
    const year = parseYear(params.year);

    return {
      start: new Date(year, 0, 1),
      end: new Date(year + 1, 0, 1),
      label: String(year),
      params: {
        view,
        year: String(year),
      },
      view,
    };
  }

  if (view === "quarter") {
    const year = parseYear(params.year);
    const quarter = parseQuarter(params.quarter);
    const startMonth = (quarter - 1) * 3;

    return {
      start: new Date(year, startMonth, 1),
      end: new Date(year, startMonth + 3, 1),
      label: `Q${quarter} ${year}`,
      params: {
        quarter: String(quarter),
        view,
        year: String(year),
      },
      view,
    };
  }

  const selected = parseMonth(params.month);
  const year = selected.getFullYear();

  return {
    start: new Date(year, selected.getMonth(), 1),
    end: new Date(year, selected.getMonth() + 1, 1),
    label: monthLabelFormatter.format(selected),
    params: {
      month: formatMonthValue(selected),
      view,
      year: String(year),
    },
    view,
  };
}

export function shiftPeriod(period: Period, offset: number): Period {
  if (period.view === "year") {
    return getPeriod({
      view: "year",
      year: String(Number(period.params.year) + offset),
    });
  }

  if (period.view === "quarter") {
    const quarterIndex =
      Number(period.params.year) * 4 + Number(period.params.quarter) - 1 + offset;
    const year = Math.floor(quarterIndex / 4);
    const quarter = (quarterIndex % 4) + 1;

    return getPeriod({
      quarter: String(quarter),
      view: "quarter",
      year: String(year),
    });
  }

  const selected = parseMonth(period.params.month);
  const next = new Date(
    selected.getFullYear(),
    selected.getMonth() + offset,
    1,
  );

  return getPeriod({
    month: formatMonthValue(next),
    view: "month",
  });
}

export function periodToSearchParams(period: Period) {
  const params = new URLSearchParams();

  params.set("view", period.view);
  params.set("year", period.params.year);

  if (period.params.month) {
    params.set("month", period.params.month);
  }

  if (period.params.quarter) {
    params.set("quarter", period.params.quarter);
  }

  return params;
}

export function isInPeriod(dateValue: string, period: Pick<Period, "end" | "start">) {
  const date = new Date(`${dateValue}T00:00:00`);
  return date >= period.start && date < period.end;
}
