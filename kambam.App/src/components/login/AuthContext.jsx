import React from 'react';


 const authLoginContext =  React.createContext();

class AuthContext extends React.Component{
    
    constructor(props){
        super(props)

        this.state={
            isAuthenticated:this.isLogged,
        }

        this.handleSignIn = this.handleSignIn.bind(this);
        this.isLogged = this.isLogged.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }


    handleSignIn(user, pass){
      return new Promise(
            function(resolve,reject){
                if(user == "thiago"){
                    sessionStorage.setItem("userlogged",user)
                    console.log(`log in as ${sessionStorage.getItem("userlogged")}`);
                    resolve(200);
                }
                else
                 reject("401 - Not authorized");
            }
      )
      

        //TODO:Authenticates user on the server, and store the webtoken on the AuthContext.
    }

    handleSignOut(){
        return new Promise(
              function(resolve,reject){
                  try{
                    sessionStorage.removeItem("userlogged")
                    console.log(`Logged out!`);
                    resolve(200);

                  }
                  catch(err){
                    reject(err);
                  }   
              }
        )
        
  
          //TODO:Authenticates user on the server, and store the webtoken on the AuthContext.
      }

    isLogged()
    {
        return sessionStorage.getItem("userlogged")
    }

    getUserInfo()
    {
        return sessionStorage.getItem("userlogged")
    }

    render(){
        return(
            <authLoginContext.Provider value={{isLogged: this.isLogged,
                                               handleSignIn: this.handleSignIn,
                                               getUserInfo:this.getUserInfo,
                                               handleSignOut:this.handleSignOut}}>
                {this.props.children}
            </authLoginContext.Provider>
        )
    }

}

const AuthContextConsumer =  authLoginContext.Consumer;

export  {AuthContext,AuthContextConsumer};
