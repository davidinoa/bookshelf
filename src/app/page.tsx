'use client'

import '@reach/dialog/styles.css'
import Logo from '@/components/logo'
import AuthForm from '@/components/auth-form'
import Button from '@/components/button'
import { Modal, ModalContents, ModalOpenButton } from '@/components/modal'

type AuthFormData = { username: string; password: string }

export default function Home() {
  function login(formData: AuthFormData) {
    console.log('login', formData)
  }

  function register(formData: AuthFormData) {
    console.log('register', formData)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Logo width={80} height={80} />
      <h1 className="text-[calc(1.375rem+1.5vw)] font-medium leading-tight mb-2 mt-0">
        Bookshelf
      </h1>
      <div className="grid grid-cols-2 gap-3">
        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <AuthForm onSubmit={login} submitButton={<Button>Login</Button>} />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button intent="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <AuthForm
              onSubmit={register}
              submitButton={<Button intent="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}
