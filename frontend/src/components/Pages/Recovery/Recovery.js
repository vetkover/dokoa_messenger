import React, { Component, createRef, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Router,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { whoami } from "../../Modules/api/whoami";

import "../Recovery/Recovery.scss";
import logo from "../../resource/logo.png";
import eye_open from "../Auth/resource/eye_open.svg";
import eye_close from "../Auth/resource/eye_close.svg";
import { ReactComponent as FileIco } from "../Sign-in/resource/fileIco.svg";

const TrustKey = () => {
  const [isDropStatus, setDropStatus] = useState(null);

  async function sendKeyToServer(files){
    
    let nitoroFileIndex;

    for(let i = 0; i < files.length; i++){
      const fileName = files[i].name;
      const regex = new RegExp(`\.nitoro$`);
      if(regex.test(fileName)){
        nitoroFileIndex = i;
        SendFetch(files)
        break;
      }
    }
    

    async function SendFetch(files) {

      let reader = new FileReader();
      reader.readAsText(files[nitoroFileIndex])
      reader.onload = function() {
        const value = reader.result
        fetch('/api/auth/createRecoveryToken', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: value
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      }

    }
  }

  function onDropStartHandler(e) {
    e.preventDefault();
    setDropStatus(true);
  }

  function onDropLeaveHandler(e) {
    e.preventDefault();
    setDropStatus(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    setDropStatus(false);
    sendKeyToServer(files);
  }

  return (
    <div className="trustKey-body">
      <div className="file-container">
        {isDropStatus ? (
          <div id="file-containerDropArea">
            <div
              id="DropArea"
              onDragStart={(e) => onDropStartHandler(e)}
              onDragLeave={(e) => onDropLeaveHandler(e)}
              onDragOver={(e) => onDropStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            ></div>
            <FileIco />
            <p id="trustKeyText">release trustKey ^-^</p>
          </div>
        ) : (
          <div
            id="file-containerDropArea">
              <div
              id="DropArea"
              onDragStart={(e) => onDropStartHandler(e)}
              onDragLeave={(e) => onDropLeaveHandler(e)}
              onDragOver={(e) => onDropStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            ></div>
            <FileIco />
            <p id="trustKeyText">drop nitoro trustKey</p>
          </div>
        )}
      </div>
      <p>upload your account trustKey </p>
    </div>
  );
};

const Recovery = () => {
  const navigate = useNavigate();

  const inputNickname = createRef();
  const inputPassword1 = createRef();
  const inputPassword2 = createRef();
  const passwordImgBtn = createRef();

  window.navigate = navigate;

  const [eyeOption1, setEyeOption1] = useState(eye_close);
  const [eyeOption2, setEyeOption2] = useState(eye_close);

  function eyeChange1() {
    if (inputPassword1.current.type == "password") {
      setEyeOption1(eye_open);
      inputPassword1.current.type = "text";
    } else {
      setEyeOption1(eye_close);
      inputPassword1.current.type = "password";
    }
  }

  function eyeChange2() {
    if (inputPassword2.current.type == "password") {
      setEyeOption2(eye_open);
      inputPassword2.current.type = "text";
    } else {
      setEyeOption2(eye_close);
      inputPassword2.current.type = "password";
    }
  }

  const [isButtonIsDisable, setButtonIsDisable] = useState(true);
  window.isButtonIsDisable = isButtonIsDisable;

  async function checkRequireData() {}

  function animationSet() {
    var recoveryForm = document.getElementsByClassName("recoveryForm")[0];
    recoveryForm.style.animation = "trustKeyAnimation 1s forwards";
    const trustKeyText = document.getElementById("trustKeyText");
    trustKeyText.innerHTML = "please take your trust key";
    setButtonIsDisable(false);
  }

  function redirect(response) {
    if (response === true) {
      console.log(response);
      return navigate("/main", { replace: true });
    } else {
      console.log(response);
    }
  }

  return (
    <div className="Recovery-main">
      <div className="Recovery-container">
        <div className="logoContainer">
          <img src={logo}></img>
          <p>Time to shape your persona ^_^</p>
        </div>
        <div className="recoveryContainer">
          <div className="recoveryForm">
            <div className="recoveryOption">
              <label>password</label>
              <input
                ref={inputPassword1}
                onChange={checkRequireData}
                type="password"
              ></input>
              <img
                ref={passwordImgBtn}
                id="passwordImgBtn"
                src={eyeOption1}
                onClick={eyeChange1}
              ></img>
            </div>

            <div className="recoveryOption">
              <label>password</label>
              <input
                ref={inputPassword2}
                onChange={checkRequireData}
                type="password"
              ></input>
              <img
                ref={passwordImgBtn}
                id="passwordImgBtn"
                src={eyeOption2}
                onClick={eyeChange2}
              ></img>
            </div>

            <button className="recoveryButton">Sign in!</button>
          </div>
        </div>
      </div>
      <div className="trustKey-container">
        <TrustKey></TrustKey>
      </div>
    </div>
  );
};

export default Recovery;
