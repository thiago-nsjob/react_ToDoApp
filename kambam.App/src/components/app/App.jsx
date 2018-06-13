import React, { Component } from 'react';

import {Switch,BrowserRouter,IndexRouter,Redirect, Route} from 'react-router-dom';


import Home from '../home/Home';
import Project from '../project/Project';
import Login from '../login/Login';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';

import './App.css';

class App extends  Component{
    render(){
        return(
            <AuthContext >
                <Switch>
                    <Route exact  path="/login" component={Login} />
                    <ProtectedRoute exact path="/" component={Home}/>
                    <ProtectedRoute exact  path="/home" component={Home}/>
                    <ProtectedRoute exact  path="/project" component={Project}/>
                </Switch>
              </AuthContext>
        );
    }
}

export default App;