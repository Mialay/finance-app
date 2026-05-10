import { BarChart3 } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function AnalyticsPage() {
  return (
    <PlaceholderPage
      title="Auswertungen"
      description="Hier finden später Monatsvergleiche, Kategorie-Analysen und längerfristige Trends ihren Platz."
      icon={BarChart3}
      items={["Monatsvergleich", "Kategorien", "Trends"]}
    />
  );
}
