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

const hexColors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000", 
  "#800000", "#008000", "#000080", "#808000", "#800080", "#008080", "#808080", 
  "#C00000", "#00C000", "#0000C0", "#C0C000", "#C000C0", "#00C0C0", "#C0C0C0", 
  "#400000", "#004000", "#000040", "#404000", "#400040", "#004040", "#404040", 
  "#200000", "#002000", "#000020", "#202000", "#200020", "#002020", "#202020", 
  "#600000", "#006000", "#000060", "#606000", "#600060", "#006060", "#606060", 
  "#A00000", "#00A000", "#0000A0", "#A0A000", "#A000A0", "#00A0A0", "#A0A0A0", 
  "#E00000", "#00E000", "#0000E0", "#E0E000", "#E000E0", "#00E0E0", "#E0E0E0", 
]

function hexToRgbaString(hex, a){
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${a})`;
}

function getGraphData(selectedExercise) {
  const datasets = Object.keys(repPrs[selectedExercise]).map((repNumber, i) => {
    const data = repPrs[selectedExercise][repNumber].map(set => {
      return {
        x: set.inferredDate,
        y: set.weight
      }
    })

    const color = hexColors[i % hexColors.length];
    return {
      label: `${selectedExercise} ${repNumber}RM`,
      fill: false,
      lineTension: 0.1,
      backgroundColor: hexToRgbaString(color, .4),
      borderColor: hexToRgbaString(color, .7),
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: hexToRgbaString(color, 1),
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: hexToRgbaString(color, 1),
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 3,
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
