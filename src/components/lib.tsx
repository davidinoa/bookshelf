import { Dialog as ReachDialog, type DialogProps } from '@reach/dialog'
import type { ComponentProps } from 'react'

export function CircleButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className="rounded-[30px] p-0 size-10 leading-none flex items-center justify-center bg-white text-[#434449] border border-[#f1f1f4] cursor-pointer"
    />
  )
}

export function Dialog(props: DialogProps) {
  return (
    <ReachDialog
      {...props}
      className="max-w-[450px] rounded-[3px] pb-[3.5em] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)] my-[20vh] mx-auto max-lg:w-full max-lg:my-[10vh] max-lg:mx-auto"
    />
  )
}

export function Input(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className="rounded-[3px] border border-[#f1f1f4] px-[12px] py-[8px]"
    />
  )
}

export function FormGroup(props: ComponentProps<'div'>) {
  return <div {...props} className="flex flex-col" />
}
