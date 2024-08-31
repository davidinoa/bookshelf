import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const classes = cva(
  ['py-[10px] px-[15px] border-0 leading-none rounded-[3px]'],
  {
    variants: {
      intent: {
        primary: 'bg-[#3f51b5] text-white',
        secondary: 'bg-[#f1f2f7] text-[#434449]',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
)

type Props = {
  intent: 'primary' | 'secondary'
} & ComponentProps<'button'>

export default function Button({ intent, children, ...props }: Props) {
  return (
    <button className={classes({ intent })} {...props}>
      {children}
    </button>
  )
}
