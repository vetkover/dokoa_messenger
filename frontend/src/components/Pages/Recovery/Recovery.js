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

//let whoamiData = undefined;
//const promise = whoami(window.navigate);
//promise.then(result => {
//    whoamiData = result
//  })
//  .then(result =>
//    window.userIsAuthUpdate()
//  );

const TrustKey = () => {
  const [isDropStatus, setDropStatus] = useState(null);

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
    let files = [e.dataTransfer.files];
    console.log(files);
    setDropStatus(false);
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
      <p>download the file and save it to restore access to your account </p>
      <p>( this is your only one recovery method :D )</p>
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

  let [eyeOption, setEyeOption] = useState(eye_close);

  function eyeChange1() {
    if (inputPassword1.current.type == "password") {
      setEyeOption(eye_open);
      inputPassword1.current.type = "text";
    } else {
      setEyeOption(eye_close);
      inputPassword1.current.type = "password";
    }
  }

  function eyeChange2() {
    if (inputPassword2.current.type == "password") {
      setEyeOption(eye_open);
      inputPassword2.current.type = "text";
    } else {
      setEyeOption(eye_close);
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
                src={eyeOption}
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
                src={eyeOption}
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
