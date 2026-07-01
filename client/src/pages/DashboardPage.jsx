import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../hooks/useProjects";
import FilterBar from "../components/dashboard/FilterBar";
import MasonryBoard from "../components/dashboard/MasonryBoard";

export default function DashboardPage() {
  const { user }                  = useAuth();
  const [filters, setFilters]     = useState({});
  const { projects, loading, error } = useProjects(filters);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-zinc-800">
        <p className="text-xs text-zinc-600 mb-0.5">{greeting()}</p>
        <h1 className="text-lg font-medium text-zinc-100">{user?.name?.split(" ")[0]}</h1>
      </div>

      {/* Filter bar */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Board */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        {error && (
          <div className="text-red-400 text-sm mb-4 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <MasonryBoard
          projects={projects}
          loading={loading}
          onCardClick={(p) => console.log("open", p)}
        />
      </div>
    </div>
  );
}
