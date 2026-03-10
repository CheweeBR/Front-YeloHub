import { Route } from 'react-router-dom'
import Login from '../pages/login/login'
import CatalogoPage from '../pages/catalogo/catalogo'
import SemAcesso from '../pages/sem-acesso/sem.acesso'

export const publicRoutes = (
  <>
    <Route path="*" element={<Login />} />
    <Route path="/catalogo" element={<CatalogoPage />} />
    <Route path="/sem-acesso" element={<SemAcesso />} />
  </>
)