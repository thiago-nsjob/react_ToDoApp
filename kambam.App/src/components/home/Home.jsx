import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Switch,IndexRouter,Redirect, Route} from 'react-router-dom';

import Header from '../header/Header.jsx'
import Footer from '../footer/Footer.jsx'
import Project from '../project/Project.jsx'



class Home extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header {...this.props} />
                main app - home !
            
                <Footer {...this.props}/>
            </div>
        );
    }
}

export default Home;