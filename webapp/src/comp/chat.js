import React, { Component } from 'react';
import '../App.css';
import mySocket from 'socket.io-client';

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
        this.socket = mySocket("http://localhost:10001");
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
    
    render() {
        var comp = null;
        
        if(this.state.mode === 0){
            comp = (
                <div>
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
                <div className="container">
                <div className="chatbox" id="chatBox">
                    <div id="chatDisplay">{allmsgs}</div>
                    <div id="controls">
                        <input className="input input-1" type="text" placeholder="type your msg here" onChange={this.handleMyMsg} />
                        <button className="btn btn-3" onClick={this.sendMsg}>Send</button>
                    </div>
                </div>
                </div>
            );
        }
        
        
        var allnames = this.state.allnames.map((obj, i)=>{
            return (
                <div key={i}>
                    {obj}
                </div>
            )
        })
        
        return (
        <div className="container">
          <div className="chatbox">
            <div className="close">X</div>
            <div className="chat">
            <h2>WELCOME TO OUR CHAT</h2>
            {comp}
            </div>
            <div className="peopleonline">
                <h2>People who are online</h2>
            <hr/>
                {allnames}
            </div>
            </div>
        </div>
        );
    }
}

export default App;
