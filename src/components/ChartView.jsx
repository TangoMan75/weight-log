import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function ChartView({ entries }) {
  const sorted = [...entries].sort((a, b) => a.datetime.localeCompare(b.datetime))
  const labels = sorted.map((e) => e.datetime.slice(0, 10))
  const data = sorted.map((e) => e.weight)
  const unit = sorted.length ? sorted[0].unit : 'kg'

  const chartData = {
    labels,
    datasets: [
      {
        label: `Weight (${unit})`,
        data,
        borderColor: '#1abc9c',
        backgroundColor: 'rgba(26, 188, 156, 0.15)',
        tension: 0.25,
        pointRadius: 3,
        fill: true
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: `Weight (${unit})` }, beginAtZero: false }
    },
    plugins: { legend: { display: false } }
  }

  if (entries.length === 0) {
    return <p>No entries yet. Tap the + button to add your first weight.</p>
  }

  return (
    <div style={{ position: 'relative', height: '60vh', minHeight: 320 }}>
      <Line data={chartData} options={options} />
    </div>
  )
}
