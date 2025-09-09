import { useState, useEffect } from "react"
import { useTranslation } from "../../context/TranslationContext"

export default function Itinerary() {
  const { t, language } = useTranslation()   // ✅ use `language` not `selectedLanguage`

  const defaultItinerary = [
    { day: t("Day 1"), date: "Apr 24", plan: t("Arrival, hotel check-in, Mall Road visit") },
    { day: t("Day 2"), date: "Apr 25", plan: t("Solang Valley trekking (permit verified)") },
  ]

  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem("itinerary")
    return saved ? JSON.parse(saved) : defaultItinerary
  })

  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary))
  }, [itinerary])

  const handleChange = (idx, field, value) => {
    const newItinerary = [...itinerary]
    newItinerary[idx][field] = value
    setItinerary(newItinerary)
  }

  const addDay = () => {
    setItinerary([
      ...itinerary,
      { day: `${t("Day")} ${itinerary.length + 1}`, date: t("Enter date"), plan: t("Enter plan") }
    ])
  }

  const removeDay = (idx) => {
    setItinerary(itinerary.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-3">
      {itinerary.map((i, idx) => (
        <div key={idx} className="card flex items-center justify-between p-3">
          <div className="flex flex-col w-full">
            <div>
              <input
                type="text"
                value={t(i.day)}
                onChange={(e) => handleChange(idx, "day", e.target.value)}
                className="bg-transparent border-b border-slate-600 text-slate-900 mr-2 focus:outline-none focus:border-blue-400"
                lang={language}   // ✅ corrected
              />
              <input
                type="text"
                value={t(i.date)}
                onChange={(e) => handleChange(idx, "date", e.target.value)}
                className="bg-transparent border-b border-slate-600 text-slate-900 focus:outline-none focus:border-blue-400"
                lang={language}   // ✅ corrected
              />
            </div>
            <textarea
              value={t(i.plan)}
              onChange={(e) => handleChange(idx, "plan", e.target.value)}
              className="block mt-1 text-slate-600 font-medium bg-transparent border-b border-slate-600 focus:outline-none focus:border-blue-400 w-full overflow-hidden"
              rows={1}
              lang={language}   // ✅ corrected
            />
          </div>
          <button
            onClick={() => removeDay(idx)}
            className="text-red-400 text-xs hover:text-red-600 ml-2"
          >
            {t("Remove")}
          </button>
        </div>
      ))}

      <button
        onClick={addDay}
        className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600"
      >
        {t("+ Add Day")}
      </button>
    </div>
  )
}
