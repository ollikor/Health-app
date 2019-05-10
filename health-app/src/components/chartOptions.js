const options = {
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
    tickInterval: 7 * 24 * 60 * 60 * 1000,
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
    //categories: ['1.1.2019', '2.2.2019' ]
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
        color: '#ff4d4d'
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
        color: '#ff9900'
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
          click: function (e) {
            alert('dsfa');
          }
        },
        pointStart:Date.UTC(2019,0,1),
        pointInterval: 7 * 24 * 60 * 60 * 1000
    }
  },
  series: [{
    name: 'Weight/kg',
    color: '#0099ff',
    yAxis: 0,
    data: [60, 71, 71,60, 71, 71, 70,70,70,70]
  },{
    name: 'Fat/%',
    color: '#b30000',
    yAxis: 1,
    data: [40, 41, 45]
  },{
    name: 'Fat/kg',
    color: '#ff9900',
    yAxis: 2,
    data: [15, 14, 16]
  },{
    name: 'Muscle/kg',
    color: '#009900',
    yAxis: 3,
    data: [28, 30, 32]
  }],
  pointInterval: 1
}

export default options;