import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import '../styles/styles.css';

//import options from './chartOptions';
import SetBodyinformation from './setBodyinformation';

class BodyComposition extends Component {

  state = {
    chartData: {},
    weight: [],
    fat: [],
    fatkg: [],
    muscle: [],
    date: []
  }

  componentDidMount(){
    const weight = [];
    const fat = [];
    const fatkg = [];
    const muscle = [];
    const date = [];

    const url = 'http://localhost:8000/';
    axios.get(url)
    .then( (response) => {
        //console.log(response);
        response.data.forEach((bodyData) => {
            weight.push(parseFloat(bodyData.weight));
            fat.push(parseFloat(bodyData.fat));
            fatkg.push(parseFloat(bodyData.fatkg));
            muscle.push(parseFloat(bodyData.muscle));
            date.push(bodyData.date);
        });
        this.setState({
          weight: weight,
          fat: fat,
          fatkg: fatkg,
          muscle: muscle,
          date: date
        })
    })
    .catch(function(error){
        console.log(error);
    });
  }

  render() {
    return (
      <div className="col-sm-12 p-0">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                zoomType: 'xy'
              },
              title: {
                text: 'Body composition'
              },
              xAxis: {
                title: {
                  text: null
                },
                // tickInterval: 7 * 24 * 60 * 60 * 1000,
                tickInterval: 1,
                type: 'datetime',
                labels: {
                  // formatter: function () {
                  //   return Highcharts.dateFormat('%H', this.value);
                  // },
                  align: 'left',
                  x: -4,
                  y: -4
                },
                tickColor: 'red',
                tickWidth: 5,
                categories: this.state.date
                //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              },
              yAxis: [{
                title: {
                  text: null
                },
                tickInterval: 1,
                labels: {
                  style: {
                    color: '#0099ff'
                  },
                  align: 'right',
                  x: 10,
                  y: 0,
              },
              showFirstLabel: false
              },{
                title: {
                  text: null,
                },
                tickInterval: 1,
                labels: {
                  style: {
                    color: '#b30000'
                  },
                  align: 'right',
                  x: 35,
                  y: 0,
              },
              showFirstLabel: false
              },{
                title: {
                  text: null,
                },
                tickInterval: 1,
                labels: {
                  style: {
                    color: '#ff9900'
                  },
                  align: 'right',
                  x: 55,
                  y: 0,
              },
              showFirstLabel: false
              },{
                title: {
                  text: null,
                },
                tickInterval: 1,
                labels: {
                  style: {
                    color: '#009900'
                  },
                  align: 'right',
                  x: 75,
                  y: 0,
              },
              showFirstLabel: false
              }],
              legend: {
                align: 'right',
                verticalAlign: 'top',
                borderWidth: 0,
              },

              tooltip: {
                  shared: true,
                  crosshairs: false
              },
              plotOptions:{
                series:{
                    cursor: 'pointer',
                   /*  events: {
                      click: function (e) {
                        alert('dsfa');
                      }
                    }, */
                    //pointStart:Date.UTC(2018,0,1),
                    // pointInterval: 7 * 24 * 60 * 60 * 1000
                    pointInterval: 1
                }
              },
              series: [{
                name: 'Weight/kg',
                color: '#0099ff',
                yAxis: 0,
                data: this.state.weight
              },{
                name: 'Fat/%',
                color: '#b30000',
                yAxis: 1,
                data: this.state.fat
              },{
                name: 'Fat/kg',
                color: '#ff9900',
                yAxis: 2,
                data: this.state.fatkg
              },{
                name: 'Muscle/kg',
                color: '#009900',
                yAxis: 3,
                data: this.state.muscle
              }],
              pointInterval: 1
            }}
          />
          <SetBodyinformation />
      </div>
    );
  }
}

export default BodyComposition;
