import React, { Component } from 'react';
import logo from '../assets/logo2.png';
import goCamille from '../assets/camilleLayers.png';
import goMiria from '../assets/miriaLayers.png';
import '../App.css';

class Home extends Component {
    constructor(props){
        super(props);
        
       this.changeCamille = this.changeCamille.bind(this);
       this.changeMiria = this.changeMiria.bind(this);
        this.chatting = this.chatting.bind(this);
    }
    
    changeCamille=()=>{
        this.props.changePage(1);
    }
    
    changeMiria=()=>{
        this.props.changePage(2);
    }
    
    chatting(){
        this.props.changePage(3);
    }
    
    /*
     changeMiria=()=>{
        this.props.changePage(2);
    }
    */
    
    
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <br /><br /><br />      
        <img src={goCamille} className="goCamille" alt="go" onClick={this.changeCamille}/>
        <img src={goMiria} className="goMiria" alt="go" onClick={this.changeMiria}/>
        <button id="chat" onClick={this.chatting}>Start Chatting!</button>
        
      </div>
    );
  }
}

export default Home;
