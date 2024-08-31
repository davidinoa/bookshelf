import { type FormEvent } from 'react'

type Props = {
  onSubmit: (formData: { username: string; password: string }) => void
  buttonText: string
}

export default function AuthForm({ onSubmit, buttonText }: Props) {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  )
}
