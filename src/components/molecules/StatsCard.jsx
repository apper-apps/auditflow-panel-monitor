import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon,
  className,
  ...props 
}) {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-success"
    if (changeType === "negative") return "text-error"
    return "text-gray-500"
  }

  const getChangeIcon = () => {
    if (changeType === "positive") return "ArrowUpRight"
    if (changeType === "negative") return "ArrowDownRight"
    return "Minus"
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-gradient-to-br from-surface via-surface to-gray-50 rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-display text-gray-900">{value}</span>
            {change && (
              <div className={cn("flex items-center space-x-1", getChangeColor())}>
                <ApperIcon name={getChangeIcon()} className="w-3 h-3" />
                <span className="text-xs font-semibold">{change}</span>
              </div>
            )}
          </div>
        </div>
        {icon && (
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
    </motion.div>
  )
}