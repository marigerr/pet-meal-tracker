import React from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineParams: {
        datasets: [
          {
            label: 'Daily Percent Calories Met',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: 'rgba(75,192,192,1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 5,
            pointHitRadius: 10,
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
        const lineParams = this.state.lineParams;
        lineParams.datasets[0].data = result.data.map(day => day.percentDailyValue * 100);
        lineParams.labels = result.data.map(day => day._id);
        this.setState({
          lineParams,
        }, () => console.log(this.state));
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className='title'>Meal Stats</h1>
        <Line
          data={this.state.lineParams}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              }],
            },
          }}
        />
      </div>
    );
  }
}
