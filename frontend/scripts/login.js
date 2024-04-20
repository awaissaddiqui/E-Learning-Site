// import { domain } from "../utils/constants"
// console.log(domain);
function signIn(event) {
    event.preventDefault(); // Prevent default form submission
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    
    fetch(`http://localhost:4000/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, withCredentials: true,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res) => res.json())
    .then((data) =>{
  
        const id = data.user._id;
        localStorage.setItem("id", id);
        
         window.location.href = "../pages/dashboard.html"

    }).catch(error => console.log('Error fetching data:', error));
    
  }

  
  