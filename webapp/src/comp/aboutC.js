import React, { Component } from 'react';
import '../Camille.css';
import socialMedia from '../assets/socialMedia.png';
import Profile from '../assets/camilleProfile.png';
import Arrow from "../assets/arrow.png";


class AboutC extends Component {
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
        <img src={Profile} className="camProfile" />
        
        <img src={Arrow} className="arrow" onClick={this.goHome} />
          
      </div>
    );
  }
}

export default AboutC;
