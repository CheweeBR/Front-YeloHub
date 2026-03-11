// private.routes.tsx
import { Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import { ProtectedRoute } from '../components/security/ProtectedRoute'
import AdminPage from '../pages/admin/admin'
import CatalogoPage from '../pages/catalogo/catalogo'

export const privateRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/catalogo" element={
      <ProtectedRoute roles={['admin', 'vendedor', 'cliente']}>
        <CatalogoPage />
      </ProtectedRoute>
    } />
    <Route path="/admin" element={
      <ProtectedRoute roles={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    } />
  </Route>
)