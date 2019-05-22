import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import body from './bodyReducer';
import video from './videoReducer';

export default combineReducers({
  recipes,
  body,
  video
})