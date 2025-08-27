import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import SearchBar from "@/components/molecules/SearchBar"
import RagIndicator from "@/components/molecules/RagIndicator"
import AuditForm from "@/components/organisms/AuditForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { getAudits } from "@/services/api/auditService"

export default function Audits() {
  const [audits, setAudits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAuditForm, setShowAuditForm] = useState(false)

  const loadAudits = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await getAudits()
      setAudits(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAudits()
  }, [])

  if (loading) return <Loading variant="table" />
  if (error) return <Error message={error} onRetry={loadAudits} />

  const filteredAudits = audits.filter(audit => {
    const matchesSearch = audit.storeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.auditorId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || audit.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (showAuditForm) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AuditForm
          onSubmit={() => {
            setShowAuditForm(false)
            loadAudits()
          }}
          onCancel={() => setShowAuditForm(false)}
        />
      </motion.div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "success"
      case "In Progress": return "warning"
      case "Scheduled": return "primary"
      case "Overdue": return "error"
      default: return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed": return "CheckCircle"
      case "In Progress": return "Clock"
      case "Scheduled": return "Calendar"
      case "Overdue": return "AlertTriangle"
      default: return "Circle"
    }
  }

  if (audits.length === 0) {
    return (
      <Empty 
        title="No Audits Found"
        description="Get started by scheduling your first audit."
        action={() => setShowAuditForm(true)}
        actionLabel="Start New Audit"
        icon="ClipboardList"
      />
    )
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
            Active Audits
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor and manage ongoing audit activities
          </p>
        </div>
        
        <Button onClick={() => setShowAuditForm(true)}>
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          New Audit
        </Button>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-surface to-gray-50 rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-2">
            <ApperIcon name="FileText" className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-xl font-bold font-display gradient-text">{audits.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-surface to-gray-50 rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Clock" className="w-5 h-5 text-warning" />
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl font-bold font-display text-warning">
                {audits.filter(a => a.status === "In Progress").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-surface to-gray-50 rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-2">
            <ApperIcon name="CheckCircle" className="w-5 h-5 text-success" />
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-xl font-bold font-display text-success">
                {audits.filter(a => a.status === "Completed").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-surface to-gray-50 rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-2">
            <ApperIcon name="AlertTriangle" className="w-5 h-5 text-error" />
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-xl font-bold font-display text-error">
                {audits.filter(a => a.status === "Overdue").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <SearchBar
          placeholder="Search by store or auditor..."
          onSearch={setSearchTerm}
          className="w-full sm:w-96"
        />
        
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Audits List */}
      <div className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Auditor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAudits.map((audit, index) => (
                <motion.tr
                  key={audit.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Building" className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{audit.storeId}</p>
                        <p className="text-sm text-gray-600">Store Location</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-warning/20 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-medium text-gray-900">{audit.auditorId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {format(new Date(audit.scheduledDate), "MMM dd, yyyy")}
                      </p>
                      <p className="text-gray-600">
                        {format(new Date(audit.scheduledDate), "h:mm a")}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusColor(audit.status)}>
                      <ApperIcon name={getStatusIcon(audit.status)} className="w-3 h-3 mr-1" />
                      {audit.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {audit.overallRating ? (
                      <RagIndicator value={audit.overallRating} showLabel />
                    ) : (
                      <span className="text-gray-400 text-sm">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAudits.length === 0 && searchTerm && (
          <div className="p-12 text-center text-gray-500">
            <ApperIcon name="Search" className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No audits match your search criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}