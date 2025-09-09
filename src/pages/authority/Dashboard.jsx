import { useState } from "react"
import { useTranslation } from "../../context/TranslationContext"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function AuthorityDashboard() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState("all")

  // sample alerts with coordinates
  const alerts = [
    { id: 1, level: "high", message: t("Panic alert at Mall Road"), time: "10:32", location: [32.2432, 77.1892] },
    { id: 2, level: "medium", message: t("Geo-fence breach in Solang Valley"), time: "12:15", location: [32.3195, 77.1584] },
    { id: 3, level: "high", message: t("SOS signal from Tourist ID T101"), time: "14:05", location: [32.2459, 77.1786] },
  ]

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.level === filter)

  // dynamic marker colors
  const getMarkerIcon = (level) => {
    const color = level === "high" ? "red" : level === "medium" ? "orange" : "blue"
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="background:${color}; width:14px; height:14px; border-radius:50%"></div>`,
    })
  }

  return (
    <div className="grid gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-slate-800 font-bold">128</div>
          <div className="text-sm text-slate-600">{t("Active Tourists Today")}</div>
        </div>
        <div className="card p-4">
          <div className="text-slate-800 font-bold">23</div>
          <div className="text-sm text-slate-600">{t("Open Cases")}</div>
        </div>
        <div className="card p-4">
          <div className="text-slate-800 font-bold">82</div>
          <div className="text-sm text-slate-600">{t("Avg. Safety Score")}</div>
        </div>
        <div className="card p-4">
          <div className="text-slate-800 font-bold">5</div>
          <div className="text-sm text-slate-600">{t("Most Risky Zones")}</div>
        </div>
      </div>

      {/* Alerts */}
      <section className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-600 font-semibold">{t("Alerts")}</h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-800 text-slate-100 rounded px-2 py-1"
          >
            <option value="all">{t("All")}</option>
            <option value="high">{t("High")}</option>
            <option value="medium">{t("Medium")}</option>
          </select>
        </div>
        <div className="space-y-2">
          {filtered.map((a) => (
            <div key={a.id} className="flex items-center justify-between bg-slate-800 rounded px-3 py-2">
              <span>{a.message}</span>
              <span className="text-xs text-slate-400">{a.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="card p-4 h-[400px]">
        <h3 className="text-lg font-semibold mb-3">{t("Live Map of Alerts")}</h3>
        <MapContainer center={[32.2432, 77.1892]} zoom={12} className="h-full w-full rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          />
          {filtered.map((alert, i) => (
            <Marker key={i} position={alert.location} icon={getMarkerIcon(alert.level)}>
              <Popup>
                <b>{alert.message}</b>
                <br />
                {t("Time")}: {alert.time}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </div>
  )
}
