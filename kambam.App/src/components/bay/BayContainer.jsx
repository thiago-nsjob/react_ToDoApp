
import React, { Component } from 'react';
import {RaisedButton,Dialog,TextField,FlatButton} from 'material-ui';
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
        }
    }

//TODO: Add delete on server, and call render again
    //Delete bay events
    handleDeleteBay(e){
        document.querySelector(`#${e}`).classList.add("app-bay-hiddentrue");
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
      handleChange(e,newval){
        this.setState(
            (prevState,props)=>({
            newBayVal:newval,
        }));
      }

      handleAddBayFinishChange(e){
        if (e.key === "Enter"){
            this.handleAddBayConfirm(e);
        }
    }
       //Add bay events

    render(){

        const AddBayDialogActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              keyboardFocused={true}
              onClick={(e)=>this.handleAddBayCancel(e)}
            />,
            <FlatButton
              label="Add"
              primary={true}
              onClick={(e)=>this.handleAddBayConfirm(e)}
            />,
          ];

        return(
            <div class={this.props.className}> 
                 <RaisedButton 
                    label="New bay"
                    className={this.props.className + "-button-newBay"}
                    onClick={(e)=>this.handleAddBay(e)}
                />
                <div class={this.props.className +"-bayList"}>
                
                   {this.state.lstBay.map((bay,index) =>  
                   <Bay 
                    key={bay.bayId} 
                    bayId ={bay.bayId} 
                    bayTitle={bay.bayTitle} 
                    className={ this.props.className + "-bay"} 
                    deletebay={this.handleDeleteBay}>
                   </Bay>)}   
                   
                    <Dialog     title={"Add new Bay"}
                                modal="true"
                                open={this.state.showAddBayDialog}
                                actions={AddBayDialogActions}>
                    
                        <TextField
                            hintText="bay title"
                            className={this.props.className + "-textField "}
                            onChange={(e,newval)=>this.handleChange(e,newval)}
                            onKeyPress={(e)=>this.handleAddBayFinishChange(e)}
                        /> 
                    </Dialog>
                </div>
            </div>   
        );
    }


}

export default BayContainer;