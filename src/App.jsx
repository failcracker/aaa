import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '/src/pages/auth/Login'
import AdminLayout from '/src/layouts/AdminLayout'
import Dashboard from '/src/pages/dashboard/Index'

import User from '/src/pages/dashboard/user/Index'

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  )
}
