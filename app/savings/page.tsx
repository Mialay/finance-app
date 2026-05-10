import { ShieldCheck } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function SavingsPage() {
  return (
    <PlaceholderPage
      title="Einsparpotenzial"
      description="Hier werden später konkrete Sparvorschläge, Prioritäten und mögliche Auswirkungen sichtbar."
      icon={ShieldCheck}
      items={["Vorschläge", "Prioritäten", "Ersparnis"]}
    />
  );
}
