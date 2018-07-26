import * as Actions from '../actions/actions';

//Represents the signup whole state
const initialState =  {
    userId:"",
    name:"",
    userName:"",
    password:"",
    confirmPassword:"",
    userThumb:"",
    errorMsg:"",
    showError:false,
}
 
export default (state = initialState,action) =>{

    switch (action.type) {
        case Actions.CHANGE_INFO:

            let user = Object.assign({},state);

            Reflect.set(user,action.payload.propName,action.payload.data);

        return {...state,...user}

        case Actions.SIGN_UP:
            //TODO: add api call to post the user
            try{
                    sessionStorage.setItem(`rkanban-user`,state.userName);
                    sessionStorage.setItem(`rkanban-user-lastlogin`,new Date());
                    sessionStorage.setItem(`rkanban-user-thumb`,state.userThumb);
                    console.log(state.userThumb);
                    return {...state,userId:`${state.userName}okdok`};
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

