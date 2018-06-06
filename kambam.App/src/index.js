import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Project from './components/project/Project';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';



ReactDOM.render(
    
             <Project projectTitle="Projeto Kamban 1" className="app" />
            , document.querySelector('.main-app')
        ); 


ReactDOM.render(
    
    "this is the header"
            , document.querySelector('.main-header')
        );

ReactDOM.render(
            "this is the footer"
                    , document.querySelector('.main-footer')
                );