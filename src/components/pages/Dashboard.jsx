import { motion } from "framer-motion";
import KpiGrid from "@/components/organisms/KpiGrid";
import HeatMap from "@/components/organisms/HeatMap";
import ExceptionsList from "@/components/organisms/ExceptionsList";
import ApperIcon from "@/components/ApperIcon";
import React from "react";
export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold gradient-text">
          Executive Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Real-time insights into your retail audit operations
        </p>
      </div>

      {/* KPI Grid */}
      <section>
        <KpiGrid />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Heat Map - Takes up 2 columns on XL screens */}
        <div className="xl:col-span-2">
          <HeatMap />
        </div>

        {/* Recent Exceptions */}
        <div className="xl:col-span-1">
          <ExceptionsList limit={8} />
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-success/5 to-green-600/5 rounded-2xl p-6 border border-success/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-success to-green-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Performance Trend</h3>
              <p className="text-sm text-success">↑ 12% vs last month</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Overall audit scores have improved significantly with enhanced training programs and clearer guidelines.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-info/5 to-blue-600/5 rounded-2xl p-6 border border-info/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-info to-blue-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Clock" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Avg. Completion Time</h3>
              <p className="text-sm text-info">2.3 hours per audit</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Audit completion times have decreased by 25% with the new digital questionnaire system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-warning/5 to-orange-600/5 rounded-2xl p-6 border border-warning/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-warning to-orange-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Target" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">Monthly Target</h3>
              <p className="text-sm text-warning">87% achieved</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            We're on track to exceed our monthly audit targets with 5 days remaining in the cycle.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}