import { type FormEvent, type ReactElement } from 'react'
import { FormGroup, Input } from './lib'

type Props = {
  onSubmit: (formData: { username: string; password: string }) => void
  submitButton: ReactElement
}

export default function AuthForm({ onSubmit, submitButton }: Props) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formElements = e.currentTarget.elements
    const usernameElement = formElements.namedItem('username')
    const passwordElement = formElements.namedItem('password')
    if (
      !(usernameElement instanceof HTMLInputElement) ||
      !(passwordElement instanceof HTMLInputElement)
    ) {
      throw new Error('Expected username and password input elements')
    }
    onSubmit({
      username: usernameElement.value,
      password: passwordElement.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
      <FormGroup className="my-[10px] mx-auto max-w-[300px]">
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup className="my-[10px] mx-auto max-w-[300px]">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div className={'my-[10px] mx-auto w-full max-w-[300px]'}>
        {submitButton}
      </div>
    </form>
  )
}
