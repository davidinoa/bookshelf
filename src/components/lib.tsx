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
        'flex size-10 cursor-pointer items-center justify-center rounded-[30px] border border-gray10 bg-white p-0 leading-none text-text',
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
        'mx-auto !w-full max-w-[450px] rounded-md !pb-[3.5em] shadow-lg',
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
        'rounded-md border border-gray10 bg-gray px-3 py-2',
        props.className,
      )}
    />
  )
}

export function FormGroup(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn('flex w-full flex-col', props.className)} />
  )
}

export function BookList(props: ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={cn(
        'grid list-none grid-rows-[repeat(auto-fill,minmax(100px,1fr))] gap-[1em] p-0',
        props.className,
      )}
    />
  )
}
