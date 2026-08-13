import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../features/pages/auth/hooks/useAuth'
import { ToastProvider } from '../common/components/Toast'
import AppRoutes from './index'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
