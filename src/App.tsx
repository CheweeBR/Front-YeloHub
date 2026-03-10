import { AuthProvider } from './context/authContext'
import { AppRoutes } from './routes'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App