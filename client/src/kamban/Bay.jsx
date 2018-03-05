import React, { Component } from 'react';
import {Paper,SvgIcon,FlatButton,TextField,Dialog,Divider} from 'material-ui';
import Title from './Title';
import Postit from './Postit';

import './Bay.css';



class Bay extends Component{
    constructor(props){
        super(props);

        //TODO:Remove after api implementation
        let lst =[{title:"teste1",content:"content 1",hasBlockingIssue:false},
        {title:"teste2",content:"content 2",hasBlockingIssue:false},
        {title:"teste3",content:"content 3",hasBlockingIssue:false}]


        this.state={
            baytitle: props.bayTitle,
            isTitleHidden:false,
            isEditTitleHidden:true,
            showDeleteDialog:false,
            lstPostit:lst,
            postitToDelete:""
        }

            this.handleChildPostitDragStart = this.handleChildPostitDragStart.bind(this);
   }

    getNewID() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

    //EditTitleEvents
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
    //EditTitleEvents

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

//DragEvents
    handleDragOver(e){
        //TODO:Filter types
        e.preventDefault();
    }

    handleDragEnter(e){
        //TODO:Filter types
        e.preventDefault();
    }

    handleDrop(e){
        let postit = JSON.parse(e.dataTransfer.getData('text/plain'));
        //if the source bay id isn't the current, add the post it

            let newlst = this.state.lstPostit.slice(0); 
            newlst.push(postit);
            this.setState((prevState,props) =>({
                lstPostit: newlst
            }))
        
    }

    handleDragEnd(e){

            let newArr = this.state.lstPostit.slice(0);
            newArr.splice(e,1);
          
            this.setState((prevState,props) =>({
                lstPostit: newArr
            }))
    
    }

    handleChildPostitDragStart(e){
        this.setState({
            postitToDelete:e
        });
    }

 //DragEvents    

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
            <Paper  id={this.props.bayId} 
                    className={this.props.className} 
                    zDepth={1}
                    onDragOver={(e)=>this.handleDragOver(e)}
                    onDragEnter={(e)=>this.handleDragEnter(e)}
                    onDrop={(e)=>this.handleDrop(e)}
                    onDragEnd={(e)=>this.handleDragEnd(e)}>
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
            <Divider />
            <div class={this.props.className + "-postits"}>
              {this.state.lstPostit.map((postit,index) =>        
                    <Postit id={this.getNewID()} 
                            title={postit.title} 
                            content={postit.content} 
                            hasBlockingIssue={postit.hasBlockingIssue} 
                            position={index} 
                            sourcebay={this.props.bayId} 
                            setLeavingPostit={this.handleChildPostitDragStart} />
              )}
              </div>
            </Paper>
             );
    }
}
export default Bay;