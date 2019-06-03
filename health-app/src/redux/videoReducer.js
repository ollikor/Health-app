
const initialState = {
  channel: false,
}

const channel = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SELECTED_CHANNEL':
      return state
    case 'ADD_SELECTED_CHANNEL':
      let newState = {...state};
      newState = {
        channel: action.channel
      };
      return newState
    default:
      return state
  }
}

export default channel;