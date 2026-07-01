import { FiGithub, FiExternalLink, FiPin } from "react-icons/fi";
import { getColor, getStatus } from "../../utils/colors";

// Icon map — react-icons/fi names used in the DB
// We dynamically import from react-icons on the fly
import * as FiIcons from "react-icons/fi";

function CoverIcon({ name, size = 28 }) {
  const Icon = FiIcons[name] || FiIcons.FiBox;
  return <Icon size={size} />;
}

export default function ProjectCard({ project, onClick }) {
  const authorColor = getColor(project.author?.color);
  const status      = getStatus(project.status);

  return (
    <div
      onClick={() => onClick?.(project)}
      className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-700 transition-all hover:-translate-y-0.5 group"
      style={{ borderTop: `2px solid ${authorColor.border}` }}
    >
      {/* Cover */}
      <div
        className="flex items-center justify-center py-6"
        style={{ background: authorColor.bg + "22" }} // subtle tinted bg
      >
        <div style={{ color: authorColor.border }}>
          <CoverIcon name={project.coverIcon || "FiBox"} size={32} />
        </div>
      </div>

      {/* Content */}
      <div className="px-3.5 py-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-sm font-medium text-zinc-100 leading-snug group-hover:text-white transition-colors">
            {project.title}
          </h3>
          {project.pinned && <FiPin size={12} className="text-zinc-600 flex-shrink-0 mt-0.5" />}
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-zinc-600 bg-zinc-800 rounded px-1.5 py-0.5">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] text-zinc-700">+{project.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {/* Author avatar */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-medium"
              style={{ background: authorColor.bg, color: authorColor.text }}
            >
              {project.author?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            {/* Status badge */}
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-full"
              style={{ background: status.bg, color: status.text }}
            >
              {status.label}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <FiGithub size={13} />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <FiExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
