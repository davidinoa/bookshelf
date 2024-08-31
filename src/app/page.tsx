'use client'

import '@reach/dialog/styles.css'
import { useState } from 'react'
import Logo from '@/components/logo'
import AuthForm from '@/components/auth-form'
import Button from '@/components/button'
import Dialog from '@reach/dialog'

type ModalState = 'login' | 'register' | 'none'

type AuthFormData = { username: string; password: string }

export default function Home() {
  const [openModal, setOpenModal] = useState<ModalState>('none')

  function login(formData: AuthFormData) {
    console.log('login', formData)
  }

  function register(formData: AuthFormData) {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <div>
        <Button intent="primary" onClick={() => setOpenModal('login')}>
          Login
        </Button>
      </div>
      <div>
        <Button intent="secondary" onClick={() => setOpenModal('register')}>
          Register
        </Button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <Button intent="secondary" onClick={() => setOpenModal('none')}>
            Close
          </Button>
        </div>
        <h3>Login</h3>
        <AuthForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <Button intent="secondary" onClick={() => setOpenModal('none')}>
            Close
          </Button>
        </div>
        <h3>Register</h3>
        <AuthForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  )
}
