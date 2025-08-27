import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Chart from "react-apexcharts"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getKpis } from "@/services/api/kpiService"
import { getStores } from "@/services/api/storeService"
import { getExceptions } from "@/services/api/exceptionService"

export default function Reports() {
  const [kpis, setKpis] = useState([])
  const [stores, setStores] = useState([])
  const [exceptions, setExceptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dateRange, setDateRange] = useState("30d")
  const [reportType, setReportType] = useState("overview")

  const loadData = async () => {
    try {
      setError(null)
      setLoading(true)
      const [kpiData, storeData, exceptionData] = await Promise.all([
        getKpis(),
        getStores(),
        getExceptions()
      ])
      setKpis(kpiData)
      setStores(storeData)
      setExceptions(exceptionData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  // Prepare chart data
  const performanceChartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      background: "transparent"
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#1B4F72", "#E67E22"]
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: { colors: "#6B7280" }
      }
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280" }
      }
    },
    colors: ["#1B4F72", "#E67E22"],
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4
    },
    legend: {
      position: "top",
      horizontalAlign: "center"
    }
  }

  const performanceChartSeries = [
    {
      name: "Completion Rate",
      data: [85, 87, 89, 92, 88, 94]
    },
    {
      name: "Compliance Score",
      data: [78, 82, 85, 88, 86, 91]
    }
  ]

  const regionChartOptions = {
    chart: {
      type: "donut",
      height: 350
    },
    colors: ["#1B4F72", "#2874A6", "#E67E22", "#F39C12", "#27AE60"],
    legend: {
      position: "bottom"
    },
    labels: [...new Set(stores.map(store => store.region))]
  }

  const regionChartSeries = [...new Set(stores.map(store => store.region))].map(region =>
    stores.filter(store => store.region === region).length
  )

  const exceptionsTrendOptions = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "60%"
      }
    },
    colors: ["#E74C3C", "#F39C12", "#27AE60"],
    xaxis: {
      categories: ["Critical", "High", "Medium", "Low"]
    },
    legend: {
      show: false
    }
  }

  const exceptionsTrendSeries = [{
    name: "Exceptions",
    data: [
      exceptions.filter(e => e.severity === "Critical").length,
      exceptions.filter(e => e.severity === "High").length,
      exceptions.filter(e => e.severity === "Medium").length,
      exceptions.filter(e => e.severity === "Low").length
    ]
  }]

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
            Reports & Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive insights and data visualization
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </Select>
          
          <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="overview">Overview</option>
            <option value="performance">Performance</option>
            <option value="compliance">Compliance</option>
            <option value="exceptions">Exceptions</option>
          </Select>
          
          <Button>
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Target" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Completion Rate</h3>
              <p className="text-2xl font-bold gradient-text">94.2%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">↑ 8.5% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-success/5 to-green-600/5 rounded-2xl p-6 border border-success/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-green-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Compliance Score</h3>
              <p className="text-2xl font-bold text-success">91.7%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">↑ 12.3% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-warning/5 to-orange-600/5 rounded-2xl p-6 border border-warning/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-orange-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Clock" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Avg. Time</h3>
              <p className="text-2xl font-bold text-warning">2.3h</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">↓ 25% faster completion</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-error/5 to-red-600/5 rounded-2xl p-6 border border-error/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-error to-red-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Open Issues</h3>
              <p className="text-2xl font-bold text-error">{exceptions.filter(e => e.status === "Open").length}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">↓ 35% reduction this month</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="TrendingUp" className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-gray-900">Performance Trends</h3>
                <p className="text-sm text-gray-600">Monthly audit performance metrics</p>
              </div>
            </div>
          </div>
          <Chart
            options={performanceChartOptions}
            series={performanceChartSeries}
            type="line"
            height={300}
          />
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-warning/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="PieChart" className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-gray-900">Store Distribution</h3>
                <p className="text-sm text-gray-600">Stores by region</p>
              </div>
            </div>
          </div>
          <Chart
            options={regionChartOptions}
            series={regionChartSeries}
            type="donut"
            height={300}
          />
        </motion.div>

        {/* Exception Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-error/10 to-red-600/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="BarChart3" className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-gray-900">Exception Analysis</h3>
                <p className="text-sm text-gray-600">Issues by severity level</p>
              </div>
            </div>
          </div>
          <Chart
            options={exceptionsTrendOptions}
            series={exceptionsTrendSeries}
            type="bar"
            height={300}
          />
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-success/10 to-green-600/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="Award" className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-gray-900">Top Performing Stores</h3>
                <p className="text-sm text-gray-600">Highest compliance scores</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {stores.sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5).map((store, index) => (
              <div key={store.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-500" :
                    index === 1 ? "bg-gradient-to-r from-gray-400 to-gray-500" :
                    index === 2 ? "bg-gradient-to-r from-amber-600 to-amber-700" :
                    "bg-gradient-to-r from-gray-300 to-gray-400"
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{store.name}</p>
                    <p className="text-sm text-gray-600">{store.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">{store.performanceScore}%</p>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Report Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-info/5 to-blue-600/5 rounded-2xl p-6 border border-info/20"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-info to-blue-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="FileText" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Export Reports</h3>
              <p className="text-sm text-gray-600">Download detailed reports in various formats</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <ApperIcon name="FileSpreadsheet" className="w-4 h-4 mr-2" />
              Excel
            </Button>
            <Button variant="outline">
              <ApperIcon name="File" className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button>
              <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
              Email Report
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}