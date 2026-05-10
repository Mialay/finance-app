import type { LucideIcon } from "lucide-react";

type PlaceholderPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

export function PlaceholderPage({
  title,
  description,
  icon: Icon,
  items,
}: PlaceholderPageProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Icon className="size-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-600"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
