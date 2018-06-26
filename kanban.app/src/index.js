import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Switch,BrowserRouter,IndexRouter,Redirect, Route} from 'react-router-dom';

import './index.css';
import App from './components/app/App';

import rootReducer from "./components/container/reducers/rootReducers"

const store = createStore(rootReducer,{},window.devToolsExtension && window.devToolsExtension());



ReactDOM.render((
        <Provider store = {store}>
                <BrowserRouter>
                    <App /> 
                </BrowserRouter>
        </Provider>

    )

    ,document.querySelector(".main-app")); 
