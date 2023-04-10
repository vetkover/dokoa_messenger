import React, { Component, createRef, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Router, NavLink, useNavigate   } from "react-router-dom";

import { whoami } from "../../Modules/api/whoami"

import "../Auth/Auth.scss"
import sha256 from '../../Modules/crypt/sha256Hash';
import logo from "../../resource/logo.png";
import eye_open from "../Auth/resource/eye_open.svg"
import eye_close from "../Auth/resource/eye_close.svg"

const Auth = () => {

    const navigate = useNavigate();

    const inputEmail = createRef();
    const inputPassword = createRef();
    const inputRemember = createRef();
    const passwordImgBtn = createRef();

    


    let [eyeOption, setEyeOption] = useState(eye_close);

    const eyeChange = () => { //change a visible of password
        if(inputPassword.current.type == "password"){
            setEyeOption(eye_open);
            inputPassword.current.type = "text"
        } else {
            setEyeOption(eye_close);
            inputPassword.current.type = "password"
        }
    }

    async function login () { //fetch form from login button
        if(inputEmail.current.value != "" && inputPassword.current.value != ""){
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: `${inputEmail.current.value}`,
                password: `${await sha256(inputPassword.current.value)}`,
                remember: `${inputRemember.current.checked}`
               }),
        })
        .then(response => response.json())
        .then((response) => {
           redirect(response)
        })
    }
}

function redirect(response){
    if(response.message == "ok"){
        console.log(response)
        return (
            navigate('/main', { replace: true })
        )
    } else {
        console.log(response)
    }
    
}
    return (
        <div className='Auth-main'>
        <div className='Auth-container'>
            <div className='logoContainer'>
                <img src={logo}></img>
            </div>
            <div className='loginContainer'>
                <div className='loginForm'>

                    <div className='loginOption'>
                        <label>username/email</label>
                        <input ref={inputEmail} type="email"></input>
                    </div>

                    <div className='loginOption'>
                        <label>password</label>
                        <input ref={inputPassword} type="password"></input>
                        <img ref={passwordImgBtn} id="passwordImgBtn" src={eyeOption} onClick={eyeChange}></img>
                    </div>
                    <div className='rememberMe'>
                        <label>Remember me?</label>
                    <input ref={inputRemember}type="checkbox"></input>

                    </div>
                    <button className='loginButton' onClick={login}>login</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Auth;