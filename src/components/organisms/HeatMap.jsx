import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getStores } from "@/services/api/storeService"

export default function HeatMap() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState("all")

  const loadStores = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await getStores()
      setStores(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStores()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadStores} />

  const regions = [...new Set(stores.map(store => store.region))]
  const filteredStores = selectedRegion === "all" ? stores : stores.filter(store => store.region === selectedRegion)

  const getPerformanceColor = (score) => {
    if (score >= 90) return "from-green-500 to-green-600"
    if (score >= 70) return "from-amber-500 to-amber-600"
    return "from-red-500 to-red-600"
  }

  const getPerformanceIcon = (score) => {
    if (score >= 90) return "CheckCircle"
    if (score >= 70) return "AlertCircle"
    return "XCircle"
  }

  return (
    <div className="bg-gradient-to-br from-surface to-gray-50 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <ApperIcon name="Map" className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-gray-900">Store Performance Map</h3>
              <p className="text-sm text-gray-600">Regional performance overview</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            <span className="text-gray-600">Excellent (90+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
            <span className="text-gray-600">Good (70-89)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            <span className="text-gray-600">Needs Attention (&lt;70)</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredStores.map((store, index) => (
            <motion.div
              key={store.Id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${getPerformanceColor(store.performanceScore)} rounded-xl p-4 text-white shadow-lg cursor-pointer transition-shadow hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <ApperIcon name={getPerformanceIcon(store.performanceScore)} className="w-5 h-5" />
                  <span className="text-xs font-semibold opacity-90">{store.region}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm truncate">{store.name}</h4>
                  <p className="text-xs opacity-90">Score: {store.performanceScore}%</p>
                </div>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                <div className="font-medium">{store.name}</div>
                <div>Performance: {store.performanceScore}%</div>
                <div>Region: {store.region}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="MapPin" className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No stores found in the selected region.</p>
          </div>
        )}
      </div>
    </div>
  )
}