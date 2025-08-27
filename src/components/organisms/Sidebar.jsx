import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: "BarChart3",
      description: "Overview & KPIs"
    },
    { 
      name: "Planning", 
      path: "/planning", 
      icon: "Calendar",
      description: "Schedule Audits"
    },
    { 
      name: "Active Audits", 
      path: "/audits", 
      icon: "ClipboardList",
      description: "Ongoing Audits"
    },
    { 
      name: "Exceptions", 
      path: "/exceptions", 
      icon: "AlertTriangle",
      description: "Issues & Alerts"
    },
    { 
      name: "Reports", 
      path: "/reports", 
      icon: "FileText",
      description: "Analytics & Reports"
    }
  ]

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 z-50">
      <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-surface via-surface to-gray-50 border-r border-gray-200 shadow-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center h-16 flex-shrink-0 px-6 bg-gradient-to-r from-primary to-secondary"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="ShieldCheck" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-white">AuditFlow Pro</h1>
              <p className="text-xs text-white/70">Retail Audit Management</p>
            </div>
          </div>
        </motion.div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon 
                      name={item.icon} 
                      className={cn(
                        "mr-4 h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                      )} 
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className={cn(
                        "text-xs opacity-75",
                        isActive ? "text-white/70" : "text-gray-500"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="flex-shrink-0 p-4">
          <div className="bg-gradient-to-br from-accent/10 to-warning/10 rounded-xl p-4 border border-accent/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Need Help?</p>
                <p className="text-xs text-gray-600">Contact support team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile Sidebar
  const MobileSidebar = () => (
    <div className="lg:hidden">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        />
      )}
      
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-surface via-surface to-gray-50 shadow-2xl border-r border-gray-200"
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-primary to-secondary">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <ApperIcon name="ShieldCheck" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-white">AuditFlow Pro</h1>
              <p className="text-xs text-white/70">Retail Audit Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 hover:text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <ApperIcon 
                      name={item.icon} 
                      className={cn(
                        "mr-4 h-5 w-5 transition-colors",
                        isActive ? "text-white" : "text-gray-500 group-hover:text-primary"
                      )} 
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className={cn(
                        "text-xs opacity-75",
                        isActive ? "text-white/70" : "text-gray-500"
                      )}>
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </div>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}