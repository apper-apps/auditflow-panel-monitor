import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({
  className,
  variant = "default",
  ...props
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20",
    success: "bg-gradient-to-r from-success/10 to-green-600/10 text-success border border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-orange-600/10 text-warning border border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-red-600/10 text-error border border-error/20",
    red: "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200",
    amber: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200",
    green: "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200"
  }

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge