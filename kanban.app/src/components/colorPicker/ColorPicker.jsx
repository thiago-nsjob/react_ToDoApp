import React, { Component } from 'react';

import  './ColorPicker.css'
import { purple,blue,yellow,grey, red, indigo, green,amber,lime,cyan  } from "@material-ui/core/colors";

class ColorPicker extends React.Component{
  
    constructor(props) {
      super(props);
          this.state ={
        colorlist:[green,lime,grey,yellow,amber,red,purple,indigo,blue,cyan]
      }
    }
    
 

    render(){
      const hue = 200;
      return(
        <div className="color-picker-root"> {
          this.state.colorlist.map((item,index) => 
                <div className={"color-picker"} key={index}>
                  <input type="radio" name="color" checked ={this.props.currentColor == item[hue] ? "checked":null } id={item[hue]} onClick={(e)=>this.props.setColor(item[hue])}/>
                  <label htmlFor={item[hue]}><div className="fill" style={{"background":item[hue]}}></div></label>
                </div>                   
              )
          }
          </div>
      );
    }
  }
  

  export default ColorPicker;