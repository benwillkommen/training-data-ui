import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { repPrs } from './repPrs.js'

import { Line, Bar } from 'react-chartjs-2';

const fakeData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      spanGaps: true,
      data: [65, null, null, 81, 56, 55, 40]
    }
  ]
};

const options = {
  scales: {
    xAxes: [{
      type: 'linear'
      // ticks: {
      //   suggestedMin: 0,
      //   suggestedMax: 200
      // }
    }]
  }
}

const minWeek = Math.min(...repPrs["back squats"]["1"].map(set => set.week))
const maxWeek = Math.max(...repPrs["back squats"]["1"].map(set => set.week))
const weekLabels = [];

for (let i = minWeek; i <= maxWeek; i++) {
  weekLabels.push(i);
}

// const datapoints = 

const data = {
  //labels: weekLabels,
  datasets: [{
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    spanGaps: true,
    data: repPrs["back squats"]["1"].map(set => {
      return {
        x: set.week + (set.day / 10),
        y: set.weight
      }
    })
  }]
}

console.log(data)

// const labels = repPrs["back squat"]["1"].map(set => set)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Line data={data} options={options}/>
        <Line data={fakeData}  />
        <Bar data={fakeData} />

      </div>
    );
  }
}

export default App;
