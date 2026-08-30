export default function TableView({ entries, onDelete }) {
  const sorted = [...entries].sort((a, b) => b.datetime.localeCompare(a.datetime))

  if (sorted.length === 0) {
    return <p>No entries yet. Tap the + button to add your first weight.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Date / Time</th>
          <th scope="col">Weight</th>
          <th scope="col">Unit</th>
          <th scope="col" aria-label="actions"></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((e) => (
          <tr key={e.id}>
            <td>{e.datetime}</td>
            <td>{e.weight}</td>
            <td>{e.unit}</td>
            <td>
              <button
                className="secondary outline"
                data-testid={`delete-${e.id}`}
                onClick={() => onDelete(e)}
                aria-label={`Delete entry from ${e.datetime}`}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
