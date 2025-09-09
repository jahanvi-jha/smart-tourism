"use client"
import { useState } from "react"
import { useTranslation } from "../../context/TranslationContext"

const MOCK = {
  T102: {
    name: "Alex Traveler",
    validity: "Apr 24 – Apr 28",
    contacts: [
      { label: "Emergency", value: "112" },
      { label: "Local Police", value: "100" },
    ],
  },
  T209: { name: "Riya Singh", validity: "May 2 – May 6", contacts: [{ label: "Emergency", value: "112" }] },
}

export default function TouristID() {
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const data = MOCK[query?.trim()]

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 rounded-lg bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={t("Enter Tourist ID (e.g., T102)")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">{t("Search")}</button>
      </div>

      {!data ? (
        <div className="text-slate-400">{t("Enter a valid Tourist ID to view details.")}</div>
      ) : (
        <div className="card grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-slate-900 font-semibold mb-2">{t("Digital ID")}</h3>
            <div className="flex items-center gap-4">
              <div className="h-28 w-28 bg-white rounded-lg flex items-center justify-center ring-1 ring-slate-300">
                <img alt="QR" src="/qr-code-placeholder.png" className="h-[110px] w-[110px]" />
              </div>
              <div>
                <div className="text-slate-900 text-sm">{t("Tourist ID")}</div>
                <div className="text-slate-600 font-semibold">{query.trim()}</div>
                <div className="text-slate-900 text-sm mt-2">{t("Name")}</div>
                <div className="text-slate-600 font-medium">{data.name}</div>
                <div className="text-slate-900 text-sm mt-2">{t("Validity")}</div>
                <div className="text-slate-600 font-medium">{data.validity}</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold mb-2">{t("Emergency Contacts")}</h3>
            <ul className="space-y-2">
              {data.contacts.map((c, i) => (
                <li key={i} className="text-slate-700 flex items-center justify-between">
                  <span>{t(c.label)}</span>
                  <a className="text-blue-700 hover:underline" href={`tel:${c.value}`}>
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
