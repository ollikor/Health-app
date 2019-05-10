import axios from 'axios';

const getBodyinformation = () => {

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
            weight.push(bodyData.weight);
            fat.push(bodyData.fat);
            fatkg.push(bodyData.fatkg);
            muscle.push(bodyData.muscle);
            date.push(bodyData.date);
        });
        // return({
        //         chartData:
        //         {
        //         labels: date,
        //         datasets: [
        //             {
        //                 label: 'Weight/kg',
        //                 yAxisID: 'weight',
        //                 data: weight,
        //                 backgroundColor: 'rgb(0, 153, 255)',
        //                 borderColor: 'rgb(0, 153, 255)',
        //                 pointBackgroundColor: 'rgb(0, 153, 255)',
        //                 lineTension: 0.1,
        //                 fill: false
        //             },
        //             {
        //                 label: 'Fat/%',
        //                 yAxisID: 'fat',
        //                 data: fat,
        //                 backgroundColor: 'rgb(179, 0, 0)',
        //                 borderColor: 'rgb(179, 0, 0)',
        //                 pointBackgroundColor: 'rgb(179, 0, 0)',
        //                 lineTension: 0.1,
        //                 fill: false
        //             },
        //             {
        //                 label: 'Fat/kg',
        //                 yAxisID: 'fatkg',
        //                 data: fatkg,
        //                 backgroundColor: 'rgb(255, 102, 102)',
        //                 borderColor: 'rgb(255, 102, 102)',
        //                 pointBackgroundColor: 'rgb(255, 102, 102)',
        //                 pointBorderColor: false,
        //                 lineTension: 0.1,
        //                 fill: false
        //             },
        //             {
        //                 label: 'Muscle/kg',
        //                 yAxisID: 'muscle',
        //                 data: muscle,
        //                 backgroundColor: 'rgb(51, 204, 51)',
        //                 borderColor: 'rgb(51, 204, 51)',
        //                 pointBackgroundColor: 'rgb(51, 204, 51)',
        //                 lineTension: 0.1,
        //                 fill: false
        //             }
        //         ]

        //     }
        // })
    })
    .catch(function(error){
        console.log(error);
    });
}

export default getBodyinformation;
