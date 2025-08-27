import auditsData from "@/services/mockData/audits.json"

let audits = [...auditsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getAudits = async () => {
  await delay(400)
  return [...audits]
}

export const getAuditById = async (id) => {
  await delay(200)
  const audit = audits.find(a => a.Id === id)
  if (!audit) throw new Error("Audit not found")
  return { ...audit }
}

export const createAudit = async (auditData) => {
  await delay(600)
  const maxId = Math.max(...audits.map(a => parseInt(a.Id.replace('AUD', ''))), 0)
  const newAudit = {
    ...auditData,
    Id: `AUD${String(maxId + 1).padStart(3, '0')}`
  }
  audits.push(newAudit)
  return { ...newAudit }
}

export const updateAudit = async (id, auditData) => {
  await delay(500)
  const index = audits.findIndex(a => a.Id === id)
  if (index === -1) throw new Error("Audit not found")
  
  audits[index] = { ...audits[index], ...auditData }
  return { ...audits[index] }
}

export const deleteAudit = async (id) => {
  await delay(300)
  const index = audits.findIndex(a => a.Id === id)
  if (index === -1) throw new Error("Audit not found")
  
  audits.splice(index, 1)
  return { success: true }
}