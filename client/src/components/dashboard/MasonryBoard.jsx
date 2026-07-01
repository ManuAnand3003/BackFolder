import ProjectCard from "./ProjectCard";

// CSS columns masonry — browser-native, no lib needed
export default function MasonryBoard({ projects, onCardClick, loading }) {
  if (loading) {
    return (
      <div
        style={{ columns: "3", columnGap: "12px" }}
        className="max-sm:block"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="break-inside-avoid mb-3 bg-zinc-900 rounded-xl border border-zinc-800 animate-pulse"
            style={{ height: `${140 + (i % 3) * 40}px` }}
          />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">📂</div>
        <p className="text-zinc-400 font-medium mb-1">No projects yet</p>
        <p className="text-zinc-600 text-sm">Add your first project to get started</p>
      </div>
    );
  }

  return (
    <div
      style={{ columns: "3", columnGap: "12px" }}
      className="[column-count:1] sm:[column-count:2] lg:[column-count:3]"
    >
      {projects.map((project) => (
        <div key={project._id} className="break-inside-avoid mb-3">
          <ProjectCard project={project} onClick={onCardClick} />
        </div>
      ))}
    </div>
  );
}
