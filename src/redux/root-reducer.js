import userReducer from './user/user-reducer.js';
import { combineReducers } from 'redux';

export default combineReducers({
    user: userReducer
});