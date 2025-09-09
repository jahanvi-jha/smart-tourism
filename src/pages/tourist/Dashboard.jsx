"use client"
import { useState } from "react"
import { useTranslation } from "../../context/TranslationContext"
import MapComponent from "../../components/MapComponent"
import SafetyScoreCard from "../../components/SafetyScoreCard"
import PanicButton from "../../components/PanicButton"

export default function TouristDashboard() {
  const { t } = useTranslation()
  const [tracking, setTracking] = useState(true)
  const [alerts] = useState([
    { id: 1, type: t("panic"), text: t("Tourist triggered Panic Button near Manali, 18:32") },
    { id: 2, type: t("geofence"), text: t("Geo-fence breach detected near restricted zone, 16:10") },
  ])
  const score = 85

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-4">
      {/* Profile + Score */}
      <section className="card">
        <div className="text-slate-600 font-semibold">{t("Tourist #102")}</div>
        <div className="mt-3">
          <SafetyScoreCard score={score} />
        </div>
        <div className="mt-4 text-slate-600">
          <div className="text-sm uppercase tracking-wide text-slate-800">{t("Location")}</div>
          <div className="font-medium">{t("Manali")}</div>
          <div className="hr" />
          <div className="text-sm uppercase tracking-wide text-slate-800">{t("Trip Dates")}</div>
          <div className="font-medium">{t("April 24 – April 28")}</div>
        </div>
        <div className="mt-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={tracking} onChange={(e) => setTracking(e.target.checked)} />
            <span className="text-sm text-slate-800">{t("Real-time Tracking")}</span>
          </label>
        </div>
      </section>

      {/* Map */}
      <section className="card">
        <MapComponent variant="tourist" />
        <div className="mt-4 flex justify-end">
          <PanicButton />
        </div>
      </section>

      {/* Alerts */}
      <section className="card">
        <div className="flex items-center justify-between mb-2">
          <h3 className=" text-slate-700 font-bold">{t("Alerts")}</h3>
        </div>
        <ul className="space-y-2">
          {alerts.map((a) => (
            <li key={a.id} className="rounded-lg bg-slate-800/70 p-3 flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${a.type === "panic" ? "bg-red-500" : "bg-yellow-400"}`}
              />
              <span className="text-sm text-slate-200">{a.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
