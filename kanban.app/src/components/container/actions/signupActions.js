export const SIGN_UP = 'SIGN_UP';
export const CHANGE_INFO = 'CHANGE_INFO';

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