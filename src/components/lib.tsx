import { cn } from '@/lib/utils'
import { Dialog as ReachDialog, type DialogProps } from '@reach/dialog'
import type { ComponentProps } from 'react'
import { FaSpinner } from 'react-icons/fa'

export function Spinner() {
  return <FaSpinner className="animate-spin" aria-label="loading" />
}

export function CircleButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={cn(
        'rounded-[30px] p-0 size-10 leading-none flex items-center justify-center bg-white text-text border border-gray10 cursor-pointer',
        props.className,
      )}
    />
  )
}

export function Dialog(props: DialogProps & { className?: string }) {
  return (
    <ReachDialog
      {...props}
      className={cn(
        'max-w-[450px] rounded-md !pb-[3.5em] shadow-lg mx-auto !w-full',
        props.className,
      )}
    />
  )
}

export function Input(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={cn(
        'rounded-md border border-gray10 px-3 py-2 bg-gray',
        props.className,
      )}
    />
  )
}

export function FormGroup(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('flex flex-col w-full', props.className)} />
  )
}
