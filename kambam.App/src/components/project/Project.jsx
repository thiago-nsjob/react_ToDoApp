
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import './Project.css';

import BayContainer from '../bay/BayContainer';
 
class Project extends Component {
 constructor(props){
        
        super(props)
        this.state={
            showSnack:false,
            snackMessage:"",
        }

 }

    //Color pallet to be used: http://www.color-hex.com/color-palette/61300
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

    handleAddBay(e){
        this.childBayConteiner.handleAddBay(e);
    };
    
    //Add bay events

    render() {

        //MOC:some default bays to start with
        const lstBay =  [{bayId:"bay1",bayTitle:"To Do"},{bayId:"bay2",bayTitle:"Doing"},{bayId:"bay3",bayTitle:"Done"}]
       
        
        return ( 
            <div classename="project-kanban">
                <div classename="project-menu">                
                    <AppBar position="static" className="project-menu-root">
                        <Toolbar>
                        <IconButton className="project-menu-root-close" color="inherit" aria-label="Menu">
                            <Close />
                        </IconButton>
                        <Typography variant="title" color="inherit" className="project-menu-root-title">
                            {this.props.projectTitle}
                        </Typography>
                        <Button 
                            className={"project-menu-newbay"}
                            onClick={(e)=>this.handleAddBay(e)}>
                            New Bay
                        </Button>
                        <Button className="project-menu-save"
                            onClick={(e)=>this.handleSaveProject(e)}>
                            Save</Button>
                        </Toolbar>
                    </AppBar>
                    <Snackbar
                        open={this.state.showSnack}
                        message={this.state.snackMessage}
                        autoHideDuration={4000}
                        onClose={(e)=>this.handleCloseSnack(e)}
                        />
                </div>
                <div className="project-content">
                    <BayContainer
                        className ="app-bayContainer" bayList={lstBay}
                        onRef={(ref) => (this.childBayConteiner = ref)} 
                    />
                </div>

        </div>
        );
    }
}

export default Project;
