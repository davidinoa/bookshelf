import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const classes = cva(
  ['py-[10px] px-[15px] border-0 leading-none rounded-[3px]'],
  {
    variants: {
      intent: {
        primary: 'bg-indigo text-white',
        secondary: 'bg-gray text-text',
      },
    },
    defaultVariants: {
      intent: 'primary',
    },
  },
)

type Props = {
  intent?: 'primary' | 'secondary'
} & ComponentProps<'button'>

export default function Button({ intent = 'primary', ...props }: Props) {
  return <button className={classes({ intent })} {...props} />
}
