import { cn } from '@/utils/styles'

type InputProps = {
  type?: 'text' | 'email' | 'password'
  value: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  className?: string
}

function Input({
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled = false,
  required = false,
  readonly = false,
  className = ''
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      required={required}
      readOnly={readonly}
      className={cn('rounded p-2 bg-hover text', className)}
    />
  )
}

export { Input }