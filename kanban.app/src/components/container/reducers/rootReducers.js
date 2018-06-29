import {combineReducers} from 'redux';
import userSession from './signupReducer';


const allReducers = combineReducers({
    userSession
}); 


export default allReducers;
