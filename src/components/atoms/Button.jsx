import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Button = forwardRef(({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled,
  loading,
  ...props
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-secondary/90 border-0",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 hover:from-gray-200 hover:to-gray-300",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white hover:border-transparent",
    ghost: "bg-transparent hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 text-primary border-0",
    success: "bg-gradient-to-r from-success to-green-600 text-white shadow-lg hover:shadow-xl hover:from-success/90 hover:to-green-600/90",
    warning: "bg-gradient-to-r from-warning to-orange-600 text-white shadow-lg hover:shadow-xl hover:from-warning/90 hover:to-orange-600/90",
    error: "bg-gradient-to-r from-error to-red-600 text-white shadow-lg hover:shadow-xl hover:from-error/90 hover:to-red-600/90"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button