import { useEffect, useState } from 'react'
import ChartView from './components/ChartView'
import TableView from './components/TableView'
import AddEntryForm from './components/AddEntryForm'
import { getAllEntries, addEntry, deleteEntry, clearAll } from './db'
import { downloadCSV, csvToEntries } from './csv'

const VIEW_KEY = 'wt-view'

export default function App() {
  const [entries, setEntries] = useState([])
  const [view, setView] = useState(() => localStorage.getItem(VIEW_KEY) || 'chart')
  const [showAdd, setShowAdd] = useState(false)
  const [status, setStatus] = useState('')
  const [importFile, setImportFile] = useState(null)

  useEffect(() => {
    getAllEntries().then(setEntries)
  }, [])

  useEffect(() => {
    localStorage.setItem(VIEW_KEY, view)
  }, [view])

  useEffect(() => {
    if (!status) return
    const t = setTimeout(() => setStatus(''), 4000)
    return () => clearTimeout(t)
  }, [status])

  async function handleAdd(entry) {
    await addEntry(entry)
    setEntries(await getAllEntries())
    setShowAdd(false)
    setStatus('Entry added.')
  }

  async function handleDelete(entry) {
    if (!window.confirm(`Delete entry from ${entry.datetime} (${entry.weight} ${entry.unit})?`)) {
      return
    }
    await deleteEntry(entry.id)
    setEntries(await getAllEntries())
    setStatus('Entry deleted.')
  }

  async function handleClearAll() {
    if (!window.confirm('Delete ALL entries? This cannot be undone.')) return
    await clearAll()
    setEntries([])
    setStatus('All entries cleared.')
  }

  async function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const { entries: imported, skipped } = csvToEntries(text)
    if (imported.length === 0) {
      setStatus(`Import failed: no valid rows${skipped ? ` (${skipped} skipped).` : '.'}`)
      e.target.value = ''
      return
    }
    await clearAll()
    for (const entry of imported) await addEntry(entry)
    setEntries(await getAllEntries())
    setStatus(
      `Imported ${imported.length} entr${imported.length === 1 ? 'y' : 'ies'}` +
        (skipped ? `, ${skipped} row(s) skipped.` : '.')
    )
    e.target.value = ''
  }

  function handleExport() {
    if (entries.length === 0) {
      setStatus('Nothing to export yet.')
      return
    }
    downloadCSV(entries)
    setStatus('Exported CSV.')
  }

  return (
    <>
      <header className="app-header">
        <div>
          <hgroup>
            <h1>Weight Tracker</h1>
            <p>{entries.length} entr{entries.length === 1 ? 'y' : 'ies'} logged</p>
          </hgroup>
        </div>
        <button
          className="add-fab"
          onClick={() => setShowAdd(true)}
          aria-label="Add weight entry"
          title="Add weight entry"
        >
          +
        </button>
      </header>

      <nav className="view-toggle" aria-label="View switcher">
        <ul>
          <li>
            <a
              href="#chart"
              className={view === 'chart' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                setView('chart')
              }}
            >
              Chart
            </a>
          </li>
          <li>
            <a
              href="#table"
              className={view === 'table' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault()
                setView('table')
              }}
            >
              Table
            </a>
          </li>
        </ul>
      </nav>

      <section className="view-area">
        {view === 'chart' ? (
          <ChartView entries={entries} />
        ) : (
          <TableView entries={entries} onDelete={handleDelete} />
        )}
      </section>

      <footer className="toolbar">
        <button className="secondary outline" onClick={() => document.getElementById('import').click()}>
          Import CSV
        </button>
        <input
          id="import"
          type="file"
          accept=".csv,text/csv"
          onChange={handleImport}
          hidden
        />
        <button className="secondary outline" onClick={handleExport}>
          Export CSV
        </button>
        <button className="contrast outline" onClick={handleClearAll}>
          Clear all
        </button>
      </footer>

      {status && (
        <div className="status-toast" role="status">
          {status}
        </div>
      )}

      {showAdd && <AddEntryForm onAdd={handleAdd} onClose={() => setShowAdd(false)} />}
    </>
  )
}
