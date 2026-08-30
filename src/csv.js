// CSV import/export. Column order: datetime,weight,unit
const HEADERS = ['datetime', 'weight', 'unit']

export function entriesToCSV(entries) {
  const rows = [HEADERS.join(',')]
  for (const e of entries) {
    rows.push([e.datetime, e.weight, e.unit].map(csvEscape).join(','))
  }
  return rows.join('\n')
}

export function downloadCSV(entries) {
  const csv = entriesToCSV(entries)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const stamp = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `weight-${stamp}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Parse CSV text into entries. Returns { entries, skipped }.
export function csvToEntries(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  const entries = []
  let skipped = 0

  if (lines.length === 0) return { entries, skipped }

  // Detect header row
  const first = lines[0].split(',').map((s) => s.trim().toLowerCase())
  const hasHeader = first.join(',') === HEADERS.join(',')
  const start = hasHeader ? 1 : 0

  for (let i = start; i < lines.length; i++) {
    const cols = lines[i].split(',').map((s) => s.trim())
    const [datetime, weight, unit] = cols
    const w = Number(weight)
    if (!datetime || !Number.isFinite(w)) {
      skipped++
      continue
    }
    entries.push({
      datetime,
      weight: w,
      unit: unit || 'kg'
    })
  }
  return { entries, skipped }
}

function csvEscape(value) {
  const s = String(value ?? '')
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}
