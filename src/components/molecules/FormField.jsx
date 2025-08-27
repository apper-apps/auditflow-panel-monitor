import Label from "@/components/atoms/Label"
import { cn } from "@/utils/cn"

export default function FormField({ 
  label, 
  error, 
  required, 
  children, 
  className,
  ...props 
}) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <Label className={cn(required && "after:content-['*'] after:ml-0.5 after:text-error")}>
          {label}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  )
}