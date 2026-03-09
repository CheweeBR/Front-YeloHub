import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Catalogo from './pages/catalogo/catalogo'

function App() {

  const [role, setRole] = useState('');

  function checkRole() {
    if (role === 'vendedor') {
      return <Catalogo />
    }
  }

  return (
    <>
      <nav className='w-full bg-black text-white p-4 flex justify-end gap-4'>
        <button onClick={() => setRole('admin')}>Admin</button>
      </nav>
      <div>
        {checkRole()}
      </div>
    </>
  )
}

export default App
