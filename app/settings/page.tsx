import { Settings } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Einstellungen"
      description="Hier werden später Profil, Haushaltsmitglieder, Benachrichtigungen und App-Einstellungen verwaltet."
      icon={Settings}
      items={["Profil", "Haushalt", "Benachrichtigungen"]}
    />
  );
}
