import React, { Component } from 'react';
import '../Miria.css';
import socialMedia from '../assets/socialMedia.png';
import Profile from '../assets/miriaProfile.png';
import Arrow from "../assets/arrow.png";


class AboutM extends Component {
    constructor(props){
        super(props);
        
        this.goHome = this.goHome.bind(this);
    }
    
     goHome=()=>{
        this.props.changePage(0);
    }
    
  render() {
    return (
      <div className="App">
        <img src={socialMedia} className="socialMedia" />
        
        <img src={Profile} className="miriaProfile" />
        <img src={Arrow} className="arrow" onClick={this.goHome} />
          
      </div>
    );
  }
}

export default AboutM;
