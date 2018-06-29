export const SIGN_UP = 'SIGN_UP';
export const CHANGE_INFO = 'CHANGE_INFO';
export const SET_ERROR = 'SET_ERROR';
export const SHOW_ERROR = 'SHOW_ERROR';

export const signUp =(userInfo)=>{

    return {
        type: SIGN_UP 
      }
} 

export const changeUserInfo =(data,propName)=>{
return {
    type: CHANGE_INFO,
    payload:{
        data,
        propName
    }
  }
} 

export const setError =(errorMsg)=>{
return {
    type: SET_ERROR,
    payload:{errorMsg}
  }
} 

export const showError =()=>{
return {
    type: SHOW_ERROR
  }
} 