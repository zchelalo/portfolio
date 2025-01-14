import { forwardRef } from 'react'

import { cn } from '@/utils/styles'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    type = 'button',
    className = '',
    style = {},
    onClick,
    children
  }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn('rounded p-2 bg-hover text font-semibold', className)}
        style={style}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
)

export { Button }