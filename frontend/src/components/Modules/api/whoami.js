import { BrowserRouter, Route, Routes, Router, useNavigate } from "react-router-dom";



function getCookie(name) {
    const cookieStr = document.cookie;
    const cookies = cookieStr.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const separatorIndex = cookie.indexOf('=');
      const cookieName = cookie.slice(0, separatorIndex);
      if (cookieName === name) {
        const cookieValue = cookie.slice(separatorIndex + 1);
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

 export async function whoami(navigate) { 
    fetch('/api/auth/whoami', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    .then(response => response.json())
    .then(response => {
      if(response.message == "anonimous"){
        return(
      navigate("/")
        )
      }
    }
  )
}
