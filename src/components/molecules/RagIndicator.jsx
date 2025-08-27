import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

export default function RagIndicator({ 
  value = "green", 
  size = "md", 
  showLabel = false,
  interactive = false,
  onValueChange,
  className,
  ...props 
}) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  }

  const colors = {
    red: "bg-gradient-to-br from-red-500 to-red-600 shadow-red-200",
    amber: "bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-200",
    green: "bg-gradient-to-br from-green-500 to-green-600 shadow-green-200"
  }

  const labels = {
    red: "Critical",
    amber: "Warning", 
    green: "Good"
  }

  if (interactive) {
    return (
      <div className={cn("flex items-center space-x-2", className)} {...props}>
        {["red", "amber", "green"].map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onValueChange?.(color)}
            className={cn(
              "rounded-full shadow-lg border-2 transition-all duration-200",
              sizes[size],
              colors[color],
              value === color ? "border-white shadow-lg" : "border-gray-300 opacity-50 hover:opacity-75"
            )}
          />
        ))}
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 ml-2">
            {labels[value]}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "rounded-full shadow-lg border-2 border-white",
          sizes[size],
          colors[value]
        )}
      />
      {showLabel && (
        <span className="text-sm font-medium text-gray-700">
          {labels[value]}
        </span>
      )}
    </div>
  )
}