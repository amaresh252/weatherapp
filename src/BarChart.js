import React from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

export const BarChart = ({weatherdata}) => {
  return (
    <Bar data={weatherdata} />
  )
}
