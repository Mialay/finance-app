import { Goal } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function GoalsPage() {
  return (
    <PlaceholderPage
      title="Ziele"
      description="Hier entstehen Sparziele, Fortschrittsanzeigen und Zielbeträge für größere Anschaffungen."
      icon={Goal}
      items={["Sparziele", "Fortschritt", "Zielplanung"]}
    />
  );
}
