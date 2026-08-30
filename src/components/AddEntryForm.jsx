import { useEffect, useRef, useState } from 'react'

function nowLocalInputValue() {
  const d = new Date()
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

export default function AddEntryForm({ onAdd, onClose }) {
  const [datetime, setDatetime] = useState(nowLocalInputValue())
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('kg')
  const weightRef = useRef(null)

  useEffect(() => {
    if (weightRef.current) {
      weightRef.current.focus()
      weightRef.current.select()
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const w = Number(weight)
    if (!Number.isFinite(w) || weight.trim() === '') return
    onAdd({ datetime, weight: w, unit })
  }

  return (
    <dialog open className="add-dialog">
      <article>
        <header>
          <button
            aria-label="Close"
            className="close outline"
            onClick={onClose}
          ></button>
          <strong>Add weight entry</strong>
        </header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="dt">
            Date / time
            <input
              id="dt"
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </label>
          <label htmlFor="wt">
            Weight
            <input
              id="wt"
              ref={weightRef}
              type="number"
              step="0.1"
              inputMode="decimal"
              placeholder="e.g. 72.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
          <label htmlFor="unit">
            Unit
            <select id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </label>
          <footer>
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </footer>
        </form>
      </article>
    </dialog>
  )
}
