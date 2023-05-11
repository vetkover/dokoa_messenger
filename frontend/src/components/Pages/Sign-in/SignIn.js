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
import fileIco from "../Sign-in/resource/fileIco.svg";

//let whoamiData = undefined;
//const promise = whoami(window.navigate);
//promise.then(result => {
//    whoamiData = result
//  })
//  .then(result =>
//    window.userIsAuthUpdate()
//  );


const TrustKey = () =>{
  return(
    <div className="trustKey-body">
      <div className="file-container">
        <svg src={fileIco} ></svg>
      </div>
    </div>
  )
}

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
  const require4 = createRef();
  const [isDisabled, setDisabled] = useState("disabled");

  async function checkRequireData() {
    async function nicknameIsFree() {
      let status = false;
      await fetch("/api/users/nicknameisAvailable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: `${inputNickname.current.value}`,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          status = response.isAvailable;
        });
      return status;
    }

    function createRequireStatus() {
      const requireStatus = [];

      function setRequireStatus(index, number) {
        if (index && number != undefined) {
          console.log(requireStatus);
          requireStatus[index] = number;
        }
        return requireStatus;
      }
      return function (index, number) {
        return setRequireStatus(index, number);
      };
    }

    const setRequireStatus = createRequireStatus();
    // [1] Nickame is unique
    // [2] The number of characters in nickname is not less than 3 and not more than 16
    // [3] The number of characters in password is not less than 8
    // [4] Password doesn't contain space
    (async function () {
      //nickname
      if (inputNickname.current.value != "") {
        if (
          inputNickname.current.value.length >= 3 &&
          inputNickname.current.value.length <= 16
        ) {
          const result = await nicknameIsFree();
          if (result) {
            require1.current.id = "requireAccept";
            setRequireStatus(1, 1);
          } else {
            require1.current.id = "requireError";
            setRequireStatus(1, 0);
          }

          setRequireStatus(2, 1);
          require2.current.id = "requireAccept";
        } else {
          setRequireStatus(2, 0);
          require2.current.id = "requireError";
        }
      } else {
        require1.current.id = "";
        require2.current.id = "";
        setRequireStatus(1, 0);
        setRequireStatus(2, 0);
      }

      //password
      if (inputPassword.current.value != "") {
        if (inputPassword.current.value.length >= 8) {
          setRequireStatus(3, 1);
          require3.current.id = "requireAccept";
        } else {
          setRequireStatus(3, 0);
          require3.current.id = "requireError";
        }

        if (inputPassword.current.value.indexOf(" ") === -1) {
          setRequireStatus(4, 1);
          require4.current.id = "requireAccept";
        } else {
          setRequireStatus(4, 0);
          require4.current.id = "requireError";
        }
      } else {
        require3.current.id = "";
        require4.current.id = "";
        setRequireStatus(3, 0);
        setRequireStatus(4, 0);
      }

      checkRequireStatus();

      function checkRequireStatus() {
        let requireStatus = setRequireStatus();
        if (requireStatus.every((status) => status === 1)) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }
    })();
  }
  async function SignInFetch() {
    if (
      inputNickname.current.value != "" &&
      inputPassword.current.value != ""
    ) {
      fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: `${inputNickname.current.value}`,
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
    if (response === true) {
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
              <input
                ref={inputNickname}
                onChange={checkRequireData}
                type="email"
              ></input>
            </div>

            <div className="signinOptionRequire-container">
              <div className="signinOptionRequire">
                <span ref={require1} className="requireCircle"></span>
                <label>Nickname is unique</label>
              </div>

              <div className="signinOptionRequire">
                <span ref={require2} className="requireCircle"></span>
                <label>
                  The number of characters is not less than 3 and not more than
                  16
                </label>
              </div>
            </div>

            <div className="signinOption">
              <label>password</label>
              <input
                ref={inputPassword}
                onChange={checkRequireData}
                type="password"
              ></input>
              <img
                ref={passwordImgBtn}
                id="passwordImgBtn"
                src={eyeOption}
                onClick={eyeChange}
              ></img>
            </div>

            <div className="signinOptionRequire-container">
              <div className="signinOptionRequire">
                <span ref={require3} className="requireCircle"></span>
                <label>The number of characters is not less than 8</label>
              </div>
              <div className="signinOptionRequire">
                <span ref={require4} className="requireCircle"></span>
                <label>Password doesn't contain space</label>
              </div>
            </div>

            <button
              className="signinButton"
              disabled={isDisabled}
              onClick={SignInFetch}
            >
              Sign in!
            </button>
          </div>
        </div>
      </div>
      <div className="trustKey-container">
        <TrustKey></TrustKey>
      </div>
    </div>
  );
};

export default SignIn;
