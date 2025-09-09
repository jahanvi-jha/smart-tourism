"use client"
import { useState } from "react"
import { useTranslation } from "../../context/TranslationContext"

const initial = [
  { id: 1, category: "Panic", touristId: "T102", location: "Manali", time: "18:32", resolved: false },
  { id: 2, category: "Geo-fence", touristId: "T209", location: "Restricted Zone", time: "16:10", resolved: false },
  { id: 3, category: "Anomaly", touristId: "T150", location: "Old Town", time: "15:48", resolved: true },
]

export default function Alerts() {
  const [items, setItems] = useState(initial)
  const { t } = useTranslation()

  const toggle = (id) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a)))

  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div key={a.id} className="card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-800">
                {t(a.category)} • {a.time}
              </div>
              <div className="text-slate-500 font-medium">
                {t("Tourist")} {a.touristId} • {t(a.location)}
              </div>
            </div>
            <button
              className={`btn ${a.resolved ? "btn-outline" : "btn-primary"}`}
              onClick={() => toggle(a.id)}
            >
              {a.resolved ? t("Mark Unresolved") : t("Resolve Incident")}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
