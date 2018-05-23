import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main/Main';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(
    
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Main projectTitle="Projeto Kamban 1" className="app" />
            </MuiThemeProvider>
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