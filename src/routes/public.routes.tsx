import { Route } from 'react-router-dom'
import Login from '../pages/login/login'
import SemAcesso from '../pages/sem-acesso/sem.acesso'

export const publicRoutes = (
  <>
    <Route path="*" element={<Login />} />
    <Route path="/sem-acesso" element={<SemAcesso />} />
  </>
)