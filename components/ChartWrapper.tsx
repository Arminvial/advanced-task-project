'use client'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

type ChartDataItem = {
  name: string
  value: number
  color: string
}

type ChartWrapperProps = {
  data: ChartDataItem[]
}



export default function ChartWrapper({ data }: ChartWrapperProps) {
    
  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
        {data.map((entry: ChartDataItem, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}
