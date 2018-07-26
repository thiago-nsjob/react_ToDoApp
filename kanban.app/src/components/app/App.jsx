import React, { Component } from 'react';

import {Switch,BrowserRouter,IndexRouter,Redirect, Route} from 'react-router-dom';


import Home from '../home/Home';
import Project from '../project/Project';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';



import './App.css';


class App extends  Component{
    render(){
        return(
                <AuthContext >
                    <Switch>
                        <Route exact  path="/login" component={Login} />
                        <Route exact path={`/signup`} component={SignUp} /> 
                        <ProtectedRoute exact path="/" component={Home}/>
                        <ProtectedRoute exact path="/home" component={Home}/>
                        <ProtectedRoute exact path={`/project/:projectName`} component={Project} projectTitle="teste" />
                        
                    </Switch>
                </AuthContext>
        );
    }
}


export default App;