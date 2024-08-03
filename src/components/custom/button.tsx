import { cn } from '@/lib/utils'
import React, { ButtonHTMLAttributes } from 'react'

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...rest }) => {
  return (
    <button className={cn(
        "px-5 py-2 bg-[#6e6dfb] text-white rounded-sm font-semibold disabled:cursor-not-allowed disabled:brightness-75",
        className
    )} {...rest}>
        {children}
    </button>
  )
}

export default Button