'use client'

import { useState } from 'react'
import { Dialog } from '@reach/dialog'
import Logo from '@/components/logo'
import '@reach/dialog/styles.css'

type ModalState = 'login' | 'register' | 'none'

export default function Home() {
  const [openModal, setOpenModal] = useState<ModalState>('none')
  return (
    <div>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
      </Dialog>
      <Dialog aria-label="Register form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
      </Dialog>
    </div>
  )
}
