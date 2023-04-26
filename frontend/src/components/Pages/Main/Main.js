import React, { useState, useEffect, useRef} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../Main/Main.scss";
import { whoami } from "../../Modules/api/whoami";

import avatar from "../../resource/avatar.png";


function MessagelistContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isChatId, setChatId] = useState(null);

  function setupChatId(newid) {
    setChatId(newid);
    setIsLoading(true);
  }
  window.setupChatId = setupChatId;
  window.isChatId = isChatId;
  window.whoamiResult = whoami(Navigate);


  const [whoamiData, setWhoamiData] = useState(null);

  useEffect(() => {
    const whoamiData = window.whoamiResult.then((data) => setWhoamiData(data));
  }, []);

  if (isLoading && isChatId != null) {
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
    const userList = data.result.map((item, index) => {
      const isMyMessage = item.author == whoamiData.id;
      const messageId = isMyMessage ? "myMessage" : "otherMessage";
      const isBotoom = data.result.lenght;
      return (
        <div className="chatWindow-content" id={messageId} key={index}>
          <div className="senderAvatar">
            <img src={avatar}></img>
          </div>
          <div className="chatMain-block">
            <div className="messageData">
              <p>{item.author}</p>
              <p>{item.time}</p>
            </div>
            <p>{item.text}</p>
          </div>
        </div>
      );
    });
    return <React.Fragment> {userList} </React.Fragment>;
  }
}

function Main() {
  const inputMessageBox = useRef();
  const chatlistContent = useRef();
  const chatWindowMessages = useRef();
  const navigate = useNavigate();
  window.navigate = navigate;
  function sendMessage() {
    fetch(`/api/message/sendMessage?id=${window.isChatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `${inputMessageBox.current.value}`,
      }),
    }).then((response) => response.json());
  }
  return (
    <div className="main-container">
      <div className="chatList-container" ref={chatlistContent}>
        <div className="chatList-controls"></div>
        <div className="chatList-listContainer">
          <ChatlistContent />
        </div>
      </div>
      <div className="chatWindow-container">
        <div className="chatWindow-body">
          <div className="chatWindow-messages" ref={chatWindowMessages}>
            <MessagelistContent referer={chatWindowMessages}/>
          </div>
          <div className="chatWindow-controlPanel">
            <div className="chatWindow-controlPanel_Container">
              <div className="chatWindow-controlPanel_InputBox">
                <input ref={inputMessageBox} id="InputMessageBox"></input>
              </div>

              <div className="chatWindow-controlPanel_ButtonBox">
                <button onClick={sendMessage}>send message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatlistContent() {
  const [isData, setData] = useState(null);
  let isLoading = useRef(false);
  
  let whoamiData = useRef(null);

  useEffect(() => {
    async function getWhoamiData(){ 
      whoamiData = await whoami(window.navigate)
    }
    
    async function fetchData() {
      await getWhoamiData();
      const response = await fetch(`/api/message/chatList?id=${whoamiData.id}`);
      const data = await response.json();
      setData({ data });
      isLoading.current = true;
    }
   
    fetchData();
  }, []);
  

  if (!isLoading.current) {
    return <div>Loading...</div>;
  } else {
    const userList = isData.data.result.map((item) => {
      const lastMessage = item.messages || {};
      return (
        <div
          onClick={() => {
            window.setupChatId(item.chatid);
          }}
          className="chatList-content"
          key={item.chatid}
        >
          <img id="userAvatar" src={avatar}></img>
          <p id="userName">{lastMessage.author || ""}</p>
          <p id="lastMessageTime">{lastMessage.time || ""}</p>
          <p id="lastMessageText">{lastMessage.text || ""}</p>
        </div>
      );
    });
    return <React.Fragment> {userList} </React.Fragment>;
  }
}

export default Main;
