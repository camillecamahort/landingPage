import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import '../App.css';
import trivia from '../assets/trivia.svg';
import goBack from '../assets/goBack.jpeg';


class Trivia extends Component {
    constructor(props){
        super(props);  
        
        this.state = {
            screen:0,
            host:null,
            qobj:{q:null, o1:null, o2:null}
        }
        
        this.goHome = this.goHome.bind(this);
    }
    
    goHome=()=>{
        this.props.changePage(0);
    }
    
    componentDidMount(){
        this.socket = mySocket("https://triviasockets.herokuapp.com");
        
        this.socket.on("newq", (data)=>{
            this.setState({
                qobj:data
            })
        });
        
        this.socket.on("result", (data)=>{
            alert(data);
        })
    }
    
    //anonymous function: takes out imp. things in function for the sake of convenience and speed-no need to bind
    
    handleRoom=(roomStr)=>{
        this.setState({
            screen:1
        });
        
        this.socket.emit("joinroom", roomStr);
    };
    
    //argument to know if host or not
    handleHost=(isHost)=>{
        this.setState({
            screen:2,
            host:isHost
        })
    }
    
    handleQ=()=>{
        var obj = {
            q:this.refs.q.value,
            o1:this.refs.o1.value,
            o2:this.refs.o2.value,
            a:this.refs.a.value
        };
        
        this.socket.emit("qsubmit", obj);
    }
    
    handleA=(optionNum)=>{
       this.socket.emit("answer", optionNum); 
    }
    
    render(){
        
        var comp = null;
        
        if(this.state.screen === 0){
            comp = (
                <div class="container">
                    <img src={goBack} class="goBack" onClick={this.goHome} />
                    <div>
                    <img class="triviaHeading" src={trivia} />
                    <br /><br /><br /> 
                    <button class="btn btn-2" onClick={this.handleRoom.bind(this, "room1")}>Room 1</button>
                    <button class="btn btn-2" onClick={this.handleRoom.bind(this, "room2")}>Room 2</button>
                    </div>
                </div>
            )
        } else if(this.state.screen === 1){
            comp = (
                <div class="container">
                     <img src={goBack} class="goBack" onClick={this.goHome} />
                    <div>
                    <img class="triviaHeading" src={trivia} />
                    <br />
                    <button class="btn btn-2" onClick={this.handleHost.bind(this, true)}>Host</button>
                    <button class="btn btn-2" onClick={this.handleHost.bind(this, false)}>Player</button>
                    </div>
                </div>
            )
        } else if (this.state.screen === 2){
            if(this.state.host === true){
                comp=(
                    <div>
                        <div class="hostQ">
                        <img class="triviaHeading2" src={trivia} />
                        <br />
                        <div class="container-2">
                        <input class="inputField" ref="q" type="text" placeholder="Ask a question" />
                        <input ref="o1" type="text" placeholder="Option 1" />
                        <input ref="o2" type="text" placeholder="Option 2" />
                        <select ref="a">
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                        </select>
                    </div>
                    <br />
                    <button class="btn btn-2 submit" onClick={this.handleQ}>Submit the Q</button>
                    </div>
                </div>
                )
            } else if (this.state.host === false){
                comp = (
                    <div>
                        <div class="playerQ">
                        <img class="triviaHeading2" src={trivia} />
                        <br />
                        <div class="container-2">
                        <div class="question">{this.state.qobj.q}</div>
                     </div>
                        <br />
                        <button class="btn btn-4 options" onClick={this.handleA.bind(this, "1")}>{this.state.qobj.o1}</button>
                        <br />
                        <button class="btn btn-4 options" onClick={this.handleA.bind(this, "2")}>{this.state.qobj.o2}
                        </button>
                        </div>
                    </div>
                )
            }
        }
        
        return(
            <div>
                {comp}
            </div>
        )
    }
    
}
export default Trivia;
