import React from 'react';
import { Bar } from 'react-chartjs-2';
// import { Line } from 'react-chartjs-2';
import axios from 'axios';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartParams: {
        datasets: [
          {
            label: 'Daily Percent Required Calories Eaten',
            borderWidth: 1,
          },
        ],
      },
    };
  }

  componentDidMount() {
    document.title = 'Tracker - Stats';
    axios.get('http://localhost:3000/api/stats').then((result) => {
      if (result.data.message === 'unauthorized') {
        window.location.href = 'http://localhost:3000/api/auth';
      } else {
        console.log(result.data);
        const datapoints = result.data;
        datapoints.pop();
        const chartParams = this.state.chartParams;
        chartParams.datasets[0].data = result.data.map(day => day.percentDailyValue * 100);
        chartParams.labels = result.data.map(day => day._id);
        const backgroundColor = this.getColorArray(chartParams.datasets[0].data, 100, 'rgba(255, 96, 96, 0.75)', 'rgba(143, 224, 114, 0.75)');
        const hoverBackgroundColor = this.getColorArray(chartParams.datasets[0].data, 100, 'rgba(204, 36, 36, 0.75)', 'rgba(87, 183, 53, 0.75)');
        console.log(backgroundColor);
        console.log(chartParams.datasets[0].data);
        chartParams.datasets[0].backgroundColor = backgroundColor;
        chartParams.datasets[0].borderColor = backgroundColor;
        chartParams.datasets[0].hoverBackgroundColor = hoverBackgroundColor;
        chartParams.datasets[0].hoverBorderColor = hoverBackgroundColor;
        this.setState({
          chartParams,
        }, () => console.log(this.state));
      }
    });
  }

  getColorArray(data, threshold, colorLow, colorHigh) {
    const colors = [];
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] > threshold) {
        colors.push(colorHigh);
      } else {
        colors.push(colorLow);
      }
    }
    return colors;
  }


  render() {
    return (
      <div>
        {this.state.chartParams &&
          <div>
            <h1 className='title'>Meal Stats</h1>
            <Bar
              data={this.state.chartParams}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      callback(value, index, values) {
                        return `${value}%`;
                      },
                    },
                  }],
                },
              }}
            />
          </div>
        }
      </div>
    );
  }
}
