import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useEffect, useState } from "react"
import { translateText } from "../services/translator"

export default function RoleShell({ role }) {
  const location = useLocation()
  const [lang, setLang] = useState(localStorage.getItem("preferredLanguage") || "en")
  const [translatedTitle, setTranslatedTitle] = useState("")

  useEffect(() => {
    async function doTranslate() {
      if (lang !== "en") {
        const result = await translateText("Smart Tourist Portal", lang)
        setTranslatedTitle(result)
      } else {
        setTranslatedTitle("Smart Tourist Portal")
      }
    }
    doTranslate()
  }, [lang])

  return (
    <div className="min-h-screen bg-ink text-slate-100">
      <Navbar title={translatedTitle} />
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-4 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
        <Sidebar role={role} />
        <main className="min-h-[70vh]">
          <Outlet key={location.pathname} />
        </main>
      </div>
    </div>
  )
}

