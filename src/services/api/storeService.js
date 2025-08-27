import storesData from "@/services/mockData/stores.json"

let stores = [...storesData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getStores = async () => {
  await delay(350)
  return [...stores]
}

export const getStoreById = async (id) => {
  await delay(200)
  const store = stores.find(s => s.Id === parseInt(id))
  if (!store) throw new Error("Store not found")
  return { ...store }
}

export const createStore = async (storeData) => {
  await delay(500)
  const maxId = Math.max(...stores.map(s => s.Id), 0)
  const newStore = {
    ...storeData,
    Id: maxId + 1
  }
  stores.push(newStore)
  return { ...newStore }
}

export const updateStore = async (id, storeData) => {
  await delay(400)
  const index = stores.findIndex(s => s.Id === parseInt(id))
  if (index === -1) throw new Error("Store not found")
  
  stores[index] = { ...stores[index], ...storeData }
  return { ...stores[index] }
}

export const deleteStore = async (id) => {
  await delay(300)
  const index = stores.findIndex(s => s.Id === parseInt(id))
  if (index === -1) throw new Error("Store not found")
  
  stores.splice(index, 1)
  return { success: true }
}