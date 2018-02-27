import React, { Component } from 'react';
import {Paper,SvgIcon,FlatButton,TextField,Dialog} from 'material-ui';
import Title from './Title';


import './Bay.css';



class Bay extends Component{
    constructor(props){
        super(props);
        this.state={
            baytitle: props.bayTitle,
            isTitleHidden:false,
            isEditTitleHidden:true,
            showDeleteDialog:false
        }
   }

    //Edit title events
    handleEditTitleClick(e){
        this.setState((prevState,props) =>({
            isTitleHidden: !prevState.isTitleHidden,
            isEditTitleHidden:!prevState.isEditTitleHidden
        }))
    }
    handleTitleChange(e){
            this.setState( {
                baytitle: e.target.value,  
            })
    }
    handleTitleFinishChange(e){
        if (e.key === "Enter"){
            this.setState((prevState,props) =>({
                isTitleHidden: !prevState.isTitleHidden,
                isEditTitleHidden:!prevState.isEditTitleHidden
            }))
        }
    }
    //Edit title events

    //Delete bay events
    handleDeleteBay(e){

        this.setState((prevState,props) =>({
            showDeleteDialog: !prevState.showDeleteDialog
        }))
    }
    handleDeleteClose(){
        this.setState((prevState,props) =>({
            showDeleteDialog: !prevState.showDeleteDialog
        }))
    }
    handleDeleteConfirm(){

        this.setState((prevState,props) =>({
            showDeleteDialog: !prevState.showDeleteDialog
        }));

        this.props.deletebay(this.props.bayId);

    }
    //Delete bay events

    render(){

        const deleteDialogActions = [
            <FlatButton
              label="Cancel"
              primary={true}
              keyboardFocused={true}
              onClick={(e)=>this.handleDeleteClose(e)}
            />,
            <FlatButton
              label="Delete"
              primary={true}
              onClick={(e)=>this.handleDeleteConfirm(e)}
            />,
          ];

        return(
            <Paper id={this.props.bayId} className={this.props.className} zDepth={1}>
            <Title
                className={this.props.className+"-hidden" + this.state.isTitleHidden  + " " + this.props.className  }
                title={this.state.baytitle}
            />  
            <FlatButton
                icon={
                <SvgIcon>
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                  </SvgIcon>}
                onClick={(e)=>this.handleEditTitleClick(e)}
                className={this.props.className + "-FlatButton " }
            /> 
             <TextField
                hintText="title text"
                className={this.props.className+"-hidden" + this.state.isEditTitleHidden + " "  + this.props.className + "-textField "}
                onChange={(e)=>this.handleTitleChange(e)}
                onKeyPress={(e)=>this.handleTitleFinishChange(e)}
                value={this.state.baytitle}
            /> 
            <FlatButton
                icon={
                <SvgIcon>
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                  </SvgIcon>}
                onClick={(e)=>this.handleDeleteBay(e)}
                className={this.props.className + "-FlatButton " }
            /> 
            <Dialog
                    title={"Bay deletion!"}
                    modal="true"
                    open={this.state.showDeleteDialog}
                    actions={deleteDialogActions}
            >
            {"Are you sure you want to delete bay " + this.state.baytitle + " ?"}
            </Dialog>
            
            </Paper>
             );
    }
}
export default Bay;