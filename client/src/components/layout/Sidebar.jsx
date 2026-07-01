import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid, FiUser, FiCompass, FiBookmark,
  FiTag, FiSettings, FiLogOut, FiShield,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useMembers } from "../../hooks/useProjects";
import { getColor } from "../../utils/colors";

const navLinks = [
  { to: "/",        icon: FiGrid,     label: "Dashboard" },
  { to: "/mine",    icon: FiUser,     label: "My projects" },
  { to: "/explore", icon: FiCompass,  label: "Explore all" },
  { to: "/pinned",  icon: FiBookmark, label: "Pinned" },
  { to: "/tags",    icon: FiTag,      label: "Tags" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate          = useNavigate();
  const members           = useMembers();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="w-52 flex-shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-zinc-800">
        <div className="w-7 h-7 rounded-md overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center">
          <img src="/brandax-mark.png" alt="Brandax" className="w-full h-full object-cover" />
        </div>
        <span className="font-medium text-zinc-100 text-base tracking-tight">backfolder</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="text-[10px] font-medium text-zinc-600 px-2 pb-1.5 pt-1 uppercase tracking-widest">
          Workspace
        </p>
        {navLinks.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-zinc-800 text-zinc-100 font-medium"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}

        {user?.role === "admin" && (
          <>
            <p className="text-[10px] font-medium text-zinc-600 px-2 pb-1.5 pt-3 uppercase tracking-widest">
              Admin
            </p>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-zinc-800 text-zinc-100 font-medium" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`
              }
            >
              <FiShield size={15} />
              Admin panel
            </NavLink>
          </>
        )}

        {/* Members */}
        <p className="text-[10px] font-medium text-zinc-600 px-2 pb-1.5 pt-3 uppercase tracking-widest">
          Members
        </p>
        {members.map((m) => {
          const c = getColor(m.color);
          const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
          const isMe = m._id === user?._id;
          return (
            <div
              key={m._id}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
                style={{ background: c.bg, color: c.text }}
              >
                {initials}
              </div>
              <span className="text-sm text-zinc-400 truncate">{m.name.split(" ")[0]}</span>
              {isMe && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: c.border }} />
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom: user + settings + logout */}
      <div className="border-t border-zinc-800 p-2 space-y-0.5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
              isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`
          }
        >
          <FiSettings size={15} />
          Settings
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 transition-colors"
        >
          <FiLogOut size={15} />
          Sign out
        </button>
        {/* Current user chip */}
        <div className="flex items-center gap-2 px-2.5 py-2 mt-1">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
            style={{ background: getColor(user?.color).bg, color: getColor(user?.color).text }}
          >
            {user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-300 truncate">{user?.name}</p>
            <p className="text-[10px] text-zinc-600 truncate">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
