import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Mail,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 font-bold transition ${
      isActive ? "bg-[#FF5C35] text-black" : "text-gray-400 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex">
      {/* SIDEBAR */}

      <aside className="w-64 bg-[#0D0D0D] text-white min-h-screen p-5">
        <div className="mb-10">
          <h1 className="text-2xl font-black">BYTEPOST</h1>

          <p className="text-[#FF5C35] text-xs font-bold tracking-widest mt-1">
            ADMIN
          </p>
        </div>

        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkStyle}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/newsletters" className={linkStyle}>
            <Mail size={18} />
            Newsletters
          </NavLink>

          <NavLink to="/admin/subscribers" className={linkStyle}>
            <Users size={18} />
            Subscribers
          </NavLink>

          <NavLink to="/admin/settings" className={linkStyle}>
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-[#FF5C35] mt-10 px-4 py-3 font-bold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* PAGE */}

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
