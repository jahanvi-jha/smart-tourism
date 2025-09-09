"use client"
import { useTranslation } from "../context/TranslationContext"

export default function PanicButton({ onPress }) {
  const {t} = useTranslation()
  return (
    <button
      onClick={() => {
        alert(t("SOS triggered! Notifying authorities (mock)."))
        onPress?.()
      }}
      className="btn btn-danger w-full md:w-auto md:min-w-[220px] h-12 text-lg font-semibold shadow-soft"
      aria-label={t("Panic Button")}
    >
      {t("PANIC BUTTON")}
    </button>
  )
}
