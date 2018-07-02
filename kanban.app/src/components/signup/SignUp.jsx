import React,{Component} from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {TextField,Button,Paper,Divider,Avatar,Snackbar,Dialog,DialogTitle,DialogActions,Tooltip} from '@material-ui/core';


import ImageIcon from '@material-ui/icons/Image';
import ErrorIcon from '@material-ui/icons/Error';

import * as Helper from '../common/common';
import * as Actions  from '../container/actions/actions';
import './signUp.css'
import logoimg from '../../static/logo.svg'
import defaultProfileImg from '../../static/smiling.svg'


class SignUp extends Component{
    constructor(props){
        super(props)
        this.fileInput = React.createRef();

        this.photo = React.createRef();
        this.state = {
            currentPhoto:defaultProfileImg,
            isNameValid:true,
            isUserNameValid:true,
            isPasswordValid:true,
            isPasswordConfirmationValid:true,
            showSuccess:false
        }
        this.validForm = this.validForm.bind(this);
    }

    validForm(){
       return ( this.state.isNameValid &&
                this.state.isUserNameValid && 
                this.state.isPasswordValid && 
                this.state.isPasswordConfirmationValid)
    }

    validateField(prop){
        this.setState(prop);
    }

    handleSubmit(e){
        e.preventDefault();

        //If everything is cool, call the signup api
        if(this.validForm()){
            //to API call to add user
            //go back to login
            this.props.actions.signUp();

            if(!this.props.user.userId){
              
                    this.props.actions.setError("Some fields have invalida information. Please review the infomation provided.");
                    this.props.actions.showError();
            }   
        
        }
        
    }
    loadThumb(){
        
        let photo = this.photo.current.files[0]
        let reader  = new FileReader();
        let component = this;

        reader.onloadend = ()=> {
            console.log("done");
            component.setState(
                {
                    currentPhoto:reader.result
                }
            )
        }
        reader.readAsDataURL(photo);
    }
    handleCloseSnackBar(){
       this.props.actions.showError();
    }

   buildSignup(){
       return <div className="signup-root">
                       <form >
                           <div className="row">
                                   <div className="signup-kanbanlogo"> 
                                           <img src={logoimg} className="signup-kanbanlogo-img"/>
                                       </div> 
                               <Paper className="signup-controls">
                              
                                   <div className="row">
                                       <div className="signup-controls-fields">
                                            <Tooltip title="Name must have at least 6 characters"  placement="left-start">
                                                    <TextField
                                                            required
                                                            label="Name"
                                                            className="signup-controls-username"
                                                            margin="normal"        
                                                            inputProps={{ pattern: Helper.usernameValidationPattern  }}
                                                            onChange={(e)=>{
                                                                            this.props.actions.changeUserInfo(e.target.value,"name");
                                                                            this.validateField({"isNameValid":e.target.checkValidity()})
                                                                            }
                                                                    }

                                                    />
                                            </Tooltip>
                                            <span className={`displayError-${!this.state.isNameValid}`}><ErrorIcon/> </span>
                                                
                                            <Tooltip title="User Name must have at least 6 characters"  placement="left-start">
                                                <TextField
                                                        required
                                                        label="User Name"
                                                        className="signup-controls-username"
                                                        margin="normal"        
                                                        inputProps={{ pattern: Helper.usernameValidationPattern  }}
                                                        onChange={(e)=>{
                                                                        this.props.actions.changeUserInfo(e.target.value,"userName");
                                                                        this.validateField({"isUserNameValid":e.target.checkValidity()})
                                                                        }
                                                                }
                                                />
                                           </Tooltip>
                                            <span className={`displayError-${!this.state.isUserNameValid}`}><ErrorIcon/> </span>
                                            
                                           <Tooltip title="Password must have at least 1 upper case, 1 lower case, 1 numerical and 1 special character"  placement="left-start">                                                                
                                                <TextField
                                                required
                                                type="password"
                                                label="Passord"
                                                className="signup-controls-password"
                                                margin="normal"
                                                inputProps={{ pattern: Helper.passwordValidationPattern  }}
                                                
                                                onChange={(e)=>{this.props.actions.changeUserInfo(e.target.value,"password")
                                                                this.validateField({"isPasswordValid":e.target.checkValidity()})
                                                }}
                                            />
                                            </Tooltip>
                                            <span className={`displayError-${!this.state.isPasswordValid}`}><ErrorIcon/> </span>
                                           <TextField
                                               required
                                               type="password"
                                               label="Confirm password"
                                               className="signup-controls-password"
                                               margin="normal"
                                               inputProps={{ pattern: Helper.passwordValidationPattern  }}
                                               
                                               onChange={(e)=>{this.props.actions.changeUserInfo(e.target.value,"confirmPassword")
                                                             this.validateField({"isPasswordConfirmationValid":e.target.checkValidity()})
                                               }}
                                           />
                                            <span className={`displayError-${!this.state.isPasswordConfirmationValid}`}><ErrorIcon/> </span>
                                         
                                           <Divider className="divider"/>
                                           <div  className="signup-controls-avatar">
                                               <Avatar
                                                   ref={this.currentPhoto}
                                                   alt="Thiago Silva"
                                                   src={this.state.currentPhoto}
                                               />
                                           </div>
                                           <input
                                                   ref={this.photo}
                                                   accept="image/*"
                                                   className="hidden"
                                                   id="raised-button-file"
                                                   type="file"
                                                   onChange={(e)=>this.loadThumb(e.target.value)}
                                               />
                                           <label htmlFor="raised-button-file" className="signup-controls-avatarbutton">
                                                   <Button variant="raised" component="span"  >
                                                       <ImageIcon />
                                                   </Button>
                                           </label>
                                           <Divider className="divider"/>
                                       </div> 
                                       <div className="signup-controls-actions">
                                           <Button variant="raised"
                                                       className="signup-controls-actions-signup"
                                                       type="submit"
                                                       value="Submit" 
                                                       onClick={(e)=>this.handleSubmit(e)}> 
                                               Sign Up 
                                           </Button>
                                       </div> 
                                   </div> 
                               </Paper>

                                
                           </div>
                       </form>
                      
                                <div className="snackMessage" >
                                    <Snackbar
                                            autoHideDuration={100000}
                                            open={this.props.user.showError}
                                            message={this.props.user.errorMsg}    
                                            action={
                                                <Button
                                                    className="signup-snackbar-okbutton"
                                                    size="small" 
                                                    variant="outlined"
                                                    onClick={(e)=>this.handleCloseSnackBar(e)}>
                                                        Ok
                                                </Button> 
                                            }
                                        />
                                </div>
               </div>
   }
    render(){
            if(!this.props.user.userId)
                return this.buildSignup();
            else
                return<Dialog
                                title={`All good! `}
                                modal="true"
                                open={true}
                                aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">{`Thanks for signing up ${this.props.user.name} !`}
                        </DialogTitle>
                        <DialogActions>
                                        <Button onClick={(e)=>this.props.history.push("/login")} color="primary">
                                            OK
                                        </Button>
                                    </DialogActions>
                        </Dialog>
      
    }
}

const mapStateToProps = (state) => {
    return{
            user:state.userSession
    }

}

const mapDispatchToProps = (dispatch)=>{
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);

