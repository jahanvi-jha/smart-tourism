"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "../context/TranslationContext"

const MOCK_TOURISTS = ["T100", "T101", "T102", "T200"]
const MOCK_AUTHORITIES = ["A100", "A200", "A999"]

export default function Login() {
  const { t, language, setLanguage, preload } = useTranslation() // ✅ use context
  const [role, setRole] = useState("tourist")
  const [id, setId] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    localStorage.setItem("preferredLanguage", language)

    if (role === "tourist") {
      if (!MOCK_TOURISTS.includes(id.trim())) {
        setError(t("Invalid Tourist ID (try T100, T101, T102, or T200)"))
        return
      }
      navigate("/tourist/dashboard")
    } else {
      if (!MOCK_AUTHORITIES.includes(id.trim())) {
        setError(t("Invalid Authority ID (try A100, A200, or A999)"))
        return
      }
      navigate("/authority/dashboard")
    }
  }

  // ✅ Preload translations when language changes
  useEffect(() => {
    [
      "Smart Tourist Safety Monitoring & Incident Response",
      "AI • Geo-fencing • Blockchain • Tourism Safety",
      "Login",
      "Tourist Login",
      "Authority Login",
      "Tourist ID",
      "Authority ID",
      "Preferred Language",
      "Continue",
      "Demo IDs — Tourists: T100, T101, T102, T200. Authorities: A100, A200, A999.",
      "Invalid Tourist ID (try T100, T101, T102, or T200)",
      "Invalid Authority ID (try A100, A200, or A999)"
    ].forEach((txt) => preload(txt))
  }, [language, preload])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#fef9c3] to-[#fff7ed] text-slate-900">

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              {t("Smart Tourist Safety Monitoring & Incident Response")}
            </h1>
            <p className="mt-4 text-slate-600">
              {t("AI • Geo-fencing • Blockchain • Tourism Safety")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card bg-slate-900/80 p-6 shadow-soft">
            <h2 className="text-2xl font-semibold mb-4">{t("Login")}</h2>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setRole("tourist")}
                className={`btn ${role === "tourist" ? "btn-primary" : "btn-ghost"}`}
              >
                {t("Tourist Login")}
              </button>
              <button
                type="button"
                onClick={() => setRole("authority")}
                className={`btn ${role === "authority" ? "btn-primary" : "btn-ghost"}`}
              >
                {t("Authority Login")}
              </button>
            </div>

            {/* ID input */}
            <label className="block text-sm text-slate-800 mb-2">
              {role === "tourist" ? t("Tourist ID") : t("Authority ID")}
            </label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={role === "tourist" ? "e.g., T100" : "e.g., A100"}
              className="w-full rounded-lg bg-slate-800 border border-slate-100 px-3 py-2 text-slate-100"
            />

            {/* Language selector */}
            <label className="block text-sm text-slate-800 mt-4 mb-2">
              {t("Preferred Language")}
            </label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value)
                localStorage.setItem("preferredLanguage", e.target.value)
              }}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="bn">বাংলা</option>
              <option value="gu">ગુજરાતી</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ml">മലയാളം</option>
              <option value="mr">मराठी</option>
              <option value="or">ଓଡ଼ିଆ</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
            </select>

            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

            <button className="btn btn-primary w-full mt-6" type="submit">
              {t("Continue")}
            </button>

            <p className="mt-3 text-xs text-slate-600">
              {t("Demo IDs — Tourists: T100, T101, T102, T200. Authorities: A100, A200, A999.")}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
