import { Route } from 'react-router-dom'
import Login from '../pages/login/login'
import SemAcesso from '../pages/sem-acesso/sem.acesso'
import NaoEncontrada from '../pages/naoEncontrada/naoEncontrada'

export const publicRoutes = (
  <>
    <Route path="*" element={ <NaoEncontrada /> } />
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sem-acesso" element={<SemAcesso />} />
  </>
)