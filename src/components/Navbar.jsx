import { Link, useLocation } from "react-router-dom"
import LanguageControls from "./LanguageControls"
import { useTranslation } from "../context/TranslationContext"

export default function Navbar() {
  const loc = useLocation()
  const atLogin = loc.pathname === "/"
  const { t } = useTranslation()

  return (
    <header className="w-full border-b border-slate-200 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/90">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/20 ring-1 ring-white/30 text-white">
            {/* simple map pin icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
            </svg>
          </span>
          <span className="font-semibold text-lg text-white text-pretty">
            {t("Smart Tourist Safety System")}
          </span>
        </Link>

        {!atLogin && (
          <div className="flex items-center gap-3">
            <LanguageControls />
          </div>
        )}
      </div>
    </header>
  )
}
