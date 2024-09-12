import { type ReactElement } from 'react'
import { FormGroup, Input } from './lib'
import { authFormDataSchema, type AuthFormData } from '@/types'

type Props = {
  onSubmit: (formData: AuthFormData) => void
  submitButton: ReactElement
}

export default function AuthForm({ onSubmit, submitButton }: Props) {
  function submitAction(formData: FormData) {
    const formValues = Object.fromEntries(formData)
    const parsed = authFormDataSchema.safeParse(formValues)
    if (parsed.error) throw new Error(parsed.error.message)
    onSubmit(parsed.data)
  }

  return (
    <form action={submitAction} className="flex flex-col items-stretch">
      <FormGroup className="mx-auto my-[10px] max-w-[300px]">
        <label htmlFor="username">Username</label>
        <Input id="username" name="username" />
      </FormGroup>
      <FormGroup className="mx-auto my-[10px] max-w-[300px]">
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" name="password" />
      </FormGroup>
      <div className={'mx-auto my-[10px] w-full max-w-[300px]'}>
        {submitButton}
      </div>
    </form>
  )
}
