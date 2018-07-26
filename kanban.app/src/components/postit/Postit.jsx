import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import ImageEdit from '@material-ui/icons/Edit';
import ActionDelete from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {darkBlack} from '@material-ui/core/colors';
import "./Postit.css";
import ColorPicker from '../colorPicker/ColorPicker';
import defaultThumb from  "../../static/smiling.svg"; 



//Change all post it state to bay throw ref.

class Postit extends Component{
    constructor(props){
        super(props);

        this.state={
            id: props.id,
            title: props.title,
            content: props.content,
            hasBlockingIssue: props.hasBlockingIssue,
            position:props.position,
            style:props.style, 
            expanded:false,
            showEditPostit: props.showEditPostit,
            showDeletePostitDialog:false
        }
    }

    getJsonData(){

        return JSON.stringify({
            id: this.props.id,
            title: this.props.title,
            content: this.props.content,
            hasBlockingIssue: this.props.hasBlockingIssue,
            position:this.props.position,
            style:this.props.style, 
            expanded:false,
            showEditPostit: false,
            showDeletePostitDialog:false,
            sourcebay:this.props.sourcebay
        });
    }

    handleOnDragStart(e){
       /*  this.props.setLeavingPostit(this.state.position); */
        e.dataTransfer.effectAllowed="move";
        e.dataTransfer.setData('text/plain',this.getJsonData())
    }

    handlePostitFinishChange(e){
        if (e.key === "Enter")
            this.handleEditClick(e);
    }

    handleDeletePostit(e){
        this.setState((prevState,props) =>({
            showDeletePostitDialog: !prevState.showDeletePostitDialog
        }))
    }

    handleDeletePostitConfirm(e){
        this.props.deletePostit(this.props.position)
    }
    /* state change */
    handleTitleChange(e){
        this.props.onDataChange(this.props.position,"title",e.target.value);
    }

    handleContentChange(e){
        this.props.onDataChange(this.props.position,"content",e.target.value);
    }

    handleExpandClick (e) {
        this.setState({ expanded: !this.state.expanded });
      };
    
    handleEditClick(e){
        this.setState({ showEditPostit: !this.state.showEditPostit });
    }

    handleSetColor(colorId){
        this.props.onDataChange(this.props.position,"style",{background:colorId});
        //this.setState({ style: {background:colorId} });
    }
    
    render(){
        let thumb ="";

        if(sessionStorage.getItem(`rkanban-user-thumb`)) 
            thumb = sessionStorage.getItem(`rkanban-user-thumb`)
        else 
            thumb = defaultThumb;
        
        return(
           <div id={this.props.id} 
                className={this.props.className + "-postit"}
                onDragStart={(e)=>this.handleOnDragStart(e)} 
                draggable="true"
                >
            <Card  
                style={this.props.style}
                className={this.props.className +"-postitcard"}>
                <CardContent 
                 className={this.props.className +"-postitcontent"}>
                    <Avatar
                        alt="Thiago Silva"
                        src={thumb}
                        className={this.props.className +"-avatar"}
                    />
                    <Typography 
                       className={this.props.className +"-postittitle"}>
                        {this.props.title}
                    </Typography>

                    <IconButton
                        className={this.props.className +"-postitexpand"}
                        size="small"   
                        color="primary"
                        onClick={(e)=>this.handleExpandClick(e)}>
                        
                        <ExpandMoreIcon/>
                    </IconButton> 
                </CardContent>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Divider/>
                        <Typography>
                            {this.props.content}
                        </Typography>
                        </CardContent>
                    <CardActions>
                        <IconButton
                            className={this.props.className +"-postitedit"}
                            size="small"   
                            color="primary"
                            onClick={(e)=>this.handleEditClick(e)}>
                            <ImageEdit/>
                        </IconButton> 
                        <IconButton
                            size="small"   
                            className={this.props.className +"-postitdelete"} 
                            color="secondary"
                            onClick={(e)=>this.handleDeletePostit(e)}> 
                            <ActionDelete/>
                        </IconButton> 
                    </CardActions>
                </Collapse>       
                <Dialog     
                            modal="true"
                            open={this.state.showEditPostit}
                            aria-labelledby="form-dialog-postit"
                            onKeyPress={(e)=>this.handlePostitFinishChange(e)}
                            >
                    <DialogTitle id="form-dialog-postit">Edit Postit Data </DialogTitle>
                    <TextField
                        label="Postit title"
                        className={this.props.className + "-txt-postit-title "}
                        onChange={(e)=>this.handleTitleChange(e)}
                        value = {this.props.title}
                    /> 
                     <TextField
                        label="Postit content"
                        multiline
                        className={this.props.className + "-txt-postit-content "}
                        onChange={(e)=>this.handleContentChange(e)}
                        value = {this.props.content}
                    /> 
                    <ColorPicker setColor={(e)=>this.handleSetColor(e)} 
                                 currentColor={this.props.style.background } />
                    <DialogActions>
                        <Button onClick={(e)=>this.handleEditClick(e)} color="primary">
                                Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                        title={"Postit deletion!"}
                        modal="true"
                        open={this.state.showDeletePostitDialog}
                        aria-labelledby="form-dialog-postit"
                >
                <DialogTitle id="form-dialog-postit">{"Are you sure you want to delete the postit " + this.state.title + " ?"}
                </DialogTitle>

                <DialogActions>
                        <Button onClick={(e)=>this.handleDeletePostit(e)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(e)=>this.handleDeletePostitConfirm(e)} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </Card>

         </div>
            
        );
    }

}

export default Postit;

