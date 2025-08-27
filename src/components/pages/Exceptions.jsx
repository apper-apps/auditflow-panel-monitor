import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Select from "@/components/atoms/Select"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { getExceptions, updateException } from "@/services/api/exceptionService"

export default function Exceptions() {
  const [exceptions, setExceptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const loadExceptions = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await getExceptions()
      setExceptions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExceptions()
  }, [])

  if (loading) return <Loading variant="table" />
  if (error) return <Error message={error} onRetry={loadExceptions} />

  const filteredExceptions = exceptions.filter(exception => {
    const matchesSearch = exception.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exception.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exception.auditId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || exception.severity === severityFilter
    const matchesStatus = statusFilter === "all" || exception.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const handleStatusChange = async (exceptionId, newStatus) => {
    try {
      await updateException(exceptionId, { status: newStatus })
      setExceptions(prev => prev.map(ex => 
        ex.Id === exceptionId ? { ...ex, status: newStatus } : ex
      ))
      toast.success(`Exception status updated to ${newStatus}`)
    } catch (err) {
      toast.error("Failed to update exception status")
    }
  }

  if (exceptions.length === 0) {
    return (
      <Empty 
        title="No Exceptions Found"
        description="All audits are compliant. Excellent work!"
        icon="CheckCircle"
      />
    )
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "red"
      case "High": return "error"
      case "Medium": return "amber"
      case "Low": return "green"
      default: return "default"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "Critical": return "AlertTriangle"
      case "High": return "AlertCircle"
      case "Medium": return "Info"
      case "Low": return "CheckCircle"
      default: return "Circle"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "error"
      case "In Progress": return "warning"
      case "Resolved": return "success"
      case "Closed": return "default"
      default: return "default"
    }
  }

  const severityStats = {
    Critical: exceptions.filter(e => e.severity === "Critical").length,
    High: exceptions.filter(e => e.severity === "High").length,
    Medium: exceptions.filter(e => e.severity === "Medium").length,
    Low: exceptions.filter(e => e.severity === "Low").length
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
            Exception Management
          </h1>
          <p className="text-gray-600 text-lg">
            Track and resolve audit exceptions and issues
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Create Exception
          </Button>
        </div>
      </div>

      {/* Exception Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 shadow-lg border border-red-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">Critical</p>
              <p className="text-xl font-bold font-display text-red-800">{severityStats.Critical}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 shadow-lg border border-orange-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-error to-red-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="AlertCircle" className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-700">High</p>
              <p className="text-xl font-bold font-display text-orange-800">{severityStats.High}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 shadow-lg border border-amber-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Info" className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-700">Medium</p>
              <p className="text-xl font-bold font-display text-amber-800">{severityStats.Medium}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 shadow-lg border border-green-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Low</p>
              <p className="text-xl font-bold font-display text-green-800">{severityStats.Low}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <SearchBar
          placeholder="Search exceptions..."
          onSearch={setSearchTerm}
          className="w-full lg:w-96"
        />
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="min-w-32"
          >
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-w-32"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </Select>
        </div>
      </div>

      {/* Exceptions List */}
      <div className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Exception
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Audit
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date Raised
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExceptions.map((exception, index) => (
                <motion.tr
                  key={exception.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${
                        getSeverityColor(exception.severity) === "red" ? "from-red-500 to-red-600" :
                        getSeverityColor(exception.severity) === "error" ? "from-error to-red-600" :
                        getSeverityColor(exception.severity) === "amber" ? "from-amber-500 to-amber-600" :
                        "from-green-500 to-green-600"
                      } rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <ApperIcon name={getSeverityIcon(exception.severity)} className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {exception.description}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Exception #{exception.Id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getSeverityColor(exception.severity)}>
                      {exception.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Tag" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{exception.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="FileText" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-primary">
                        {exception.auditId}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(exception.raisedDate), "MMM dd, yyyy")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(exception.raisedDate), "h:mm a")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusColor(exception.status)}>
                      {exception.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Select
                        value={exception.status}
                        onChange={(e) => handleStatusChange(exception.Id, e.target.value)}
                        className="text-sm w-28"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </Select>
                      <Button size="sm" variant="ghost">
                        <ApperIcon name="Eye" className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExceptions.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <ApperIcon name="Search" className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No exceptions match your search criteria.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}