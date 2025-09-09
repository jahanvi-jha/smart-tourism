import { NavLink } from "react-router-dom"
import { useTranslation } from "../context/TranslationContext"

const navs = {
  tourist: [
    { to: "/tourist/dashboard", label: "Dashboard" },
    { to: "/tourist/itinerary", label: "Itinerary" },
    { to: "/tourist/alerts", label: "Alerts" },
    { to: "/tourist/profile", label: "Profile / Digital ID" },
  ],
  authority: [
    { to: "/authority/dashboard", label: "Dashboard" },
    { to: "/authority/alerts", label: "Alerts" },
    { to: "/authority/tourist-id", label: "Digital Tourist ID" },
    { to: "/authority/analytics", label: "Analytics & Reports" },
  ],
}

export default function Sidebar({ role = "tourist" }) {
  const items = navs[role] || []
  const { t } = useTranslation()

  return (
    <aside className="hidden md:block">
      <nav className="sticky top-4 card p-2">
        <ul className="flex flex-col gap-1">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 ${isActive ? "nav-active" : "text-slate-700"}`
                }
                end
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t(it.label)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
