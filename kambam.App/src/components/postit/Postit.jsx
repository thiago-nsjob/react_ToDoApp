import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';


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
    handleExpandClick (e) {
        this.setState({ expanded: !this.state.expanded });
      };

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
                className={this.props.className +"-postitcontent"}>
                <CardContent>
                    
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
                     <Typography>
                         {this.state.content}
                    </Typography>
                     </CardContent>
                <CardActions>
                    <IconButton
                        className={this.props.className +"-postitedit"}
                        size="small"   
                        color="primary">
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
                
            </Card>

         </div>
            
        );
    }

}

export default Postit;

