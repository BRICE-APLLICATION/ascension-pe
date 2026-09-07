import { Newspaper } from "lucide-react";
import { PALETTE } from "../../data/palette.js";

export default function NewsTab({ news }) {
  return (
    <div className="max-w-2xl flex flex-col gap-2">
      {news.map((n, i) => (<div key={i} className="p-3 rounded flex items-start gap-2" style={{ backgroundColor: PALETTE.panel }}><Newspaper size={14} color={PALETTE.textMuted} className="mt-0.5 shrink-0" /><p className="text-xs" style={{ color: PALETTE.textMuted }}>{n}</p></div>))}
    </div>
  );
}
