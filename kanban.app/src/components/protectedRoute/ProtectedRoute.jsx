import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';


//Based on Antonia Bukowska example
//https://medium.freecodecamp.org/how-to-protect-your-routes-with-react-context-717670c4713a

class ProtectedRoute extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
    const Component = this.props.component;
        return(
                <AuthContextConsumer>
                    {
                        (args)=>(
                            //Had to pass the parent props manually to the route once expanding this.props causes conflict between render and the component prop 
                            //Also, I have adjusted the route to pass all url parms as component props for its render component.
                            <Route path={this.props.path} history={this.props.history} match={this.props.match}  render={props=>(args.isLogged()?<Component {...props} {...props.match.params}  /> :<Redirect to="/login" />)} />
                        )   
                    }
                </AuthContextConsumer>    
        )
    }

}
export default ProtectedRoute;

