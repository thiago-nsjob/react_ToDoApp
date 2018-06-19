
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
        this.handleBayMovedDelete = this.handleBayMovedDelete.bind(this);
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

    handleBayMovedDelete(postit){

        let index = this.state.lstBay.findIndex((i)=>i.bayId == postit.sourcebay);
        this.state.lstBay[index].bayRef.current.deleteMovedPostit(postit);
    }

    buildBay(bay,index){

        let ref = React.createRef();
        console.log(this.state.lstBay[index])
        this.state.lstBay[index].bayRef = ref;

        return <Bay 
                key={index} 
                bayId ={bay.bayId} 
                bayTitle={bay.bayTitle} 
                className={ this.props.className + "-bay"} 
                deletebay={this.handleDeleteBay}
                ref ={ref}
                deleteBayRemains={this.handleBayMovedDelete}
                />
    }   

    render(){

        return(
            <div className={this.props.className}> 
                <div className={this.props.className +"-bayList"}>
                
                   { this.state.lstBay.map((bay,index) =>  
                        this.buildBay(bay,index)
                   ) }   
                   
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