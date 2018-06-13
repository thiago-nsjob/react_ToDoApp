import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {AppBar,Toolbar,IconButton,Typography,Button,SvgIcon} from '@material-ui/core'
import {AuthContext,AuthContextConsumer} from '../login/AuthContext';
import {} from '@material-ui/icons'

import './header.css';
import logoimg from '../../static/logo.svg'

class Header extends Component{
constructor(props){
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this);
}

handleSignOut(){
    console.log(this.props);
    this.props.history.push("/login");
    
}


render(){
    return(
        <AuthContextConsumer>
            { ({getUserInfo,handleSignOut}) =>{ 
            
                      return  <header className="header-root">
                        <AppBar position="static" className="header-appbar">
                           
                            <Toolbar>
                            <div className="header-appbar-logo">
                                <img src={logoimg} className="header-appbar-logo-img"/>
                            </div>
                                <Typography variant="title" color="inherit" className="header-appbar-title">
                                    {getUserInfo()}
                                </Typography>

                                    <Button
                                        variant="fab" 
                                        className="header-appbar-logout"
                                        onClick={(e)=>handleSignOut().then(this.handleSignOut())}
                                    >
                                    <SvgIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z"/></svg> 
                                    </SvgIcon>
                                </Button>
                            </Toolbar>
                        </AppBar>
                    </header>
                    }
            }
         </AuthContextConsumer>
    )
} 
}


export default Header