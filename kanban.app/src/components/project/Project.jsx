
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';


import './Project.css';

import LaneContainer from '../lane/LaneContainer';
 
class Project extends Component {
 constructor(props){
        
        super(props)
        this.state={
            showSnack:false,
            snackMessage:"",
            showExitDialog:false,
        }

 }

    componentDidMount(){
      
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

    handleAddLane(e){
        this.childLaneConteiner.handleAddLane(e);
    };
    
    //Add lane events

    render() {

        //MOC:some default lanes to start with
        const lstLane =  [{laneId:"lane1",laneTitle:"To Do",laneRef:undefined},{laneId:"lane2",laneTitle:"Doing",laneRef:undefined},{laneId:"lane3",laneTitle:"Done",laneRef:undefined}]
       
        
        return ( 
            <div classename="project-kanban">
                <div classename="project-menu">                
                    <AppBar position="static" className="project-menu-root">
                        <Toolbar>
                        <IconButton className="project-menu-root-close" 
                                    color="inherit" 
                                    aria-label="Menu"
                                    onClick={(e)=>{this.setState({showExitDialog:true})}}>
                            <Close />
                        </IconButton>
                        <Typography variant="title" color="inherit" className="project-menu-root-title">
                            {this.props.projectName}
                        </Typography>
                        <Button 
                            className={"project-menu-newlane"}
                            onClick={(e)=>this.handleAddLane(e)}>
                            New Lane
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
                    <LaneContainer
                        className ="app-laneContainer" laneList={lstLane}
                        onRef={(ref) => (this.childLaneConteiner = ref)} 
                    />
                </div>

                <Dialog
                                            title={"Exit current project"}
                                            modal="true"
                                            open={this.state.showExitDialog}
                                            aria-labelledby="form-dialog-title"
                                    >
                                    <DialogTitle id="form-dialog-title">{`Are you sure you want to exit project ${this.state.projectName} ?`}
                                    </DialogTitle>
                                    <DialogActions>
                                                    <Button onClick={(e)=>this.props.history.push("/")} color="primary">
                                                        OK
                                                    </Button>
                                                    <Button onClick={(e)=>this.setState({showExitDialog:false})} color="primary">
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                    </Dialog>

        </div>
        );
    }
}

export default Project;
