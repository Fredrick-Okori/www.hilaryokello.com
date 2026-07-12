import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function ShowRequestsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignore errors from setting cookies in server components.
          }
        },
      },
    },
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const { data: showRequests, error } = await supabase
    .from("show_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching show requests:", error);
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Show Requests</h1>
          <p className="text-sm text-white/60">
            Review city interest submissions and contact details.
          </p>
        </div>
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
          {showRequests?.length ?? 0} total submissions
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
              {showRequests?.length ? (
                showRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-t border-white/10 bg-white/[0.02] transition-colors hover:bg-white/[0.05]"
                  >
                    <td className="px-4 py-3 font-medium text-white">{request.city}</td>
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
                  <td className="px-4 py-10 text-center text-white/60" colSpan={6}>
                    No show requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
