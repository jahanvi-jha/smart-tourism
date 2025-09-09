import { useTranslation } from "../../context/TranslationContext"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts"
import { useMemo } from "react"

export default function Analytics() {
  const { t } = useTranslation()

  // Recompute chart data whenever `t` changes (i.e., language changes)
  const lineData = useMemo(() => [
    { day: t("Monday"), score: 78 },
    { day: t("Tuesday"), score: 82 },
    { day: t("Wednesday"), score: 80 },
    { day: t("Thursday"), score: 85 },
    { day: t("Friday"), score: 83 },
    { day: t("Saturday"), score: 81 },
    { day: t("Sunday"), score: 84 },
  ], [t])

  const barData = useMemo(() => [
    { type: t("Panic"), count: 3 },
    { type: t("Geo-Fence"), count: 7 },
    { type: t("Anomaly"), count: 4 },
  ], [t])

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {/* Line chart */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-700 font-bold">{t("Safety Score Trends")}</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ right: 8, left: -16 }}>
              <CartesianGrid stroke="#1f2937" />
              <XAxis dataKey="day" stroke="#1f2937" />
              <YAxis stroke="#1f2937" domain={[70, 90]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#1f2937" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Bar chart */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-700 font-bold">{t("Incidents by Category")}</h3>
          <button className="btn btn-primary" onClick={() => alert(t("Exporting report... (mock)"))}>
            {t("Export Reports")}
          </button>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ right: 8, left: -16 }}>
              <CartesianGrid stroke="#1f2937" />
              <XAxis dataKey="type" stroke="#1f2937" />
              <YAxis stroke="#1f2937" allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
