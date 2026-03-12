import { Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import { ProtectedRoute } from '../components/security/ProtectedRoute'
import AdminPage from '../pages/admin/admin'
import CatalogoPage from '../pages/catalogo/catalogo'
import PedidosPage from '../pages/pedidos/pedidos'
import EmBreve from '../components/emBreve'

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
    <Route path="/pedidos" element={
      <ProtectedRoute roles={['admin', 'vendedor']}>
        <PedidosPage />
      </ProtectedRoute>
    } />
    <Route path="/admin/vendedores" element={
      <ProtectedRoute roles={['admin']}>
        <EmBreve titulo="Vendedores" />
      </ProtectedRoute>
    } />
    <Route path="/admin/clientes" element={
      <ProtectedRoute roles={['admin']}>
        <EmBreve titulo="Clientes" />
      </ProtectedRoute>
    } />
    <Route path="/admin/produtos" element={
      <ProtectedRoute roles={['admin']}>
        <EmBreve titulo="Produtos" />
      </ProtectedRoute>
    } />
  </Route>
)