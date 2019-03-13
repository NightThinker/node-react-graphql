import React from 'react'
import { Bar as BarChart } from 'react-chartjs-2'
import styled from 'styled-components'

const Content = styled.div`
  text-align: center;
`

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100
  },
  Normal: {
    min: 100,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 100000000
  }
}

const bookingChart = props => {
  const chartData = {labels: [], datasets: []};
  let values = []
  for(const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if(current.event.price > BOOKINGS_BUCKETS[bucket].min && current.event.price < BOOKINGS_BUCKETS[bucket].max) {
        return prev+1
      } else {
        return prev;
      }
    }, 0)
    values.push(filteredBookingsCount)
    chartData.labels.push(bucket)
    chartData.datasets.push({
      // label: "My First dataset",
      fillColor: "rgba(220,220,220,0.5)",
      strokeColor: "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data: values
    })
    values = [...values]
    values[values.length - 1] = 0
  }
  const chartData2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  }
  // console.log(output)
  return (
    <Content>
      <BarChart data={chartData}/>
    </Content>
  )
}

export default  bookingChart