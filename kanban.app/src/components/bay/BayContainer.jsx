
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import Bay from './Bay';
import './BayContainer.css';


class BayContainer extends Component{
    constructor(props){
        super(props)
        //TODO: this array should come from the api containing the bays of the current loaded kamban
        this.state={
            lstBay:props.bayList,
            showAddBayDialog:false,
            newBayVal:"",
            displayColorPicker: false
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    componentWillUnmount() {
        this.props.onRef(undefined);
    }
    

    //TODO: Add delete on server, and call render again
    //Delete bay events
    handleDeleteBay(e){
        document.querySelector(`#${e}`).classList.add("hiddentrue");
     }
     //Delete bay events
 
     //Add bay events
     handleAddBay(e){
       this.setState(
           (prevState,props)=>({
             showAddBayDialog : !prevState.showAddBayDialog,
       }));
     }
 
     handleAddBayCancel(e){
         this.setState(
             (prevState,props)=>({
               showAddBayDialog : !prevState.showAddBayDialog,
         }));
 
     }
      handleAddBayConfirm(e){
        let newlstBay = this.state.lstBay;
        
        newlstBay.push({bayId:"bay"+(this.state.lstBay.length +1) , bayTitle:this.state.newBayVal});

        this.setState(
            (prevState,props)=>({
            lstBay: newlstBay,
            showAddBayDialog : !prevState.showAddBayDialog,
        }));
      }

      handleChange(e){
            this.setState({
              newBayVal:e.target.value,
            }); 
       
      }

      handleAddBayFinishChange(e){
        if (e.key === "Enter"){
            this.handleAddBayConfirm(e);
        }

    }

    handleDisplayColorClick(e) {
        (prevState,props)=>({
            displayColorPicker : !prevState.displayColorPicker,
        });
    }
       //Add bay events

    render(){

        return(
            <div className={this.props.className}> 

               {/* Old controls   
                <div className={this.props.className + "-bayControls"}> 
                        <div className={this.props.className + "-bayControls-newBay"}>
                            
                        </div>
                        <div className={this.props.className + "-bayControls-colorpicker"}>
                        
                        
                        </div>      
                        
                    </div>
                */}
                <div className={this.props.className +"-bayList"}>
                
                   { this.state.lstBay.map((bay,index) =>  
                   <Bay 
                        key={bay.bayId} 
                        bayId ={bay.bayId} 
                        bayTitle={bay.bayTitle} 
                        className={ this.props.className + "-bay"} 
                        deletebay={this.handleDeleteBay}>
                   </Bay>) }   
                   
                    <Dialog     
                                className={this.props.className +"-newbaydialog"}
                                modal="true"
                                open={this.state.showAddBayDialog}
                                aria-labelledby="form-dialog-title"
                                >
                        <DialogTitle id="form-dialog-title">Add new bay onto kanban</DialogTitle>
                        <TextField
                            label="bay title"
                            className={this.props.className + "-textField "}
                            onKeyDown={(e,newval)=>this.handleChange(e,newval)}
                            onChange={(e)=>this.handleChange(e)}
                            onKeyPress={(e)=>this.handleAddBayFinishChange(e)}
                        /> 
                        <DialogActions>
                            <Button onClick={(e)=>this.handleAddBayCancel(e)} color="primary">
                                 Cancel
                            </Button>
                            <Button onClick={(e)=>this.handleAddBayConfirm(e)} color="primary">
                                 Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>   
        );
    }


}

export default BayContainer;