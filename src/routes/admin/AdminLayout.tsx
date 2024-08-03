import Sidebar from "@/components/admin/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/providers/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { user, pending } = useAuth()
  const navigate = useNavigate()

  if (pending) return null

  if (!user || user.role === "user") {
    navigate(user ? "/" : "/login")
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen antialiased scroll-smooth font-titillium flex flex-col w-full">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          Header
          <Outlet />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdminLayout;
