import React,{Component} from "react";
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import {TextField,Button,Paper,Divider,Avatar} from '@material-ui/core';

import ImageIcon from '@material-ui/icons/Image';

import * as Validator from '../common/common'
import * as Actions  from '../container/actions/signupActions'
import './signUp.css'
import logoimg from '../../static/logo.svg'

class SignUp extends Component{
    constructor(props){
        super(props)

        this.fileInput = React.createRef();
        
    }

    showfile(){
        this.fileInput.current.onClick();
    }

    render(){
        
        return(
            <div className="signup-root">
               
                <div className="row">
                        <div className="signup-kanbanlogo"> 
                                <img src={logoimg} className="kanbanlogo-img"/>
                            </div> 
                    <Paper className="signup-controls">
                        <div className="row">
                            <div className="signup-controls-fields">
                                <TextField
                                    required
                                    label="User Name"
                                    className="signup-controls-username"
                                    margin="normal"
                                    inputProps={{ pattern: Validator.usernameValidationPattern  }}
                                    onChange={(e)=>this.props.actions.changeUserInfo(e.target.value,"name")} 
                                />
                                <TextField
                                    required
                                    label="Passord"
                                    className="signup-controls-password"
                                    margin="normal"
                                    inputProps={{ pattern: Validator.passwordValidationPattern  }}
                                    onChange={(e)=>this.props.actions.changeUserInfo(e.target.value,"password")}

                                />
                                <TextField
                                    required
                                    label="Confirm password"
                                    className="signup-controls-password"
                                    margin="normal"
                                    inputProps={{ pattern: Validator.passwordValidationPattern  }}
                                    onChange={(e)=>this.props.actions.changeUserInfo(e.target.value,"confirmPassword")}
                                />
                                <Divider className="divider"/>
                                <div  className="signup-controls-avatar">
                                    <Avatar
                                        alt="Thiago Silva"
                                        src="https://media.licdn.com/dms/image/C5603AQFq7AGnVzHR6A/profile-displayphoto-shrink_200_200/0?e=1533772800&v=beta&t=S6POQIPosT0Ht93QwLjl0O5B9TrInKmlFlt4wuPSYX8"
                                    
                                    />
                                </div>
                                {/* <Button variant="raised"
                                            className="signup-controls-avatarbutton"
                                            type="file"
                                            onClick={(e)=>this.showfile()}
                                            > 
                                            <input ref={this.fileInput} style={{diplay:'none'}} type="file" id="imageButton"  accept="image/png, image/jpeg,image/gif"></input>
                                <ImageIcon/>
                                </Button> */}
                                <input
                                        accept="image/*"
                                        className="hidden"
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                    />
                                <label htmlFor="raised-button-file" className="signup-controls-avatarbutton">
                                        <Button variant="raised" component="span" >
                                            <ImageIcon/>
                                        </Button>
                                </label>
                                <Divider className="divider"/>
                            </div> 
                            <div className="signup-controls-actions">
                                <Button variant="raised"
                                            className="signup-controls-actions-signup"
                                            type="button"
                                            onClick={(e)=>this.props.actions.signUp()}> 
                                    Sign Up 
                                </Button>
                            </div> 
                        </div> 
                    </Paper>
                </div>
        </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
            user:state.signUp
    }

}


const mapDispatchToProps = (dispatch)=>{
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);

