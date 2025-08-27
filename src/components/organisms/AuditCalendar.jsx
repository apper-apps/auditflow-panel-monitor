import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths } from "date-fns"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getAudits } from "@/services/api/auditService"

export default function AuditCalendar() {
  const [audits, setAudits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

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

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadAudits} />

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getAuditsForDate = (date) => {
    return audits.filter(audit => 
      isSameDay(new Date(audit.scheduledDate), date)
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

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  return (
    <div className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">
                Audit Schedule
              </h3>
              <p className="text-sm text-gray-600">
                {format(currentDate, "MMMM yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={previousMonth}
            >
              <ApperIcon name="ChevronLeft" className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextMonth}
            >
              <ApperIcon name="ChevronRight" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const dayAudits = getAuditsForDate(day)
            const isSelected = isSameDay(day, selectedDate)
            const isCurrentDay = isToday(day)
            const isCurrentMonth = isSameMonth(day, currentDate)

            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDate(day)}
                className={`
                  relative p-2 min-h-[80px] border border-gray-200 rounded-lg cursor-pointer transition-all
                  ${isCurrentMonth ? "bg-white hover:bg-gray-50" : "bg-gray-50 opacity-50"}
                  ${isSelected ? "ring-2 ring-primary bg-primary/5" : ""}
                  ${isCurrentDay ? "border-primary" : ""}
                `}
              >
                <div className={`
                  text-sm font-semibold mb-1
                  ${isCurrentDay ? "text-primary" : isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                `}>
                  {format(day, "d")}
                </div>

                <div className="space-y-1">
                  {dayAudits.slice(0, 2).map(audit => (
                    <div
                      key={audit.Id}
                      className="text-xs p-1 rounded bg-gradient-to-r from-primary/10 to-secondary/10 text-primary truncate"
                    >
                      {audit.storeId}
                    </div>
                  ))}
                  {dayAudits.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayAudits.length - 2} more
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Selected Date Details */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-3">
            {format(selectedDate, "EEEE, MMMM do, yyyy")}
          </h4>
          
          {getAuditsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getAuditsForDate(selectedDate).map(audit => (
                <div key={audit.Id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Building" className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">Store {audit.storeId}</p>
                      <p className="text-sm text-gray-600">Auditor: {audit.auditorId}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(audit.status)}>
                    {audit.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No audits scheduled for this date.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}