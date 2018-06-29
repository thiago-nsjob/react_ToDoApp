import * as Actions from '../actions/actions';

//Represents the signup whole state
const initialState =  {
    name:"",
    password:"",
    confirmPassword:"",
    userId:"",
    errorMsg:"",
    showError:false
}
 
export default (state = initialState,action) =>{

    switch (action.type) {
        case Actions.CHANGE_INFO:

            let user = Object.assign({},state);

            Reflect.set(user,action.payload.propName,action.payload.data);

        return {...state,...user}

        case Actions.SIGN_UP:
            //TODO: add api call to post the user
            let session = sessionStorage.getItem(`user-${state.name}`); 
            console.log(session);
            try{
                if (!session){
                    sessionStorage.setItem(`user-${state.name}`,JSON.stringify({...state,userId:`user-${state.name}-${state.password}`}));
                    return {...state,userId:`user-${state.name}`};
                }
                else   
                    throw new Error("User name aready exists");

            }    
            catch(err){
                return {...state,errorMsg:err.message,showError:true};
            }

        case Actions.SET_ERROR:

            return {...state,...action.payload};

        case Actions.SHOW_ERROR:

            return {...state,showError:!state.showError};

      
        default:
            return state;
    }

}

