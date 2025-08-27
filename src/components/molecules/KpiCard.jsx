import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

export default function KpiCard({ 
  title, 
  value, 
  target, 
  trend, 
  icon, 
  className,
  ...props 
}) {
  const getTrendIcon = () => {
    if (trend === "up") return "TrendingUp"
    if (trend === "down") return "TrendingDown"
    return "Minus"
  }

  const getTrendColor = () => {
    if (trend === "up") return "text-success"
    if (trend === "down") return "text-error"
    return "text-gray-400"
  }

  const getProgressPercentage = () => {
    if (!target || !value) return 0
    return Math.min((value / target) * 100, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-gradient-to-br from-surface to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            <ApperIcon name={icon} className="w-6 h-6 text-primary" />
          </div>
        )}
        <div className={cn("flex items-center space-x-1", getTrendColor())}>
          <ApperIcon name={getTrendIcon()} className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {trend === "up" ? "+" : trend === "down" ? "-" : ""}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold font-display gradient-text">{value}</span>
          {target && (
            <span className="text-sm text-gray-500">/ {target}</span>
          )}
        </div>
      </div>

      {target && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}