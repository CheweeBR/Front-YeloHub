import { Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import { ProtectedRoute } from '../components/security/ProtectedRoute'
import AdminPage from '../pages/admin/admin'
import CatalogoPage from '../pages/catalogo/catalogo'
import PedidosPage from '../pages/pedidos/pedidos'
import PedidoDetalhePage from '../pages/pedidos/pedidoDetalhePage'
import VendedoresPage from '../pages/admin/vendedores/vendedores'
import ClientesPage from '../pages/admin/clientes/clientes'
import ProdutosPage from '../pages/admin/produtos/produtos'
import FinanceiroPage from '../pages/admin/financeiro/financeiro'
import ConfiguracoesPage from '../pages/admin/config/config'

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
    <Route path="/pedidos/:id" element={
      <ProtectedRoute roles={['admin', 'vendedor']}>
        <PedidoDetalhePage />
      </ProtectedRoute>
    } />
    <Route path="/admin/vendedores" element={
      <ProtectedRoute roles={['admin']}>
        <VendedoresPage />
      </ProtectedRoute>
    } />
    <Route path="/admin/clientes" element={
      <ProtectedRoute roles={['admin']}>
        <ClientesPage />
      </ProtectedRoute>
    } />
    <Route path="/admin/produtos" element={
      <ProtectedRoute roles={['admin']}>
        <ProdutosPage />
      </ProtectedRoute>
    } />
    <Route path="/admin/financeiro" element={
      <ProtectedRoute roles={['admin']}>
        <FinanceiroPage />
      </ProtectedRoute>
    } />
    <Route path="/admin/configuracoes" element={
      <ProtectedRoute roles={['admin']}>
        <ConfiguracoesPage />
      </ProtectedRoute>
    } />
  </Route>
)