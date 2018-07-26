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
                console.log(`user informed ${user}`);
                console.log(`session storage${sessionStorage.getItem("rkanban-user")}`)
                if(user == sessionStorage.getItem("rkanban-user") ){
                    sessionStorage.setItem(`rkanban-user-lastlogin`,new Date());
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
                    sessionStorage.removeItem("rkanban-user-lastlogin")
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
        let lastLogin = new Date(sessionStorage.getItem('rkanban-user-lastlogin'));
        
        //if last login time was more than 30min ago
        return Math.floor(((new Date()) - lastLogin)/1000/60) <= 30;
    }

    getUserInfo()
    {
        return sessionStorage.getItem("rkanban-user");
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
