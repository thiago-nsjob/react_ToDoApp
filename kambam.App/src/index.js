import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main/Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: purple[300],
        main: purple[500],
        dark: purple[700],
      },
      secondary: {
        light: green[300],
        main: green[500],
        dark: green[700],
      },
    },
  });

ReactDOM.render(
    
            <MuiThemeProvider theme={theme}>
                <Main projectTitle="Projeto Kamban 1" className="app" />
                <CssBaseline />
                <Component {...props} />
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