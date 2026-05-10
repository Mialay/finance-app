import { FileText } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function ReceiptsPage() {
  return (
    <PlaceholderPage
      title="Belege"
      description="Hier werden später Quittungen, Rechnungen und Uploads gesammelt und passenden Transaktionen zugeordnet."
      icon={FileText}
      items={["Beleg-Upload", "Dokumentenliste", "Zuordnung"]}
    />
  );
}
