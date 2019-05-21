
const initialState = {
  recipes: [],
  update: false
}

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECIPES':
      return state
    case 'ADD_RECIPES':
      const newState = {...state};
      newState.recipes = action.recipes;
      return newState
    case 'UPDATE':
      const nestate = {...state};
      nestate.update = !state.update;
      console.log(nestate);
      return nestate;
    default:
      return state
  }
}

export default recipes;