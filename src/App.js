import React, { Component } from 'react';
import Select from 'react-select';
import './App.css';
import { repPrs } from './repPrs.js'
import { Line } from 'react-chartjs-2';

const graphOptions = {
  scales: {
    xAxes: [{
      type: 'time',
      time: { parser: 'YYYY-MM-DD' }
    }]
  }
}


// const selectedExercise = 'back squats';

// const datasets = Object.keys(repPrs[selectedExercise]).map(repNumber => {
//   const data = repPrs[selectedExercise][repNumber].map(set => {
//     return {
//       x: set.week + (set.day / 10),
//       y: set.weight
//     }
//   })

//   return {
//     label: `${selectedExercise} ${repNumber}RM`,
//     fill: false,
//     lineTension: 0.1,
//     backgroundColor: 'rgba(75,192,192,0.4)',
//     borderColor: 'rgba(75,192,192,1)',
//     borderCapStyle: 'butt',
//     borderDash: [],
//     borderDashOffset: 0.0,
//     borderJoinStyle: 'miter',
//     pointBorderColor: 'rgba(75,192,192,1)',
//     pointBackgroundColor: '#fff',
//     pointBorderWidth: 1,
//     pointHoverRadius: 5,
//     pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//     pointHoverBorderColor: 'rgba(220,220,220,1)',
//     pointHoverBorderWidth: 2,
//     pointRadius: 1,
//     pointHitRadius: 10,
//     spanGaps: true,
//     data: data
//   }
// })

// const data = {
//   datasets: datasets
// }

//console.log(data)

function getGraphData(selectedExercise) {
  const datasets = Object.keys(repPrs[selectedExercise]).map(repNumber => {
    const data = repPrs[selectedExercise][repNumber].map(set => {
      return {
        x: set.inferredDate,
        y: set.weight
      }
    })

    return {
      label: `${selectedExercise} ${repNumber}RM`,
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
      steppedLine: 'before',
      data: data
    }
  })

  const data = {
    datasets: datasets
  }

  return data;
}


const exercises = Object.keys(repPrs).sort().map(k => {
  return { value: k, label: k };
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedExercise: exercises.filter(ex => ex.value === 'back squats')[0],
      graphData: getGraphData('back squats')
    }
  }

  handleChange = (selectedExercise) => {
    const graphData = getGraphData(selectedExercise.value);
    this.setState({
      selectedExercise,
      graphData
    });
    console.log(`Option selected: `, selectedExercise);
    console.log(`graphData: `, graphData);
  }

  render() {
    return (
      <div className="App">
        <Select
          // value={this.selectedOption}
          onChange={this.handleChange}
          options={exercises}
        />
        <Line data={this.state.graphData} options={graphOptions} />

      </div>
    );
  }
}

export default App;
