import { Task } from '@/types/task'

interface Props {
  task: Task
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <span className="text-xs text-white bg-blue-500 rounded px-2 py-1 inline-block mt-2">
        {task.status}
      </span>
    </div>
  )
}
