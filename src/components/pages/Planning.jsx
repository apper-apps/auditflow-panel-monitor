import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import AuditCalendar from "@/components/organisms/AuditCalendar"

export default function Planning() {
  const [showNewAuditForm, setShowNewAuditForm] = useState(false)

  const handleScheduleAudit = () => {
    setShowNewAuditForm(true)
    toast.info("Schedule new audit feature coming soon!")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">
            Audit Planning
          </h1>
          <p className="text-gray-600 text-lg">
            Schedule and manage audit assignments
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export Schedule
          </Button>
          <Button onClick={handleScheduleAudit}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Schedule Audit
          </Button>
        </div>
      </div>

      {/* Planning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold font-display gradient-text">42</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-info/10 to-blue-600/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="Clock" className="w-6 h-6 text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold font-display text-info">18</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-warning/10 to-orange-600/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="AlertCircle" className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold font-display text-warning">3</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-success/10 to-green-600/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="Users" className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Auditors</p>
              <p className="text-2xl font-bold font-display text-success">12</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Calendar View */}
      <AuditCalendar />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ApperIcon name="Plus" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-gray-900">Quick Schedule</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Rapidly schedule audits based on priority and availability.
          </p>
          <div className="flex items-center text-primary text-sm font-semibold group-hover:text-secondary transition-colors">
            <span>Schedule Now</span>
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-accent/5 to-warning/5 rounded-2xl p-6 border border-accent/20 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ApperIcon name="Repeat" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-gray-900">Recurring Audits</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Set up automated recurring audits for regular compliance checks.
          </p>
          <div className="flex items-center text-accent text-sm font-semibold group-hover:text-warning transition-colors">
            <span>Configure</span>
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-info/5 to-blue-600/5 rounded-2xl p-6 border border-info/20 hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-info to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <ApperIcon name="BarChart3" className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-gray-900">Workload Analysis</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Analyze auditor workloads and optimize assignment distribution.
          </p>
          <div className="flex items-center text-info text-sm font-semibold group-hover:text-blue-600 transition-colors">
            <span>View Analysis</span>
            <ApperIcon name="ArrowRight" className="w-4 h-4 ml-1" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}