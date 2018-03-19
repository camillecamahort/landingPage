import React, { Component } from 'react';
import logo from './assets/Logo.svg';
import goBtn from './assets/Go.svg';
import './App.css';
import Home from './comp/Home.js';
import AboutC from './comp/aboutC.js';
import AboutM from './comp/aboutM.js';
import Chat from './comp/chat.js';
import Stickers from './comp/stickers.js';
//import Chess from './comp/chess.js';
import Trivia from './comp/trivia.js';
// import mySocket from 'socket.io';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            page:0
        }

        this.changePage = this.changePage.bind(this);

    }

    changePage(num){
        console.log("see");

        this.setState({
            page:num
        });
    }



  render() {
      var page = null;

      if(this.state.page === 0){
          page = (
              <Home changePage = {this.changePage}/>
          )
      } else if (this.state.page === 1){
          page = (
              <AboutC changePage = {this.changePage}/>
          )
      } else if (this.state.page === 2){
              page = (
                  <AboutM changePage = {this.changePage} />
              )
      } else if (this.state.page === 3){
          page = (
              <Chat changePage = {this.changePage} />
          )
      } else if (this.state.page === 4){
          page = (
              <Stickers changePage = {this.changePage} />
          )
//      }  else if (this.state.page === 5){
//          page = (
//              <Chess changePage = {this.changePage} />
//          )
//      } 
      } else if (this.state.page === 6){
          page =(
              <Trivia changePage = {this.changePage} />
          )
      }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;
