import { useTranslation } from "../../context/TranslationContext"

export default function Profile() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <section className="card">
        <h3 className="text-slate-600 font-semibold mb-3">{t("Digital Tourist ID")}</h3>
        <div className="flex items-center gap-4">
          <div className="h-28 w-28 bg-white rounded-lg flex items-center justify-center ring-1 ring-slate-300">
            <img alt="QR" src="/qr-code-placeholder.png" className="h-[110px] w-[110px]" />
          </div>
          <div>
            <div className="text-slate-600 text-sm">{t("Tourist ID")}</div>
            <div className="text-slate-600 font-semibold">T102</div>
            <div className="text-slate-600 text-sm mt-2">{t("Name")}</div>
            <div className="text-slate-600 font-medium">Alex Traveler</div>
            <div className="text-slate-600 text-sm mt-2">{t("Validity")}</div>
            <div className="text-slate-600 font-medium">Apr 24 – Apr 28</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="text-slate-600 font-semibold mb-3">{t("Emergency Contacts")}</h3>
        <ul className="space-y-2">
          <li className="text-slate-600 flex items-center justify-between">
            <span>{t("Local Police")}</span>
            <a className="text-blue-600 hover:underline" href="tel:100">100</a>
          </li>
          <li className="text-slate-600 flex items-center justify-between">
            <span>{t("Tour Guide")}</span>
            <a className="text-blue-600 hover:underline" href="tel:+91123456789">+91 12345 6789</a>
          </li>
          <li className="text-slate-600 flex items-center justify-between">
            <span>{t("Emergency Services")}</span>
            <a className="text-blue-600 hover:underline" href="tel:112">112</a>
          </li>
        </ul>
      </section>
    </div>
  )
}
