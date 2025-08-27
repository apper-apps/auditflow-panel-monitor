import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"

export default function Header({ onMobileMenuToggle }) {
  const [currentRole, setCurrentRole] = useState("CEO")
  
  const roles = [
    { value: "CEO", label: "CEO" },
    { value: "Manager", label: "Manager" },
    { value: "Auditor", label: "Auditor" },
    { value: "IT", label: "IT Admin" }
  ]

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-surface via-surface to-gray-50 border-b border-gray-200 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" className="w-5 h-5" />
          </Button>
          
          <div className="hidden sm:block">
            <h1 className="text-xl font-display font-bold gradient-text">
              AuditFlow Pro
            </h1>
            <p className="text-sm text-gray-600">Retail Audit Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">View as:</span>
            <Select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="w-32"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              <ApperIcon name="Bell" className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-error to-red-600 rounded-full border-2 border-white"></span>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900">John Smith</p>
                <p className="text-xs text-gray-500">{currentRole}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}