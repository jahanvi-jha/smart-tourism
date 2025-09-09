import { useTranslation } from "../context/TranslationContext"

function getScoreState(score, t) {
  if (score >= 80) return { label: t("Safe"), color: "bg-emerald-500", text: "text-emerald-100" }
  if (score >= 50) return { label: t("Caution"), color: "bg-yellow-400", text: "text-yellow-900" }
  return { label: t("High Risk"), color: "bg-red-500", text: "text-red-100" }
}

export default function SafetyScoreCard({ score = 85 }) {
  const { t } = useTranslation()
  const state = getScoreState(score, t)

  return (
    <div className="card">
      <div className="text-sm text-slate-800 mb-2">Safety Score</div>
      <div className="text-slate-500 flex items-end justify-between">
        <div className="text-4xl font-semibold">{score}</div>
        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${state.color} ${state.text}`}>{state.label}</span>
      </div>
      <div className="mt-3 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${Math.min(100, Math.max(0, score))}%` }} />
      </div>
    </div>
  )
}
