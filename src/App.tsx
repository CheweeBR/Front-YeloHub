import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/login'
import CatalogoPage from './pages/catalogo/catalogo'
import AdminPage from './pages/admin/admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App