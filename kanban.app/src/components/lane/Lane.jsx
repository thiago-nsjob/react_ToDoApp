import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

import ContentAdd from '@material-ui/icons/Add';
import ActionDelete from '@material-ui/icons/Delete';
import ImageEdit from '@material-ui/icons/Edit';

import Postit from '../postit/Postit';
import './Lane.css';



class Lane extends Component{
    constructor(props){
        super(props);

        //TODO:Remove after api implementation

        this.state={
            lanetitle: props.laneTitle,
            isTitleHidden:false,
            isEditTitleHidden:true,
            showDeleteDialog:false,
            lstPostit:[],
            postitToDelete:""
        }


            this.handleDeletePostit= this.handleDeletePostit.bind(this);
            this.handlePostitDataChange = this.handlePostitDataChange.bind(this);
   }

   startPostitStructure(){
        const postit = {
                  id: this.getNewID()
                , title:"New Task"
                , content:"write details here"
                , hasBlockingIssue:false
                , showEditPostit:true
                , style:{background:"#eeeeee"}}
    return postit;
   } 
   
   getJsonData(){

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
                lanetitle: e.target.value,  
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

    //Delete lane events
    handleDeleteLane(e){
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

        this.props.deletelane(this.props.laneId);

    }
//Delete lane events

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
       
        //if the source lane id isn't the current, add the post it
        if(postit.sourcelane !== this.props.laneId){

            let newlst = this.state.lstPostit.slice(0); 
            newlst.push(postit);
            this.setState((prevState,props) =>({
                lstPostit: newlst
            }))

            //TODO: impliment delete
            this.props.deleteLaneRemains(postit);
        }
        
    }
   
    
   //Postit methods 
    deleteMovedPostit(postit){
        this.handleDeletePostit(postit.position);
    }

    handlePostitDataChange(poistitIndex,propertyName,propertyValue){
            let tmpList = this.state.lstPostit.slice(0);
            Reflect.set(tmpList[poistitIndex],propertyName,propertyValue);
            this.setState({
                lstPostit: tmpList
            })
    }

    handleDeletePostit(e){
        let newArr = this.state.lstPostit.slice(0);
        newArr.splice(e,1);
      
        this.setState((prevState,props) =>({
            lstPostit: newArr
        }))
    }

    handleAddPostIt(e){        
        let newArr = this.state.lstPostit.slice(0); 

        newArr.push(this.startPostitStructure());

        this.setState((prevState,props) =>({
            lstPostit: newArr
        }))
    }

    buildPostit(postit,index){
        return  <Postit 
                    id={postit.id} 
                    className={this.props.className}
                    title={postit.title} 
                    content={postit.content} 
                    hasBlockingIssue={postit.hasBlockingIssue} 
                    position={index} 
                    sourcelane={this.props.laneId} 
                    deletePostit={this.handleDeletePostit}
                    showEditPostit={postit.showEditPostit} 
                    style = {postit.style}
                    onDataChange={this.handlePostitDataChange}
                />
    }

//Postit methods

    render(){

        return(
            <Paper  id={this.props.laneId} 
                    className={this.props.className} 
                    onDragOver={(e)=>this.handleDragOver(e)}
                    onDragEnter={(e)=>this.handleDragEnter(e)}
                    onDrop={(e)=>this.handleDrop(e)}
                 //   onDragEnd={(e)=>this.handleDragEnd(e)}
            >
                <Typography  className={this.props.className + "-title " + "hidden" + !this.state.isEditTitleHidden  } onClick={(e)=>this.handleEditTitleClick(e)}> 
                    {this.state.lanetitle}
                   
                </Typography>
                <Divider className={this.props.className + "-divider"} />
                <TextField
                    label="Set Lane Name"
                    className={this.props.className + "-fieldlanename " + " hidden" + this.state.isEditTitleHidden}
                    onChange={(e)=>this.handleTitleChange(e)}
                    onKeyPress={(e)=>this.handleTitleFinishChange(e)}
                    value={this.state.lanetitle}
                /> 
                <Button variant="fab"
                    mini={true}
                    onClick={(e)=>this.handleEditTitleClick(e)}
                    className={this.props.className + "-editpostit " }
                >
                <ImageEdit/></Button>
                <Button variant="fab"
                    mini={true} 
                    onClick={(e)=>this.handleAddPostIt(e)}
                    className={this.props.className + "-addpostit " }
                >
                <ContentAdd/>
                </Button>
                <Button variant="fab"
                    mini={true}
                    onClick={(e)=>this.handleDeleteLane(e)}
                    className={this.props.className + "-deletepostit " }  
                >
                <ActionDelete/>
                </Button>
                
                <Dialog
                        title={"Lane deletion!"}
                        modal="true"
                        open={this.state.showDeleteDialog}
                        aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">{"Are you sure you want to delete lane " + this.state.lanetitle + " ?"}
                </DialogTitle>

                <DialogActions>
                                <Button onClick={(e)=>this.handleDeleteClose(e)} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={(e)=>this.handleDeleteConfirm(e)} color="secondary">
                                    Delete
                                </Button>
                            </DialogActions>
                </Dialog>

            
                <div className={this.props.className + "-postits"}>
                {this.state.lstPostit.map((postit,index) =>        
                    this.buildPostit(postit,index)
                )}
                </div>
            </Paper>
             );
    }
}
export default Lane;