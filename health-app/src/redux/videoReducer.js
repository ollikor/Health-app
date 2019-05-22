
const initialState = {
  channel: false,
}

const body = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SELECTED_CHANNEL':
      return state
    case 'ADD_SELECTED_CHANNEL':
      let newState = {...state};
      newState = {
        channel: action.channel,
        update: !state.update
      };
      return newState
    default:
      return state
  }
}

export default body;