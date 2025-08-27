import { motion } from "framer-motion"

export default function Loading({ variant = "default" }) {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg animate-pulse" />
              <div className="w-16 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="w-3/4 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === "table") {
    return (
      <div className="bg-surface rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center space-x-4"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                  <div className="w-1/2 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
                </div>
                <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-12">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
        />
        <motion.div
          className="w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
        />
        <span className="ml-4 text-gray-600 font-medium">Loading...</span>
      </motion.div>
    </div>
  )
}