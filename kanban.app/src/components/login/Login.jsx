import React,{Component} from 'react';

import {TextField,Button,Paper,FormControl,InputLabel,Input,SvgIcon,Snackbar} from '@material-ui/core';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles/MuiThemeProvider';
import { purple,blue,yellow,grey, red, indigo, green,amber,lime,cyan  } from "@material-ui/core/colors";
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';
import * as Validator from '../common/common';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import './login.css'
import logoimg from '../../static/logo.svg'

import { Redirect } from 'react-router-dom';



class Login extends Component{

    constructor(props){
        super(props)

        this.state={
            showErrorMsg:false,
            errorMsg:""
        }
    
        this.handleLoginError = this.handleLoginError.bind(this);
    }


    handleLoginError(err){
        this.setState((prevState,props)=>({
            showErrorMsg:!prevState.showErrorMsg,
            errorMsg:err
        }))
    }

    handleCloseSnackBar(){
        this.setState((prevState,props)=>({
            showErrorMsg:!prevState.showErrorMsg,
        }))
    }

    handleSubmit(e,username,password,signInMethod){

        signInMethod(username,password)
            .then(this.forceUpdate()).then(console.log("okdok"))
            .catch((err)=>this.handleLoginError(err))
    }

    render(){
        let username = "";
        let password = "";       
        return(
            <AuthContextConsumer>
                {({isLogged,handleSignIn,getUserInfo})=>{
                           
                            if (!isLogged())
                                return <div className="login-root" >
                                            <div className="rowlogo">
                                                <div className="kanbanlogo"> 
                                                    <img src={logoimg} className="kanbanlogo-img"/>
                                                </div>

                                                <div className="rowcontrols">
                                                    <Paper className="login-controls">
                                                    
                                                        <Paper className="login-controls-welcome">
                                                            <span><br/>Credentials please!</span>
                                                        </Paper>
                                                        <form onSubmit={(e)=>this.handleSubmit(e,username.value,password.value,handleSignIn)}>
                                                                <div className="login-controls-fields">
                                                                    
                                                                        <TextField
                                                                            inputRef={val=>username= val}
                                                                            required
                                                                            label="User Name"
                                                                            className="login-controls-username"
                                                                            margin="normal"
                                                                            inputProps={{ pattern: Validator.usernameValidationPattern  }}
                                                                        />

                                                                        <TextField
                                                                            inputRef={val=>password = val}
                                                                            required
                                                                            label="Password"
                                                                            className="login-controls-password"
                                                                            type="password"
                                                                            margin="normal"
                                                                            inputProps={{ pattern: Validator.passwordValidationPattern }}
                                                                        />
                                                                
                                                                </div>
                                                                <div className="login-controls-actions"> 
                                                                    <Button variant="raised"
                                                                            className="login-controls-actions-signin"
                                                                            type="submit"
                                                                            value="Submit"
                                                                    > 
                                                                        Sign In 
                                                                    </Button>
                                                                    <Button 
                                                                        variant="raised" 
                                                                        className="login-controls-actions-signup"
                                                                        onClick={(e)=>this.props.history.push('/signup')}
                                                                    > 
                                                                        Sign Up 
                                                                    </Button>
                                                                    
                                                                </div>
                                                            </form>
                                                    </Paper> 
                                                        <div className="snackMessage" >
                                                            <Snackbar
                                                                    onClose={(e)=>this.handleCloseSnackBar(e)}
                                                                    autoHideDuration={30000}
                                                                    open={this.state.showErrorMsg}
                                                                    message={this.state.errorMsg}    
                                                                    action={
                                                                        <Button
                                                                            size="small" 
                                                                            variant="outlined"
                                                                            onClick={(e)=>this.handleCloseSnackBar(e)}>
                                                                                Ok
                                                                        </Button> 
                                                                    }
                                                                />
                                                        </div>
                                           
                                                </div>

                                            </div>
                                        </div>
                                       
                                            
                           else 
                              return <Dialog
                                            title={"Hey there!"}
                                            modal="true"
                                            open={true}
                                            aria-labelledby="form-dialog-title"
                                    >
                                    <DialogTitle id="form-dialog-title">{`Welcome back ${getUserInfo()} !`}
                                    </DialogTitle>
                                    <DialogActions>
                                                    <Button onClick={(e)=>this.props.history.push("/")} color="primary">
                                                        OK
                                                    </Button>
                                                </DialogActions>
                                    </Dialog>
          
                }}
            </AuthContextConsumer>
        );
 }
}
export default Login;