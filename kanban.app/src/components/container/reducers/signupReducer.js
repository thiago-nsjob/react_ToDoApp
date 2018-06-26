import * as Actions from '../actions/signupActions';

//Represents the signup whole state
const initialState =  {
    name:"",
    password:"",
    confirmPassword:"",
    userId:""
}
 
export default (state = initialState,action) =>{

    console.log("actionpayload: "+action.payload);

    switch (action.type) {
        case Actions.CHANGE_INFO:

            let user = Object.assign({},state);

            Reflect.set(user,action.payload.propName,action.payload.data);

        return {...state,...user}

        case Actions.SIGN_UP:

            //TODO: add api call to post the user
             sessionStorage.setItem(`user-${state.name}-${state.password}`,JSON.stringify({...state,userId:`user-${state.name}-${state.password}`})); 
    
            return {...state,userId:`user-${state.name}-${state.password}`};
      
      
        default:
            return state;
    }

}

