import {combineReducers} from 'redux';
import signUp from './signupReducer';


const allReducers = combineReducers({
    signUp: signUp
}); 


export default allReducers;
