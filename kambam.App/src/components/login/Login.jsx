import React,{Component} from 'react';

import {TextField,Button,Paper,FormControl,InputLabel,Input,SvgIcon} from '@material-ui/core';
import {withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles/MuiThemeProvider';
import { purple,blue,yellow,grey, red, indigo, green,amber,lime,cyan  } from "@material-ui/core/colors";
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import './login.css'
import logoimg from '../../static/logo.svg'
import {rKbanLogo} from  '../common/applogo'
import { Redirect } from 'react-router-dom';



class Login extends Component{

    constructor(props){
        super(props)

    
        this.handleLoginError = this.handleLoginError.bind(this);
    }

    handleLoginError(err){

    }


    render(){
        let username = "";
        let password = "";       
        return(
            <AuthContextConsumer>
                {({isLogged,handleSignIn,getUserInfo})=>{
                            console.log(isLogged());
                            if (!isLogged())
                                return <div className="login-root" >
                                            <div className="kanbanlogo"> 
                                                 <img src={logoimg} className="kanbanlogo-img"/>
                                            </div>
                                            <Paper className="login-controls">
                                            
                                            <Paper className="login-controls-welcome">
                                                <span><br/>Credentials please!</span>
                                            </Paper>
                                            <div className="login-controls-fields">
                                                <TextField
                                                    inputRef={val=>username= val}
                                                    required
                                                    label="User Name"
                                                    className="login-root-username"
                                                    margin="normal"
                                                    
                                                />

                                                <TextField
                                                    inputRef={val=>password = val}
                                                    required
                                                    label="Password"
                                                    className="login-controls-password"
                                                    type="password"
                                                    margin="normal"
                                                    
                                                />
                                            </div>
                                            
                                        
                                                    <div className="login-controls-actions"> 
                                                        <Button variant="raised"
                                                                className="login-controls-actions-signin"
                                                                onClick={(e)=>handleSignIn(username.value,password.value).then(this.forceUpdate()).catch((err)=>this.handleLoginError(err))}
                                                        > 
                                                            Sign In 
                                                        </Button>
                                                        <Button 
                                                            variant="raised" 
                                                            className="login-controls-actions-signup"
                                                            onClick={(e)=>this.props.history.push('/')}
                                                        > 
                                                            Sign Up 
                                                        </Button>
                                                    </div>
                                                </Paper> 
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