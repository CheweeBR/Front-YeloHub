import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from './public.routes'
import { privateRoutes } from './private.routes'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {privateRoutes}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}