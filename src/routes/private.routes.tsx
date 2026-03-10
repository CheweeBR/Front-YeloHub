import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import AdminPage from '../pages/admin/admin'

export const privateRoutes = (
  <>
    <Route path="/admin" element={
      <ProtectedRoute roles={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    } />
  </>
)