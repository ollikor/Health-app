import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import '../styles/styles.css';

import { getBodyComposition } from '../api';

import SetBodyComposition from './setBodyComposition';
import DeleteModal from './deleteModal';

class BodyComposition extends Component {

  state = {
    id: '',
    body: '',
    modalShow: false,
    onHide: true,
    update: false
  }

  componentDidMount(){
    this.update()
  }

  async update() {
    const body = await getBodyComposition();
    this.setState({
      body: body
    })
  }

  deleteBody = (e) => {
    const date = e.point.category;
    this.setState({modalShow: true, id: date});
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="col-sm-12 p-0">
          <DeleteModal
            title={"Remove bodycomposition"}
            description={"Are you sure that you want to remove this bodycomposition?"}
            url={''}
            move={'/bodyComposition'}
            id={this.state.id}
            show={this.state.modalShow}
            onHide={modalClose}
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
                // tickInterval: 7 * 24 * 60 * 60 * 1000,
                tickInterval: 1,
                type: 'datetime',
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
                    events: {
                      click: (e) => {
                        this.deleteBody(e)
                      }
                    },
                    //pointStart:Date.UTC(2018,0,1),
                    // pointInterval: 7 * 24 * 60 * 60 * 1000
                    pointInterval: 1
                }
              },
              series: [{
                name: 'Weight/kg',
                color: '#0099ff',
                yAxis: 0,
                data: this.state.body.weight
              },{
                name: 'Fat/%',
                color: '#b30000',
                yAxis: 1,
                data: this.state.body.fat
              },{
                name: 'Fat/kg',
                color: '#ff9900',
                yAxis: 2,
                data: this.state.body.fatkg
              },{
                name: 'Muscle/kg',
                color: '#009900',
                yAxis: 3,
                data: this.state.body.muscle
              }],
              pointInterval: 1
            }}
          />
          <SetBodyComposition update={()=> this.update()} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // date: state.body.date,
  // weight: state.body.weight,
  // fat: state.body.fat,
  // fatkg: state.body.fatkg,
  // muscle: state.body.muscle,
});

export default connect(mapStateToProps)(BodyComposition);
