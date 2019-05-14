
const initialState = {
  weight: [],
  fat: [],
  fatkg: [],
  muscle: [],
  date: []
}

const body = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BODY':
      return state
    case 'ADD_BODY':
      let newState = {...state};
      newState = {
        weight: action.weight,
        fat: action.fat,
        fatkg: action.fatkg,
        muscle: action.muscle,
        date: action.date
      };
      return newState
    default:
      return state
  }
}

export default body;