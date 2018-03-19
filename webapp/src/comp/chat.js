import React, { Component } from 'react';
import '../App.css';
import mySocket from 'socket.io-client';
import closeicon from '../assets/go-back.svg';

class App extends Component {
    //building a chat application
    
    constructor(props){
        super(props);
        
        this.state = {
            myname:"",
            mode:0,
            allnames:[],
            allmsgs:[],
            mymsg:""
        }
        
        this.joinChat = this.joinChat.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.goHome = this.goHome.bind(this);
    }
  
    componentDidMount(){
        //this.socket = mySocket("http://localhost:10001");
    }
    
    joinChat(){
        //emit: sends a message
        //socket is always a user
        
        this.setState({
            mode:1
        })
        this.socket = mySocket("https://chatsocketscamiria.herokuapp.com");
        this.socket.emit("uname", this.state.myname);
        this.socket.on("names", (data)=>{
            this.setState({
                allnames:data
            });
        });
        
        this.socket.on("msgs", (data)=>{
            this.setState({
                allmsgs:data
            })
        })
    }
    
    handleName(evt){
         this.setState({
             myname:evt.target.value
         })   
    }
    
    handleMyMsg(evt){
        this.setState({
            mymsg:evt.target.value
        })
    }
    
    sendMsg(){
        var msg = this.state.myname+": "+this.state.mymsg;
        this.socket.emit("sendmsg", msg);
    }
    
    goHome=()=>{
        this.props.changePage(0);
    }
    
    render() {
        var comp = null;
        
        if(this.state.mode === 0){
            comp = (
                <div className="joinchat">
                    <input className="input input-1" type = "text" placeholder="Type in your username" onChange={this.handleName} />
                    <button className="btn btn-3" onClick={this.joinChat}>Join Chat</button>
                </div>
            )  
        } else if(this.state.mode === 1){
            
            var allmsgs = this.state.allmsgs.map((obj, i)=>{
                return(
                    <div key={i}>
                        {obj}
                    </div>
                )
            })
            
            comp = (
                
                <div className="peopleonline">
                <h2>People who are online</h2>
                <hr/>
                    {allnames}
                </div>
                
                <div className="chatbox" id="chatBox">
                    <div id="chatDisplay">{allmsgs}</div>
                    <div id="sendmessageblock">
                        <input className="input input-1" type="text" placeholder="type your msg here" onChange={this.handleMyMsg} />
                        <button className="btn btn-3" onClick={this.sendMsg}>Send</button>
                    </div>
                </div>
            );
        }
        
        
        var allnames = this.state.allnames.map((obj, i)=>{
            return (
                <div className="namesonline" key={i}>
                    {obj}
                </div>
            )
        })
        
        return (
        <div className="container">
            
            <img src={closeicon} className="close" alt="go back" onClick={this.goHome}/>
            
            <div className="homeheader">
            <p className="heading1">CHAT</p>
            <p className="heading2">Insert your name to start</p>
            </div>
            
            <div className="chat">
            {comp}
            </div>
            
        </div>
        );
    }
}

export default App;
