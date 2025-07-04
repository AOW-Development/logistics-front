"use client"

import { useRef } from "react"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface OrderStatusChartProps {
  data: Array<{
    name: string
    value: number
  }>
}

const COLORS = ["#4ade80", "#818cf8", "#facc15"]

export default function OrderStatusChart({ data }: OrderStatusChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value} orders`, "Count"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

