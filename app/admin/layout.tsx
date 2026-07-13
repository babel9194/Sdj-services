import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { isAdmin } from "@/lib/auth/roles";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The middleware already blocks non-admins from reaching this route,
  // but a Server Component should never assume a request path was
  // actually protected — verify again here.
  if (!isAdmin(user)) {
    redirect("/");
  }

  return (
    <section className="container-xl flex flex-col gap-8 py-24 pt-32 md:flex-row md:pt-40">
      <AdminSidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </section>
  );
}
