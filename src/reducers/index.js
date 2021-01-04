import { combineReducers } from 'redux';
import reducer from './cityReducer';

export default combineReducers({city: reducer});