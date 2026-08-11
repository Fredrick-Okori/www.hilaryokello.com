"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ExportPdfButton from "./export-pdf-button";

const PAGE_SIZE = 25;

type ShowRequest = {
  id: string | number;
  city: string;
  country: string | null;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
};

export default function ShowRequestsTable({
  showRequests,
}: {
  showRequests: ShowRequest[];
}) {
  const [countryFilter, setCountryFilter] = useState("All");
  const [page, setPage] = useState(1);

  const countries = useMemo(
    () =>
      Array.from(
        new Set(
          showRequests
            .map((r) => r.country?.trim())
            .filter((c): c is string => !!c),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [showRequests],
  );

  const filteredRequests = useMemo(
    () =>
      countryFilter === "All"
        ? showRequests
        : showRequests.filter((r) => r.country === countryFilter),
    [showRequests, countryFilter],
  );

  useEffect(() => {
    setPage(1);
  }, [countryFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Show Requests</h1>
          <p className="text-sm text-white/60">
            Review city interest submissions and contact details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 outline-none transition focus:border-yellow-400"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option className="bg-black text-white" value="All">
              All countries
            </option>
            {countries.map((country) => (
              <option
                key={country}
                className="bg-black text-white"
                value={country}
              >
                {country}
              </option>
            ))}
          </select>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
            {filteredRequests.length} total submissions
          </div>
          <ExportPdfButton showRequests={filteredRequests} />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-[940px] w-full text-sm text-left text-white/80">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="px-4 py-3 font-semibold">City</th>
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length ? (
                paginatedRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-t border-white/10 bg-white/[0.02] transition-colors hover:bg-white/[0.05]"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {request.city}
                    </td>
                    <td className="px-4 py-3">{request.country || "—"}</td>
                    <td className="px-4 py-3">{request.name}</td>
                    <td className="px-4 py-3 break-all">{request.email}</td>
                    <td className="px-4 py-3">{request.phone || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(request.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-10 text-center text-white/60"
                    colSpan={6}
                  >
                    No show requests match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredRequests.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm text-white/70">
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPage <= 1}
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <button
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={currentPage >= pageCount}
                type="button"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
