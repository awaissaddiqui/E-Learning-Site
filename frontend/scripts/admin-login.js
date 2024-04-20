// import {domain} from "../utils/constants.js"

function signIn(event) {
    event.preventDefault(); // Prevent default form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    fetch(`http://localhost:4000/api/v1/adminlogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res) => res.json())
    .then((data) =>{
         const id = data.user._id;
         localStorage.setItem("id", id);
        // console.log(data);
         window.location.href = "../pages/admin.html"

    }).catch(error => console.error('Error fetching data:', error));
    
  }