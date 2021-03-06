import React, { Component } from 'react';
import '../App.css';
import mySocket from "socket.io-client";
import Rooms from "../comp/Rooms";
import goBack from '../assets/goBack.jpeg';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            myImg:require("../assets/octoSticker.png"),
            myImg2:require("../assets/fishSticker.png"),
            myImg3:require("../assets/shellSticker.png"),
            myImg4:require("../assets/shell2Sticker.png"),
            myImg5:require("../assets/reefSticker.png"),
            allusers:[],
            myId:null,
            showDisplay:false,
            stickers:[]
        }
        
        this.handleImage = this.handleImage.bind(this);
        this.handleDisplay = this.handleDisplay.bind(this);
        this.goHome = this.goHome.bind(this);
    }
    
    goHome=()=>{
        this.props.changePage(0);
    }
    
    componentDidMount(){
        
        this.socket = mySocket("https://stickersockets.herokuapp.com");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allusers:data
            }) 
        });
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            });
            
            this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            
                if(this.state.myId === null){
                    //FAIL
                    return false;
                }

                this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
                this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
                //this.refs."u"+this.state.myId.style

                this.socket.emit("mymove", {
                    x:ev.pageX,
                    y:ev.pageY,
                    id:this.state.myId,
                    src:this.refs["u"+this.state.myId].src
                })
            });
            
            this.refs.thedisplay.addEventListener("click", (ev)=>{
                this.socket.emit("stick", {
                    x:ev.pageX,
                    y:ev.pageY,
                    src:this.refs["u"+this.state.myId].src
                });
            });

        });

        this.socket.on("newsticker", (data)=>{
            this.setState({
                stickers:data
            });
        });
        
        this.socket.on("newmove", (data)=>{
            //console.log(data);
            this.refs["u"+data.id].style.left = data.x+"px";
            this.refs["u"+data.id].style.top = data.y+"px";
            this.refs["u"+data.id].src = data.src;
            
        });
        
        /*
        this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            
            if(this.state.myId === null){
                //FAIL
                return false;
            }
            
            this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
            this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
            //this.refs."u"+this.state.myId.style
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myId,
                src:this.refs["u"+this.state.myId].src
            })
        });
        */
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;
    }
    
    handleDisplay(roomString){
        this.setState({
            showDisplay:true
        });
        
        this.socket.emit("joinroom", roomString);
    }
    
    render() {
        
        var allimgs = this.state.allusers.map((obj, i)=>{
            return (
                <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i} />
            )    
        });
        
        var allstickers = this.state.stickers.map((obj, i)=>{
            var mstyle = {left:obj.x, top:obj.y};
            return (
                <img style={mstyle} key={i} src={obj.src} height={50} className="allImgs" />
            )
        })
        
        var comp = null;
        
        if(this.state.showDisplay === false){
            //Rooms
            comp = <Rooms 
                handleDisplay={this.handleDisplay}
            />;
        } else {
            //Display
            comp = (
                <div>
                    <div ref="thedisplay" id="display">
                        <div>
                            <img src={goBack} class="goBack" onClick={this.goHome} />
                        </div>
                        {allimgs}
                        {allstickers}
                    </div>
                    <div id="controls">
                        {this.state.myId}
                        <img src={this.state.myImg} height={50} onClick={this.handleImage} />
                        <img src={this.state.myImg2} height={50} onClick={this.handleImage} />
                        <img src={this.state.myImg3} height={50} onClick={this.handleImage} />
                        <img src={this.state.myImg4} height={50} onClick={this.handleImage} />
                        <img src={this.state.myImg5} height={50} onClick={this.handleImage} />
                    </div>
                </div>
            )
        }
        
        return (
            <div className="App">
                {comp}
            </div>
        );
    }
}

export default App;
