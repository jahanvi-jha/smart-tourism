"use client"
import { BrowserRouter } from "react-router-dom"
import App from "../src/App"
import "../src/index.css"

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </div>
  )
}
