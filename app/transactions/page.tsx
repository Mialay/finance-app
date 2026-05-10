import { ReceiptText } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function TransactionsPage() {
  return (
    <PlaceholderPage
      title="Transaktionen"
      description="Hier entsteht die zentrale Liste für Einnahmen, Ausgaben, Filter und wiederkehrende Buchungen."
      icon={ReceiptText}
      items={["Transaktionsliste", "Filter & Suche", "Neue Buchung"]}
    />
  );
}
