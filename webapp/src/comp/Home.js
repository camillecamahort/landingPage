import React, { Component } from 'react';
import leftmermaid from '../assets/mermaidleft.svg';
import chaticon from '../assets/chat-icon.svg';
import tiviaicon from '../assets/trivia-icon.svg';
import chessicon from '../assets/chess-icon.svg';
import stickersicon from '../assets/stickers-icon.svg';
import goCamille from '../assets/camilleLayers.png';
import goMiria from '../assets/miriaLayers.png';
import '../App.css';

class Home extends Component {
    constructor(props){
        super(props);
        
        this.changeCamille = this.changeCamille.bind(this);
        this.changeMiria = this.changeMiria.bind(this);
        this.chatting = this.chatting.bind(this);
        this.changeStickers = this.changeStickers.bind(this);
        this.changeChess = this.changeChess.bind(this);
        this.changeTrivia = this.changeTrivia.bind(this);
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

    changeStickers(){
        this.props.changePage(4);
    }

    changeChess=()=>{
        this.props.changePage(5);
    }
    
    changeTrivia=()=>{
        this.props.changePage(6);
    }
    
    /*
     changeMiria=()=>{
        this.props.changePage(2);
    }
    */
    
    
  render() {
    return (
    <div className="container">
    <div className="mermaidleft"><img src={leftmermaid} alt="logo"/></div>
    <div className="mermaidright"><img src={leftmermaid} alt="logo"/></div>
      <div className="App">
        <div className="homeheader">
        <p className="heading1">MERMAIDS CAVE</p>
        <p className="heading2">Digital essentials for the modern mermaid</p>
        </div>
        <br /><br /><br />     
        <div className="navitems">
        <img src={chaticon} className="ico-home" alt="go" onClick={this.chatting}/>
        <img src={stickersicon} className="ico-home" alt="go" onClick={this.changeStickers}/>
        <img src={tiviaicon} className="ico-home" alt="go" onClick={this.changeTrivia}/>
        <img src={chessicon} className="ico-home" alt="go" onClick={this.changeCamille}/>
        </div>
        <div className="bottom-items"><button id="camille" className="btn btn-2" onClick={this.changeCamille}>About Camille</button>
        <button id="miria" className="btn btn-2" onClick={this.changeMiria}>About Miria</button></div>
        </div>
      </div>
    );
  }
}

export default Home;
