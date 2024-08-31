import { cn } from '@/utils/styles'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  children: React.ReactNode
}

function Button({
  type = 'button',
  className = '',
  style = {},
  onClick,
  children
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('rounded p-2 bg-hover text font-semibold', className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { Button }