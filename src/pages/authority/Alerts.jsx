"use client"
import { useState } from "react"
import { useTranslation } from "../../context/TranslationContext"

const initialAlerts = [
  { id: 1, category: "Panic", message: "SOS activated at 18:32 near Manali", time: "18:32", resolved: false },
  { id: 2, category: "Geo-fence", message: "Entered caution zone at 16:10", time: "16:10", resolved: false },
  { id: 3, category: "Anomaly", message: "Unusual dwell time detected", time: "14:21", resolved: true },
]

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const { t } = useTranslation()

  const toggle = (id) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a)))

  return (
    <div className="space-y-3">
      {alerts.map((a) => (
        <div key={a.id} className="card flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-s text-slate-900">
              {t(a.category)} • {a.time}
            </div>
            <div className="text-slate-500">{t(a.message)}</div>
          </div>
          <button
            className={`btn ${a.resolved ? "btn-outline" : "btn-primary"}`}
            onClick={() => toggle(a.id)}
          >
            {a.resolved ? t("Mark Unresolved") : t("Mark Resolved")}
          </button>
        </div>
      ))}
    </div>
  )
}
