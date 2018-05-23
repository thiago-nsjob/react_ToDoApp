import React, { Component } from 'react';
import {Paper,FlatButton,RaisedButton ,SvgIcon,TextField} from 'material-ui';
import {Card,CardText,CardActions,CardHeader} from 'material-ui';
import {darkBlack} from 'material-ui/styles/colors';
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
        showoptions:false,
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

handleShowoptions(){
    
    this.setState((prevState,props) =>({
        showoptions: !prevState.showoptions
    }))
}

    render(){

        const style = {
            underlineStyle: {
              color: darkBlack,
            },
          };

     

        return(
           <div id={this.props.id} 
                class={this.props.className + "-postit"}
                onDragStart={(e)=>this.handleOnDragStart(e)} 
                draggable="true"
                onMouseOver={(e)=>this.handleShowoptions(e)}
                onMouseOut={(e)=>this.handleShowoptions(e)}
                >
          
            <Card  
                className={this.props.className +"-postitcontent"}
            >
            
                    <CardHeader
                        title="Teste de paciencia"
                        subtitle="derryl is a bitch"
                        className={this.props.className +"-postitheader"}
                        actAsExpander={true}
                        showExpandableButton={true}
                />
               
                <CardText expandable={true}>
                 -more info
                </CardText>
                <CardActions expandable={true}>
                     <RaisedButton
                        primary={true}
                        className={this.props.className +"-postitedit"}
                        icon={
                            <SvgIcon>
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </SvgIcon>}
                    /> 
                    <RaisedButton
                        primary={true}
                        className={this.props.className +"-postitedit"}
                        icon={
                            <SvgIcon >
                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </SvgIcon>}
                    /> 
                     <RaisedButton
                        className={this.props.className +"-postitdelete"} 
                        secondary={true}
                         icon={
                          <SvgIcon>
                             <path d="M0 0h24v24H0V0z" fill="none"/>
                             <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                         </SvgIcon>}
                         onClick={(e)=>this.props.deletePostit(this.props.position -1)}
                     /> 
                     
                </CardActions>
            </Card>

         </div>
            
        );
    }

}

export default Postit;

