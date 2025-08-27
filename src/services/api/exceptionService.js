import exceptionsData from "@/services/mockData/exceptions.json"

let exceptions = [...exceptionsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getExceptions = async () => {
  await delay(450)
  return [...exceptions]
}

export const getExceptionById = async (id) => {
  await delay(200)
  const exception = exceptions.find(e => e.Id === parseInt(id))
  if (!exception) throw new Error("Exception not found")
  return { ...exception }
}

export const createException = async (exceptionData) => {
  await delay(500)
  const maxId = Math.max(...exceptions.map(e => e.Id), 0)
  const newException = {
    ...exceptionData,
    Id: maxId + 1
  }
  exceptions.push(newException)
  return { ...newException }
}

export const updateException = async (id, exceptionData) => {
  await delay(400)
  const index = exceptions.findIndex(e => e.Id === parseInt(id))
  if (index === -1) throw new Error("Exception not found")
  
  exceptions[index] = { ...exceptions[index], ...exceptionData }
  return { ...exceptions[index] }
}

export const deleteException = async (id) => {
  await delay(300)
  const index = exceptions.findIndex(e => e.Id === parseInt(id))
  if (index === -1) throw new Error("Exception not found")
  
  exceptions.splice(index, 1)
  return { success: true }
}