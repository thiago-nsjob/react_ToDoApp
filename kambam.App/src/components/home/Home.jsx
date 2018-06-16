import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Switch,IndexRouter,Redirect, Route} from 'react-router-dom';



import Header from '../header/Header'
import Footer from '../footer/Footer'
import Dashboard from '../dashboard/Dashboard'


class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            //MOC
            //projectlist : [{projectId:3903809238},{projectId:3903234234},{projectId:3949884987987},] 
        }
    }

    
    render(){

        return(
            <div>
                <Header {...this.props} />
                <Dashboard  {...this.props} projects={this.state.projectlist} />
                <Footer {...this.props}/>    
            </div>
        );
    }
}

export default Home;