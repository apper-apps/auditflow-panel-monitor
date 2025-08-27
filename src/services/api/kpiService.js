import kpisData from "@/services/mockData/kpis.json"

let kpis = [...kpisData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getKpis = async () => {
  await delay(300)
  return [...kpis]
}

export const getKpiById = async (id) => {
  await delay(200)
  const kpi = kpis.find(k => k.Id === parseInt(id))
  if (!kpi) throw new Error("KPI not found")
  return { ...kpi }
}

export const createKpi = async (kpiData) => {
  await delay(400)
  const maxId = Math.max(...kpis.map(k => k.Id), 0)
  const newKpi = {
    ...kpiData,
    Id: maxId + 1
  }
  kpis.push(newKpi)
  return { ...newKpi }
}

export const updateKpi = async (id, kpiData) => {
  await delay(400)
  const index = kpis.findIndex(k => k.Id === parseInt(id))
  if (index === -1) throw new Error("KPI not found")
  
  kpis[index] = { ...kpis[index], ...kpiData }
  return { ...kpis[index] }
}

export const deleteKpi = async (id) => {
  await delay(300)
  const index = kpis.findIndex(k => k.Id === parseInt(id))
  if (index === -1) throw new Error("KPI not found")
  
  kpis.splice(index, 1)
  return { success: true }
}