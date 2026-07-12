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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Show Requests</h1>
      <div className="mt-4 overflow-x-auto">
        <div className="grid grid-cols-[1.2fr_1fr_1.2fr_1.5fr_1.2fr_1fr] gap-4 min-w-[900px] p-2 font-bold border-b">
          <div>City</div>
          <div>Country</div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Submitted</div>
        </div>
        {showRequests?.map((request) => (
          <div
            key={request.id}
            className="grid grid-cols-[1.2fr_1fr_1.2fr_1.5fr_1.2fr_1fr] gap-4 min-w-[900px] p-2 border-t"
          >
            <div>{request.city}</div>
            <div>{request.country}</div>
            <div>{request.name}</div>
            <div className="break-all">{request.email}</div>
            <div>{request.phone ?? "—"}</div>
            <div>{new Date(request.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
