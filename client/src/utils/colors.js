// Maps user color key -> Tailwind-compatible inline styles
// (Tailwind JIT can't generate dynamic class names from runtime strings,
//  so we use inline styles for member colors)

export const COLOR_MAP = {
  teal:   { bg: "#E1F5EE", text: "#0F6E56", border: "#1D9E75" },
  purple: { bg: "#EEEDFE", text: "#3C3489", border: "#7F77DD" },
  coral:  { bg: "#FAECE7", text: "#712B13", border: "#D85A30" },
  blue:   { bg: "#E6F1FB", text: "#0C447C", border: "#378ADD" },
  amber:  { bg: "#FAEEDA", text: "#633806", border: "#BA7517" },
};

export const STATUS_MAP = {
  "done":        { label: "Done",        bg: "#E1F5EE", text: "#0F6E56" },
  "in-progress": { label: "In progress", bg: "#FAEEDA", text: "#633806" },
  "idea":        { label: "Idea",        bg: "#EEEDFE", text: "#3C3489" },
  "planned":     { label: "Planned",     bg: "#E6F1FB", text: "#0C447C" },
  "archived":    { label: "Archived",    bg: "#F1EFE8", text: "#5F5E5A" },
};

export const getColor = (key) => COLOR_MAP[key] || COLOR_MAP.teal;
export const getStatus = (key) => STATUS_MAP[key] || STATUS_MAP.idea;
