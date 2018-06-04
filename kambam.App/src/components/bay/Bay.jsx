import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';

import ContentAdd from '@material-ui/icons/Add';
import ActionDelete from '@material-ui/icons/Delete';
import ImageEdit from '@material-ui/icons/Edit';

import Title from './Title';
import Postit from '../postit/Postit';
import {red} from '@material-ui/core/colors';


import './Bay.css';



class Bay extends Component{
    constructor(props){
        super(props);

        //TODO:Remove after api implementation

        this.state={
            baytitle: props.bayTitle,
            isTitleHidden:false,
            isEditTitleHidden:true,
            showDeleteDialog:false,
            lstPostit:[],
            postitToDelete:""
        }

            this.handleChildPostitDragStart = this.handleChildPostitDragStart.bind(this);
            this.handleDeletePostit= this.handleDeletePostit.bind(this);
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
        console.log(postit);
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
 handleDeletePostit(e){
    this.setState({
        postitToDelete:e
    });

    //although its not meaningfull, its better for the sake of non repeating code 
    this.handleDragEnd(e);

}

    handleAddPostIt(e){        
        let newArr = this.state.lstPostit.slice(0);
        
        newArr.push({title:"newPostit",content:"----",hasBlockingIssue:false,showEditPostit:true});

        this.setState((prevState,props) =>({
            lstPostit: newArr
        }))
    }



    render(){

    
        return(
            <Paper  id={this.props.bayId} 
                    className={this.props.className} 
                    onDragOver={(e)=>this.handleDragOver(e)}
                    onDragEnter={(e)=>this.handleDragEnter(e)}
                    onDrop={(e)=>this.handleDrop(e)}
                    onDragEnd={(e)=>this.handleDragEnd(e)}>
            <Typography className={this.props.className + "-title " + "hidden" + !this.state.isEditTitleHidden  }> 
                {this.state.baytitle}
                <Divider className={this.props.className + "-divider"} />
            </Typography>
             <TextField
                label="Set Bay Name"
                className={this.props.className + "-fieldbayname " + " hidden" + this.state.isEditTitleHidden}
                onChange={(e)=>this.handleTitleChange(e)}
                onKeyPress={(e)=>this.handleTitleFinishChange(e)}
                value={this.state.baytitle}
               

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
                onClick={(e)=>this.handleDeleteBay(e)}
                className={this.props.className + "-deletepostit " }  
            >
            <ActionDelete/>
            </Button>
            
            <Dialog
                    title={"Bay deletion!"}
                    modal="true"
                    open={this.state.showDeleteDialog}
                    aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">{"Are you sure you want to delete bay " + this.state.baytitle + " ?"}
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
                    <Postit id={this.getNewID()} 
                            className={this.props.className}
                            title={postit.title} 
                            content={postit.content} 
                            hasBlockingIssue={postit.hasBlockingIssue} 
                            position={index} 
                            sourcebay={this.props.bayId} 
                            setLeavingPostit={this.handleChildPostitDragStart}
                            deletePostit={this.handleDeletePostit}
                            showEditPostit={postit.showEditPostit} />
              )}
              </div>
            </Paper>
             );
    }
}
export default Bay;