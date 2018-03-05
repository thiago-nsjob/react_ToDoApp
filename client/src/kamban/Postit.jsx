import React, { Component } from 'react';
import {Paper} from 'material-ui';
import "./Postit.css";
import postit from "./img/postit.svg"


class Card extends Component{
constructor(props){
    super(props);

    this.state={
        id: props.id,
        title: props.title,
        content: props.content,
        hasBlockingIssue: props.hasBlockingIssue,
        position:props.position,
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

    render(){
        const style = {
            margin: 5,
            textAlign: 'center',
            display: 'inline-block',
          };

        return(
           <div id={this.props.id} class="postit" onDragStart={(e)=>this.handleOnDragStart(e)} draggable="true">
            <img src={postit} alt="posit" class="postit" />
            </div>
        );
    }

}

export default Card;

