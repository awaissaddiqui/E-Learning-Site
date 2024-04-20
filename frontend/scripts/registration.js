// import {domain} from "../utils/constants"
function signUp(event) {
   event.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const studentNumber = document.getElementById('stdNmbr').value;
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;

  
    // Make a request to your MongoDB server to store the user data
    fetch(`http://localhost:4000/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        studentNumber: studentNumber,
        department: department,
        semester: semester
      })
    })
    .then(response => {
      if (response.ok) {
        // Sign up successful, redirect to login.html
        console.log(response);
        window.location.href = '../index.html';
      }
       else {
        // Sign up failed, display error message
        console.error('Sign up failed');
        // You can display an error message to the user if needed
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // You can display an error message to the user if needed
    });
  
  
  }