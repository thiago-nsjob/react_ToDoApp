import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import {Switch,BrowserRouter,IndexRouter,Redirect, Route} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';


ReactDOM.render((<BrowserRouter>   
                    <App /> 
                </BrowserRouter>)
    ,document.querySelector(".main-app")); 

