import { createServerComponentClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function ShowRequestsPage() {
  const supabase = createServerComponentClient({ cookies });
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
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4 p-2 font-bold">
          <div>City</div>
          <div>Country</div>
          <div>Name</div>
          <div>Email</div>
        </div>
        {showRequests?.map((request) => (
          <div key={request.id} className="grid grid-cols-4 gap-4 p-2 border-t">
            <div>{request.city}</div>
            <div>{request.country}</div>
            <div>{request.name}</div>
            <div>{request.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
