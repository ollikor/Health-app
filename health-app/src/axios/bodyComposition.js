import axios from 'axios';

const getBodyComposition = () => {
  const weight = [];
  const fat = [];
  const fatkg = [];
  const muscle = [];
  const date = [];

  const url = 'http://localhost:8000/';
  axios.get(url)
  .then( (response) => {
      // console.log(response);
      const length = response.data.length - 1;
      const lastData = response.data[length];
        response.data.forEach((bodyData) => {
          weight.push(parseFloat(bodyData.weight));
          fat.push(parseFloat(bodyData.fat));
          fatkg.push(parseFloat(bodyData.fatkg));
          muscle.push(parseFloat(bodyData.muscle));
          date.push(bodyData.date);
      })
      return response;
      ;
      // return (lastData, weight, fat, fatkg, muscle, date);
      // this.setState({
      //   lastData: lastData,
      //   weight: weight,
      //   fat: fat,
      //   fatkg: fatkg,
      //   muscle: muscle,
      //   date: date
      // })
      // this.props.addBody(lastData, weight, fat, fatkg, muscle, date);
  })
  .catch(function(error){
      console.log(error);
  });
}

export default getBodyComposition;