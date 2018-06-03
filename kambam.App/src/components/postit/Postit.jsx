import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

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
import postit from "./img/postit.svg"



class Postit extends Component{
    constructor(props){
        super(props);

        this.state={
            id: props.id,
            title: props.title,
            content: props.content,
            hasBlockingIssue: props.hasBlockingIssue,
            position:props.position,
            
            expanded:false,
            showEditPostit: props.showEditPostit
        }
    }

    getJsonData(){
        let thisJson="";
        thisJson = this.state;
        return JSON.stringify(thisJson);
    }

    handleOnDragStart(e){
        this.props.setLeavingPostit(this.state.position);
        e.dataTransfer.effectAllowed="move";
        e.dataTransfer.setData('text/plain',this.getJsonData())
    }

    handlePostitFinishChange(e){
        if (e.key === "Enter")
            this.handleEditClick(e);
    }

    /* state change */
    handleTitleChange(e){
        this.setState({
            title:e.target.value,
        });
    }

    handleContentChange(e){
        this.setState({
             content:e.target.value,
        });     
    }
    handleExpandClick (e) {
        this.setState({ expanded: !this.state.expanded });
      };
    
    handleEditClick(e){
        this.setState({ showEditPostit: !this.state.showEditPostit });
    }


    
    render(){

        const style = {
            underlineStyle: {
              color: darkBlack,
            },
          };


        return(
           <div id={this.props.id} 
                className={this.props.className + "-postit"}
                onDragStart={(e)=>this.handleOnDragStart(e)} 
                draggable="true"
                >
          
            <Card  
                className={this.props.className +"-postitcard"}>
                <CardContent 
                 className={this.props.className +"-postitcontent"}>
                    
                    <Typography 
                       className={this.props.className +"-postittitle"}>
                        {this.state.title}
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
                            {this.state.content}
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
                            onClick={(e)=>this.props.deletePostit(this.props.position -1)}> 
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
                        value = {this.state.title}
                    /> 
                     <TextField
                        label="Postit content"
                        multiline
                        className={this.props.className + "-txt-postit-content "}
                        onChange={(e)=>this.handleContentChange(e)}
                        value = {this.state.content}
                    /> 
                    <DialogActions>
                        <Button onClick={(e)=>this.handleEditClick(e)} color="primary">
                                Close
                        </Button>
                    </DialogActions>
                </Dialog>         
            </Card>

         </div>
            
        );
    }

}

export default Postit;

