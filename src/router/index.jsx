import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage, Dashboard, CourseDetail } from '../app/pages'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/curso/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
