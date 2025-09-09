export default function MapComponent({ variant = "tourist" }) {
  if (variant === "tourist") {
    return (
      <div className="map-surface radial-heat relative min-h-[340px]">
        {/* location pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-primary/20 blur-xl" />
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white shadow-soft">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
            </div>
          </div>
        </div>
        {/* geo-fence safe ring indicator */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-6 top-6 h-4 w-4 rounded-full bg-green-600/80" title="Safe Zone" />
          <div className="absolute right-8 bottom-8 h-4 w-4 rounded-full bg-orange-500/80" title="Caution Zone" />
          <div className="absolute right-6 top-10 h-4 w-4 rounded-full bg-red-600/90" title="Geo-fence Alert" />
        </div>
      </div>
    )
  }

  // Authority variant
  return (
    <div className="map-surface relative min-h-[420px] heat-overlay">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url('/map-surface.jpg')" }} />
      {/* Cluster markers */}
      {[
        { left: "18%", top: "60%", color: "bg-green-600", label: "11" },
        { left: "58%", top: "28%", color: "bg-green-600", label: "10" },
        { left: "48%", top: "62%", color: "bg-orange-500", label: "9" },
        { left: "75%", top: "75%", color: "bg-orange-500", label: "10" },
      ].map((m, i) => (
        <div key={i} className="absolute" style={{ left: m.left, top: m.top }}>
          <div
            className={`h-8 px-2 rounded-full ${m.color} text-black font-semibold flex items-center justify-center shadow-soft`}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  )
}
