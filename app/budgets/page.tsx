import { Wallet } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function BudgetsPage() {
  return (
    <PlaceholderPage
      title="Budgets"
      description="Hier entsteht die Planung für Monatsbudgets, Kategorien und Warnungen bei steigenden Ausgaben."
      icon={Wallet}
      items={["Budgetübersicht", "Kategorien", "Limits"]}
    />
  );
}
