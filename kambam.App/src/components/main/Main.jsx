
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import './Main.css';

import BayContainer from '../bay/BayContainer';
 
class Main extends Component {
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

        //MOC:some default bays to start with
          const lstBay =  [{bayId:"bay1",bayTitle:"To Do"},{bayId:"bay2",bayTitle:"Doing"},{bayId:"bay3",bayTitle:"Done"}
        ]

        return ( 
            <div classename="main-menu-root">
    
            <AppBar position="static" className="teste">
                <Toolbar>
                <IconButton className="menu-root-title" color="inherit" aria-label="Menu">
                    <Close />
                </IconButton>
                <Typography variant="title" color="inherit" className="menu-root-title">
                    {this.props.projectTitle}
                </Typography>
                <Button className="main-menu-save"
                    onClick={(e)=>this.handleSaveProject(e)}>
                    Save</Button>
                </Toolbar>
            </AppBar>
            
            <BayContainer
                className ="app-bayContainer" bayList={lstBay}
            />
           
            <Snackbar
                open={this.state.showSnack}
                message={this.state.snackMessage}
                autoHideDuration={4000}
                onClose={(e)=>this.handleCloseSnack(e)}
                />
            </div>
        );
    }
}

export default Main;
