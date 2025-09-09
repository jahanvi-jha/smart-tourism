import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import TouristDashboard from "./pages/tourist/Dashboard"
import Itinerary from "./pages/tourist/Itinerary"
import TouristAlerts from "./pages/tourist/Alerts"
import Profile from "./pages/tourist/Profile"
import AuthorityDashboard from "./pages/authority/Dashboard"
import AuthorityAlerts from "./pages/authority/Alerts"
import TouristID from "./pages/authority/TouristID"
import Analytics from "./pages/authority/Analytics"
import RoleShell from "./components/RoleShell"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Tourist routes */}
      <Route element={<RoleShell role="tourist" />} path="/tourist">
        <Route index element={<TouristDashboard />} />
        <Route path="dashboard" element={<TouristDashboard />} />
        <Route path="itinerary" element={<Itinerary />} />
        <Route path="alerts" element={<TouristAlerts />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Authority routes */}
      <Route element={<RoleShell role="authority" />} path="/authority">
        <Route index element={<AuthorityDashboard />} />
        <Route path="dashboard" element={<AuthorityDashboard />} />
        <Route path="alerts" element={<AuthorityAlerts />} />
        <Route path="tourist-id" element={<TouristID />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  )
}
