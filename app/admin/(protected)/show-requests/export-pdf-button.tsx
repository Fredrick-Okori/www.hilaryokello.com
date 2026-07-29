"use client";

import { FileDown } from "lucide-react";

type ShowRequest = {
  city: string;
  country: string | null;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
};

export default function ExportPdfButton({
  showRequests,
}: {
  showRequests: ShowRequest[];
}) {
  async function handleExportPdf() {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(14);
    doc.text("Show Requests — Dr. Hilary Okello", 14, 16);

    autoTable(doc, {
      startY: 22,
      head: [["City", "Country", "Name", "Email", "Phone", "Submitted"]],
      body: showRequests.map((r) => [
        r.city,
        r.country || "—",
        r.name,
        r.email,
        r.phone || "—",
        new Date(r.created_at).toLocaleString(),
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [234, 179, 8] },
    });

    doc.save("show-requests.pdf");
  }

  return (
    <button
      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-yellow-500 hover:bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition-colors disabled:opacity-50"
      disabled={showRequests.length === 0}
      onClick={handleExportPdf}
    >
      <FileDown size={16} /> Export PDF
    </button>
  );
}
