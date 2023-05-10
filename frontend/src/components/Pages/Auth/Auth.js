import React, { Component, createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { whoami } from "../../Modules/api/whoami";

import "../Auth/Auth.scss";
import sha256 from "../../Modules/crypt/sha256Hash";
import logo from "../../resource/logo.png";
import eye_open from "../Auth/resource/eye_open.svg";
import eye_close from "../Auth/resource/eye_close.svg";

let whoamiData = undefined;
let userAlreadyLogin;
const promise = whoami(window.navigate);
promise
  .then((result) => {
    whoamiData = result;
  })
  .then((result) => window.userIsAuthUpdate());



const Auth = () => {
  const navigate = useNavigate();

  const inputEmail = createRef();
  const inputPassword = createRef();
  const inputRemember = createRef();
  const passwordImgBtn = createRef();
  const comebackButton = createRef();

  window.navigate = navigate;
  function UserIsAuth() {
    const [updateMe, setUpdateMe] = useState(null);
  
    function userIsAuthUpdate() {
      setUpdateMe(0);
    }
  
    window.userIsAuthUpdate = userIsAuthUpdate;
    if (whoamiData?.username != undefined) {
      comebackButton.current.style.display = "initial"
      return( 
        <div>
          <div className="userAlreadyLogin">
            Hey, it seems like you are already logged in as {whoamiData.username}
          </div>
        </div>
      );
    }
  }
  let [eyeOption, setEyeOption] = useState(eye_close);

  const eyeChange = () => {
    //change a visible of password
    if (inputPassword.current.type == "password") {
      setEyeOption(eye_open);
      inputPassword.current.type = "text";
    } else {
      setEyeOption(eye_close);
      inputPassword.current.type = "password";
    }
  };

  async function login() {
    //fetch form from login button
    if (inputEmail.current.value != "" && inputPassword.current.value != "") {
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: `${inputEmail.current.value}`,
          password: `${await sha256(inputPassword.current.value)}`,
          remember: `${inputRemember.current.checked}`,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          redirect(response);
        });
    }
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
    <div className="Auth-main">
      <div className="Auth-container">
        <div className="logoContainer">
          <img src={logo}></img>
        </div>
        <div className="loginContainer">
          <div className="loginForm">
            <div className="loginOption">
              <label>username</label>
              <input ref={inputEmail} type="email"></input>
            </div>

            <div className="loginOption">
              <label>password</label>
              <input ref={inputPassword} type="password"></input>
              <img
                ref={passwordImgBtn}
                id="passwordImgBtn"
                src={eyeOption}
                onClick={eyeChange}
              ></img>
            </div>
            <div className="rememberMe">
              <label>Remember me?</label>
              <input ref={inputRemember} type="checkbox"></input>
            </div>
            <div className="optionButtonContainer">
            <button className="loginButton" onClick={login} >
              login
            </button>
            <button className="comebackButton" onClick={() =>{navigate('/main')}} ref={comebackButton}>Come Back</button>
            </div>
          </div>
        </div>
        <UserIsAuth />
      </div>

      <div className="Auth-UserOptions">
        <div id="button-left">
          <button>forgot password?</button>
        </div>
        <div id="button-right">
          <button
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Sign-in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
