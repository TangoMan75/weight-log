import { openDB } from 'idb'

const DB_NAME = 'weight-tracker'
const STORE = 'entries'

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
          store.createIndex('datetime', 'datetime')
        }
      }
    })
  }
  return dbPromise
}

export async function getAllEntries() {
  const db = await getDB()
  const all = await db.getAllFromIndex(STORE, 'datetime')
  return all
}

export async function addEntry({ datetime, weight, unit }) {
  const db = await getDB()
  const id = await db.add(STORE, { datetime, weight: Number(weight), unit })
  return id
}

export async function deleteEntry(id) {
  const db = await getDB()
  await db.delete(STORE, id)
}

export async function clearAll() {
  const db = await getDB()
  await db.clear(STORE)
}
