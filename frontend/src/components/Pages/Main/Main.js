import React, { Component, createRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Router, useNavigate, UNSAFE_DataRouterStateContext } from "react-router-dom";
import "../Main/Main.scss"
import { whoami } from "../../Modules/api/whoami"

import avatar from "../../resource/avatar.png"


function MessagelistContent(){
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [isChatId, setChatId] = useState(null)
    useEffect(() => {
        fetch("/api/message/messages?id=1")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setIsLoading(false);
          });
      }, []);

      
    if (isLoading && isChatId != null) {
      return <div>Завантаження...</div>;
    } else if (!isLoading && isChatId != null) {
        console.log(data.result)
        const userList = data.result.map((item, index) => (
            <div className='chatWindow-content' id='myMessage' key={index}>
            <div className='senderAvatar'>
                <img src={avatar}></img>
            </div>
            <div className='chatMain-block'>
                <div className='messageData'>
            <p>{item.author}</p>
            <p>{item.time}</p>
            </div>
            <p>{item.text}</p>
            </div>
        </div>
          ));
      return <div>{userList}</div>;;
  }
}

function ChatlistContent(){
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    whoami(navigate)
    useEffect(() => {
        fetch("/api/message/chatList")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setIsLoading(false);
          });
      }, []);

      
    if (isLoading) {
      return <div>Завантаження...</div>;
    } else {
        const userList = data.result.map(item => (
            <div onClick={() => {}} className='chatList-content' key={item.chatid}>
                <img id='userAvatar' src={avatar}></img>
                <p id='userName'>{item.messages.author}</p>
                <p id='lastMessageTime'>{item.messages.time}</p>
                <p id='lastMessageText'>{item.messages.text}</p>
            </div>
          ));
      return <div>{userList}</div>;;
  }
}

class Main extends Component{
constructor(props) {
    super(props);
    this.inputMessageBox = createRef();
    this.sendMessage = this.sendMessage.bind(this);
    
  }
  sendMessage(){
    console.log(this.inputMessageBox.current.value);
    fetch('/api/message/sendMessage?id=1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: `${this.inputMessageBox.current.value}`,
           }),
    })
    .then(response => response.json())
  }

render (){
    return(
        <div className='main-container'>
            <div className='chatList-container'>
                <div className='chatList-listContainer'>
                    <ChatlistContent />
                    
                </div>
            </div>
            <div className='chatWindow-container'>
                <div className='chatWindow-body'>
                    <div className='chatWindow-messages'>
                    <MessagelistContent />
                    </div>
                    <div className='chatWindow-controlPanel'>
                    <div className='chatWindow-controlPanel_Container'>

                        <div className='chatWindow-controlPanel_InputBox'>
                            <input ref={this.inputMessageBox} id='InputMessageBox'></input>
                            </div>

                            <div className='chatWindow-controlPanel_ButtonBox'>
                            <button onClick={ this.sendMessage}>
                                send message
                                </button>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        )};
    }

export default Main;