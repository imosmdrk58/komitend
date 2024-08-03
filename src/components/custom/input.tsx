import { cn } from '@/lib/utils'
import React from 'react'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...rest }) => {
  return (
    <input className={cn(
        'px-3 py-2 bg-[#f1f1f1] dark:bg-[#2f303e] text-[#000000] dark:text-[#aaaaaa] rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder:text-[#7b7b7b]',
        className
    )} {...rest} />
  )
}

export default Input