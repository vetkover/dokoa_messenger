import React, { Component, createRef, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Router, useNavigate, UNSAFE_DataRouterStateContext } from "react-router-dom";
import "../Main/Main.scss"
import { whoami } from "../../Modules/api/whoami"

import avatar from "../../resource/avatar.png"


function MessagelistContent(){
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [isChatId, setChatId] = useState(null)

    function setupChatId(newid){
        setChatId(newid);
        setIsLoading(true);
    }
    window.setupChatId = setupChatId;
    window.isChatId = isChatId;

    useEffect(() => {

      }, []);

    if(isLoading && isChatId != null){
        fetch(`/api/message/messages?id=${isChatId}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        });
    }  
    if (isChatId == null) {
      return <div>choose a chat</div>;
    } else if (!isLoading && isChatId != null) {
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
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    whoami(navigate)
    useEffect(() => {
        fetch("/api/message/chatList?id=1")
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setIsLoading(false);
          });
      }, []);

      
    if (isLoading) {
      return <div>Loading...</div>;
    } else {
const userList = data.result.map((item, index) => {
  const lastMessage = item.messages || {};
  return (
    <div onClick={() => {window.setupChatId(item.chatid)}} className='chatList-content' key={item.chatid}>
      <img id='userAvatar' src={avatar}></img>
      <p id='userName'>{lastMessage.author || ""}</p>
      <p id='lastMessageTime'>{lastMessage.time || ""}</p>
      <p id='lastMessageText'>{lastMessage.text || ""}</p>
    </div>
  );
});

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
    fetch(`/api/message/sendMessage?id=${window.isChatId}`, {
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