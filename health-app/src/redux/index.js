import { combineReducers } from 'redux';
import recipes from './recipeReducer';
import body from './bodyReducer';

export default combineReducers({
  recipes,
  body
})