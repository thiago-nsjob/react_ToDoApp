import React, { Component } from 'react';
import {Paper,SvgIcon,FlatButton,TextField,Dialog,Divider,FloatingActionButton} from '@material-ui/core';
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
        
        newArr.push({title:"newPostit",content:"----",hasBlockingIssue:false});

        this.setState((prevState,props) =>({
            lstPostit: newArr
        }))
    }



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
             <TextField
                hintText="title text"
                className={this.props.className+"-hidden" + this.state.isEditTitleHidden + " "  + this.props.className + "-textField "}
                onChange={(e)=>this.handleTitleChange(e)}
                onKeyPress={(e)=>this.handleTitleFinishChange(e)}
                value={this.state.baytitle}
            /> 
            <FloatingActionButton
                mini={true}
                onClick={(e)=>this.handleEditTitleClick(e)}
                className={this.props.className + "-editpostit " }
            >
            <ImageEdit/></FloatingActionButton>
            <FloatingActionButton
                 mini={true} 
                 onClick={(e)=>this.handleAddPostIt(e)}
                 className={this.props.className + "-addpostit " }
            >
            <ContentAdd/>
            </FloatingActionButton>
            <FloatingActionButton
                mini={true}
                onClick={(e)=>this.handleDeleteBay(e)}
                className={this.props.className + "-deletepostit " }  
           
            >
            <ActionDelete/>
            </FloatingActionButton>
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
                            className={this.props.className}
                            title={postit.title} 
                            content={postit.content} 
                            hasBlockingIssue={postit.hasBlockingIssue} 
                            position={index} 
                            sourcebay={this.props.bayId} 
                            setLeavingPostit={this.handleChildPostitDragStart}
                            deletePostit={this.handleDeletePostit} />
              )}
              </div>
            </Paper>
             );
    }
}
export default Bay;