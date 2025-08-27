import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import KpiCard from "@/components/molecules/KpiCard"
import StatsCard from "@/components/molecules/StatsCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { getKpis } from "@/services/api/kpiService"

export default function KpiGrid() {
  const [kpis, setKpis] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadKpis = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await getKpis()
      setKpis(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadKpis()
  }, [])

  if (loading) return <Loading variant="cards" />
  if (error) return <Error message={error} onRetry={loadKpis} />

  const primaryKpis = kpis.filter(kpi => kpi.isPrimary)
  const secondaryKpis = kpis.filter(kpi => !kpi.isPrimary)

  return (
    <div className="space-y-8">
      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {primaryKpis.map((kpi, index) => (
          <motion.div
            key={kpi.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KpiCard
              title={kpi.name}
              value={kpi.value}
              target={kpi.target}
              trend={kpi.trend}
              icon={kpi.icon}
            />
          </motion.div>
        ))}
      </div>

      {/* Secondary Stats */}
      {secondaryKpis.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {secondaryKpis.map((kpi, index) => (
            <motion.div
              key={kpi.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (primaryKpis.length * 0.1) + (index * 0.05) }}
            >
              <StatsCard
                title={kpi.name}
                value={kpi.value}
                change={kpi.changePercent}
                changeType={kpi.trend === "up" ? "positive" : kpi.trend === "down" ? "negative" : "neutral"}
                icon={kpi.icon}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}