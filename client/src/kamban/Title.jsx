import React, { Component } from 'react';

class Title extends Component{
    render(){
        return(
            <div className={this.props.className+"-bayTitle"}>
                {this.props.title}
            </div>
             );
    }
}
export default Title;