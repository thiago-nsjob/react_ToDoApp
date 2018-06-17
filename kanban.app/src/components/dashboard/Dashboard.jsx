
import React, {Component} from 'react';
import {Card,CardMedia,Typography,CardActions,Button,CardContent,TextField} from '@material-ui/core';
import ContentAdd from '@material-ui/icons/Add';
import ImageEdit from '@material-ui/icons/Edit';

import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import Project from '../project/Project';

import './dashboard.css';
import newProjectLogo from  '../../static/trianglify.png';

class Dashboard extends Component{
    constructor(props){
        super(props)

        this.state= {
            isEditTitleHidden: true,
            isEditDescriptionHidden: true,
            projectList:[]
        }

        this.handleNewProject=this.handleNewProject.bind(this);
    }

    componentDidMount() {
        //TODO: get all the projects id and gather the additional information on the back end
        //TODO: incorporate trianglify on the project 
    }

    hanldeManageProject(e){
        console.log(e);
        this.props.history.push(`/project/${e}`)
    }

    handleTitleClick(){
         this.setState(
            (prevState,props)=>({
                isEditTitleHidden : !prevState.isEditTitleHidden,
        })); 
    }
    
    
    handleNewProject(){
        let tmpList = this.state.projectList.slice(0);
        tmpList.push({projectTitle:"New Project",
                    projectDescription:"Add description here"})
        this.setState({
            projectList:tmpList
        })

    }

    handleDescriptionClick(){
        this.setState(
           (prevState,props)=>({
            isEditDescriptionHidden : !prevState.isEditDescriptionHidden,
       })); 
   }  

   handleFinishChange(e){
    if (e.key === "Enter" || e.key == undefined ){
        this.setState((prevState,props) =>({
            isEditDescriptionHidden: true,
            isEditTitleHidden:true
        }))
    }
   } 

   handleProjectChange(property,event,index){

    let tmpPrjList = this.state.projectList.slice(0);

    Reflect.set(tmpPrjList[index], property, event.target.value);

    this.setState({
            projectList:tmpPrjList
        })
   }

    render(){
        return (
                <div className="dashboard-root">
         
                    {this.state.projectList.map((project,index)=>
                        <div className="dashboard-project" key= {index}>

                            <Card className="dashboard-project-card">
                                <CardMedia
                                    className="dashboard-project-card-img"
                                    image={newProjectLogo}
                                    title={project.projectTitle}
                                />
                                <CardContent>
                                <Typography 
                                    className={`dashboard-project-labelTitle ${"hidden" + !this.state.isEditTitleHidden}`}
                                    gutterBottom variant="headline" 
                                    component="h2" 
                                    onClick={(e)=>this.handleTitleClick(e)}
                                    multiline>
                                    {project.projectTitle}
                                    
                                </Typography>
                                <TextField
                                    label="Project Name"
                                    className={`dashboard-project-editTitle ${"hidden" + this.state.isEditTitleHidden}`}
                                    onKeyPress={(e)=>this.handleFinishChange(e)}
                                    onChange={(e)=>this.handleProjectChange("projectTitle",e,index)}
                                    defaultValue ={project.projectTitle}
                                    multiline
                                /> 

                                <Typography
                                    className={`dashboard-project-labelTitle ${"hidden" + !this.state.isEditDescriptionHidden}`} 
                                    component="p" 
                                    onClick={(e)=>this.handleDescriptionClick(e)}
                                    multiline>
                                    {project.projectDescription}
                                </Typography>
                                <TextField
                                    label="Project Description"
                                    className={`dashboard-project-editDescription ${"hidden" + this.state.isEditDescriptionHidden}`}
                                    onKeyPress={(e)=>this.handleFinishChange(e)}
                                    onChange={(e)=>this.handleProjectChange("projectDescription",e,index)}
                                    multiline
                                    defaultValue ={project.projectDescription}
                                /> 

                                </CardContent>
                                <CardActions>
                                <Button mini={true}  
                                        variant="fab" className="dashboard-project-card-managebutton"
                                        onClick={(e)=>this.hanldeManageProject(index)}
                                >
                                <ImageEdit/>
                                </Button>
                                
                                </CardActions>
                            </Card>
                            
                        </div>
                    
                    
                
                )}
                 <Button
                    
                    className="dashboad-newproject"
                    onClick={(e)=>this.handleNewProject(e)} 
                    variant="fab" color="primary">
                    <ContentAdd/>
                </Button>
                </div>
        )
    }
}

export default Dashboard;
