
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';



import Lane from './Lane';
import './LaneContainer.css';


class LaneContainer extends Component{
    constructor(props){
        super(props)
        //TODO: this array should come from the api containing the lanes of the current loaded kamban
        this.state={
            lstLane:props.laneList,
            showAddLaneDialog:false,
            newLaneVal:"",
            displayColorPicker: false
        }
        this.handleLaneMovedDelete = this.handleLaneMovedDelete.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }
    

    //TODO: Add delete on server, and call render again
    //Delete lane events
    handleDeleteLane(e){
        document.querySelector(`#${e}`).classList.add("hiddentrue");
     }
     //Delete lane events
 
     //Add lane events
     handleAddLane(e){
       this.setState(
           (prevState,props)=>({
             showAddLaneDialog : !prevState.showAddLaneDialog,
       }));
     }
 
     handleAddLaneCancel(e){
         this.setState(
             (prevState,props)=>({
               showAddLaneDialog : !prevState.showAddLaneDialog,
         }));
 
     }
     handleAddLaneConfirm(e){
        let newlstLane = this.state.lstLane;
        
        newlstLane.push({laneId:"lane"+(this.state.lstLane.length +1) , laneTitle:this.state.newLaneVal});

        this.setState(
            (prevState,props)=>({
            lstLane: newlstLane,
            showAddLaneDialog : !prevState.showAddLaneDialog,
        }));
      }

      handleChange(e){
            this.setState({
              newLaneVal:e.target.value,
            }); 
       
      }

      handleAddLaneFinishChange(e){
        if (e.key === "Enter"){
            this.handleAddLaneConfirm(e);
        }

    }

    handleDisplayColorClick(e) {
        (prevState,props)=>({
            displayColorPicker : !prevState.displayColorPicker,
        });
    }
    //Add lane events

    handleLaneMovedDelete(postit){

        let index = this.state.lstLane.findIndex((i)=>i.laneId == postit.sourcelane);
        this.state.lstLane[index].laneRef.current.deleteMovedPostit(postit);
    }

    buildLane(lane,index){

        let ref = React.createRef();
        console.log(this.state.lstLane[index])
        this.state.lstLane[index].laneRef = ref;

        return <Lane 
                key={index} 
                laneId ={lane.laneId} 
                laneTitle={lane.laneTitle} 
                className={ this.props.className + "-lane"} 
                deletelane={this.handleDeleteLane}
                ref ={ref}
                deleteLaneRemains={this.handleLaneMovedDelete}
                />
    }   

    render(){

        return(
            <div className={this.props.className}> 
                <div className={this.props.className +"-laneList"}>
                
                   { this.state.lstLane.map((lane,index) =>  
                        this.buildLane(lane,index)
                   ) }   
                   
                    <Dialog     
                                className={this.props.className +"-newlanedialog"}
                                modal="true"
                                open={this.state.showAddLaneDialog}
                                aria-labelledby="form-dialog-title"
                                >
                        <DialogTitle id="form-dialog-title">Add new lane onto kanban</DialogTitle>
                        <TextField
                            label="lane title"
                            className={this.props.className + "-textField "}
                            onKeyDown={(e,newval)=>this.handleChange(e,newval)}
                            onChange={(e)=>this.handleChange(e)}
                            onKeyPress={(e)=>this.handleAddLaneFinishChange(e)}
                        /> 
                        <DialogActions>
                            <Button onClick={(e)=>this.handleAddLaneCancel(e)} color="primary">
                                 Cancel
                            </Button>
                            <Button onClick={(e)=>this.handleAddLaneConfirm(e)} color="primary">
                                 Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>   
        );
    }


}

export default LaneContainer;