import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useMembers } from "../../hooks/useProjects";
import { getColor } from "../../utils/colors";

const STATUS_FILTERS = [
  { value: null,          label: "All" },
  { value: "done",        label: "Done" },
  { value: "in-progress", label: "In progress" },
  { value: "idea",        label: "Idea" },
  { value: "planned",     label: "Planned" },
];

export default function FilterBar({ filters, onChange }) {
  const members        = useMembers();
  const [search, setSearch] = useState(filters.search || "");
  const debounceRef    = useRef(null);

  const handleSearch = (val) => {
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange({ ...filters, search: val || undefined }), 300);
  };

  const setStatus = (status) => onChange({ ...filters, status: status || undefined });
  const setAuthor = (id) => onChange({ ...filters, author: id || undefined });

  return (
    <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <FiSearch size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" />
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        {search && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
          >
            <FiX size={12} />
          </button>
        )}
      </div>

      {/* Status chips */}
      <div className="flex gap-1.5 flex-wrap">
        {STATUS_FILTERS.map(({ value, label }) => (
          <button
            key={label}
            onClick={() => setStatus(value)}
            className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
              (filters.status ?? null) === value
                ? "bg-brand text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Member filter */}
      <div className="flex gap-1.5">
        {members.map((m) => {
          const c        = getColor(m.color);
          const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
          const active   = filters.author === m._id;
          return (
            <button
              key={m._id}
              onClick={() => setAuthor(active ? null : m._id)}
              title={m.name}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${
                active ? "ring-2 ring-offset-1 ring-offset-zinc-900" : "opacity-50 hover:opacity-80"
              }`}
              style={{
                background: c.bg,
                color: c.text,
                ringColor: active ? c.border : undefined,
              }}
            >
              {initials}
            </button>
          );
        })}
      </div>

      {/* Clear all */}
      {(filters.status || filters.author || filters.search) && (
        <button
          onClick={() => { setSearch(""); onChange({}); }}
          className="text-xs text-zinc-600 hover:text-zinc-400 flex items-center gap-1"
        >
          <FiX size={11} /> Clear
        </button>
      )}
    </div>
  );
}
