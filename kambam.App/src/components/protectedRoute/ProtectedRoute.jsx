import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';


//Based on Antonia Bukowska example
//https://medium.freecodecamp.org/how-to-protect-your-routes-with-react-context-717670c4713a

class ProtectedRoute extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    const Component = this.props.component;

        return(
                <AuthContextConsumer>
                    {
                        (args)=>(
                            
                            <Route render={props=>(args.isLogged()?<Component {...props} /> :<Redirect to="/login" />)} />
                        )   
                    }
                </AuthContextConsumer>    
        )
    }
}

export default ProtectedRoute;

