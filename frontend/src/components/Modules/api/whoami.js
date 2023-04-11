

  export async function whoami(navigate) { 
    return fetch('/api/auth/whoami', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(response => {
      if(response.message === "anonimous"){
        navigate("/auth");
        return null;
      } else {
        return response;
      }
    })
  }
