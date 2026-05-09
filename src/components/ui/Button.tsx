interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost'
}

export default function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const base = 'px-4 py-2 rounded font-medium transition'

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent hover:bg-gray-100',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
