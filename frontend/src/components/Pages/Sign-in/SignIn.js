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

import "../Sign-in/SignIn.scss";
import sha256 from "../../Modules/crypt/sha256Hash";
import logo from "../../resource/logo.png";
import eye_open from "../Auth/resource/eye_open.svg";
import eye_close from "../Auth/resource/eye_close.svg";

//let whoamiData = undefined;
//const promise = whoami(window.navigate);
//promise.then(result => {
//    whoamiData = result
//  })
//  .then(result =>
//    window.userIsAuthUpdate()
//  );

const SignIn = () => {
  const navigate = useNavigate();

  const inputNickname = createRef();
  const inputPassword = createRef();
  const passwordImgBtn = createRef();

  window.navigate = navigate;

  let [eyeOption, setEyeOption] = useState(eye_close);

  const eyeChange = () => {
    if (inputPassword.current.type == "password") {
      setEyeOption(eye_open);
      inputPassword.current.type = "text";
    } else {
      setEyeOption(eye_close);
      inputPassword.current.type = "password";
    }
  };

  const require1 = createRef();
  const require2 = createRef();
  const require3 = createRef();
  const [isDisabled, setDisabled] = useState("disabled");
  function checkRequireData(){

    let requireStatus = [0,0,0]

    //nickname

    if(inputNickname.current.value != "" && inputNickname.current.value >= 3 && inputNickname.current.value <= 16){
        requireStatus[0] = 1;
        require1.current.id = "requireAccept"
    }

    //password

  }


  async function SignInFetch() {
    if (inputNickname.current.value != "" && inputPassword.current.value != "") {
      fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${inputNickname.current.value}`,
          password: `${await sha256(inputPassword.current.value)}`,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          redirect(response);
        });
    }
  }

  function redirect(response) {
    if (response.message == "ok") {
      console.log(response);
      return navigate("/main", { replace: true });
    } else {
      console.log(response);
    }
  }
  return (
    <div className="SighIn-main">
      <div className="SighIn-container">
        <div className="logoContainer">
          <img src={logo}></img>
        </div>
        <div className="signinContainer">
          <p>Time to shape your persona ^_^</p>
          <div className="signinForm">
            <div className="signinOption">
              <label>username</label>
              <input ref={inputNickname} onChange={checkRequireData} type="email"></input>
            </div>

            <div className="signinOptionRequire-container">
              <div className="signinOptionRequire">
                <span ref={require1} className="requireCircle"></span>
                <label>
                  The number of characters is not less than 3 and not more than
                  16
                </label>
              </div>
            </div>

            <div className="signinOption">
              <label>password</label>
              <input ref={inputPassword} onChange={checkRequireData} type="password"></input>
              <img
                ref={passwordImgBtn}
                id="passwordImgBtn"
                src={eyeOption}
                onClick={eyeChange}
              ></img>
            </div>

            <div className="signinOptionRequire-container">
              <div className="signinOptionRequire">
                <span ref={require2} className="requireCircle"></span>
                <label>The number of characters is not less than 8</label>
              </div>
              <div className="signinOptionRequire">
                <span ref={require3} className="requireCircle"></span>
                <label>Password doesn't contain space</label>
              </div>
            </div>

            <button className="signinButton" disabled={isDisabled} onClick={SignInFetch}>
              Sign in!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
