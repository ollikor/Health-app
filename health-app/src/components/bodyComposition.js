import React from 'react';
import { Component } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import '../styles/styles.css';

import { getBodyComposition } from '../api';

import SetBodyComposition from './setBodyComposition';
import DeleteModal from './deleteModal';
import RemovedModal from './removedModal';

class BodyComposition extends Component {

  state = {
    id: '',
    body: '',
    modalShow: false,
    showRemoved: false,
    onHide: true,
  }

  componentDidMount() {
    this.update()
  }

  async update(status) {
    const body = await getBodyComposition();
    this.setState({
      body: body
    })
    if(status === "removed"){
      this.setState({
        showRemoved: true
      })
      this.timer();
    }
  }

  timer = () => {
    setTimeout(() => {
      this.setState({showRemoved: false});
    }, 1000);
  }

  deleteBody = (e) => {
    const date = e.point.category;
    this.setState({ modalShow: true, id: date });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="col-sm-12 p-0">
        <RemovedModal show={this.state.showRemoved} removed={'Body composition removed'} />
        <DeleteModal
          title={"Remove bodycomposition"}
          description={"Are you sure that you want to remove this bodycomposition?"}
          url={''}
          move={'/bodyComposition'}
          id={this.state.id}
          show={this.state.modalShow}
          onHide={modalClose}
          update={() => this.update("removed")}
        />
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
              labels: {
                align: 'left',
                x: -4,
                y: -4
              },
              tickColor: 'red',
              tickWidth: 5,
              categories: this.state.body.date
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
            }, {
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
            }, {
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
            }, {
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
            plotOptions: {
              series: {
                cursor: 'pointer',
                events: {
                  click: (e) => {
                    this.deleteBody(e)
                  }
                },
              }
            },
            series: [{
              name: 'Weight/kg',
              color: '#0099ff',
              yAxis: 0,
              data: this.state.body.weight
            }, {
              name: 'Fat/%',
              color: '#b30000',
              yAxis: 1,
              data: this.state.body.fat
            }, {
              name: 'Fat/kg',
              color: '#ff9900',
              yAxis: 2,
              data: this.state.body.fatkg
            }, {
              name: 'Muscle/kg',
              color: '#009900',
              yAxis: 3,
              data: this.state.body.muscle
            }],
            pointInterval: 1
          }}
        />
        <SetBodyComposition update={() => this.update()} />
      </div>
    );
  }
}

export default BodyComposition;
