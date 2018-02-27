

import React, { Component } from 'react';
import {AppBar,FlatButton,IconButton,Snackbar} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import BayContainer from './BayContainer';
import './App.css';

 
class App extends Component {
 constructor(props){
        super(props)
        this.state={
            showSnack:false,
            snackMessage:"",
        }
 }


    //TODO: Add delete on server, and call render again
    
    handleSaveProject(e){
        this.handleShowSnack("Project Saved");    
    }

    handleShowSnack(message){
  
        this.setSnackMessage(message);

        this.setState((prevState,index) =>({
                  showSnack:true,
            })
        );

    }

    handleCloseSnack(message){
        this.setState((prevState,index) =>({
                  showSnack:false,
            })
        );

    }

    setSnackMessage(message){
        this.setState((prevState,index) =>({
            snackMessage:message,
            })
        );
    }
    
    //Add bay events

    render() {
          const lstBay =  [{bayId:"bay1",bayTitle:"To Do"},
          {bayId:"bay2",bayTitle:"Doing"},
          {bayId:"bay3",bayTitle:"Done"}]

        return ( 
            <div>
            <AppBar
                title={this.props.projectTitle}
                className="app-bar"
                iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                iconElementRight={<FlatButton 
                                    label="Save" 
                                    onClick={(e)=>this.handleSaveProject(e)}
                                    />}
            />
            
            <BayContainer 
                className={this.props.className + "-bayContainer"}
                bayList={lstBay}
            />
            <Snackbar
                open={this.state.showSnack}
                message={this.state.snackMessage}
                autoHideDuration={4000}
                onRequestClose={(e)=>this.handleCloseSnack(e)}
                />
            </div>
        );
    }
}

export default App;