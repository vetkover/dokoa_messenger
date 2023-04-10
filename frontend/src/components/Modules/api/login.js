async function login () { //fetch form from login button
    console.log(inputRemember.current.checked)
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