import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { getExceptions } from "@/services/api/exceptionService"

export default function ExceptionsList({ limit }) {
  const [exceptions, setExceptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")

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

  const filteredExceptions = exceptions
    .filter(exception => {
      const matchesSearch = exception.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exception.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSeverity = severityFilter === "all" || exception.severity === severityFilter
      return matchesSearch && matchesSeverity
    })
    .slice(0, limit)

  if (exceptions.length === 0) {
    return (
      <Empty 
        title="No Exceptions Found"
        description="All audits are compliant. Great work!"
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

  return (
    <div className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-error/10 to-red-600/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 text-error" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">
                Recent Exceptions
              </h3>
              <p className="text-sm text-gray-600">
                Issues requiring attention
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <SearchBar
              placeholder="Search exceptions..."
              onSearch={setSearchTerm}
              className="w-full sm:w-64"
            />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredExceptions.map((exception, index) => (
          <motion.div
            key={exception.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${
                getSeverityColor(exception.severity) === "red" ? "from-red-500 to-red-600" :
                getSeverityColor(exception.severity) === "error" ? "from-error to-red-600" :
                getSeverityColor(exception.severity) === "amber" ? "from-amber-500 to-amber-600" :
                "from-green-500 to-green-600"
              } rounded-xl flex items-center justify-center shadow-lg`}>
                <ApperIcon name={getSeverityIcon(exception.severity)} className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {exception.description}
                      </h4>
                      <Badge variant={getSeverityColor(exception.severity)}>
                        {exception.severity}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="Tag" className="w-4 h-4" />
                        <span>{exception.category}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="Calendar" className="w-4 h-4" />
                        <span>{format(new Date(exception.raisedDate), "MMM dd, yyyy")}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ApperIcon name="FileText" className="w-4 h-4" />
                        <span>Audit #{exception.auditId}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline">
                      <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ApperIcon name="MoreHorizontal" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredExceptions.length === 0 && searchTerm && (
        <div className="p-8 text-center text-gray-500">
          <ApperIcon name="Search" className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No exceptions match your search criteria.</p>
        </div>
      )}
    </div>
  )
}