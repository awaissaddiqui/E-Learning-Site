function validateForm() {
     const username = document.getElementById('username').value;
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const stdNmbr = document.getElementById('stdNmbr').value;
     const department = document.getElementById('department').value;
     const semester = document.getElementById('semester').value;
   
     // Regex pattern for email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
     // Check if any field is empty
     if (!username) {
     //   document.getElementById('errorMessage1').textContent = "Please fill the fields";
       return false; // Prevent form submission
     }
   
     // Check if email format is incorrect
     if (!emailRegex.test(email)) {
     //   document.getElementById('errorMessage2').textContent = "Please enter a valid email address";
       return false; // Prevent form submission
     }
   
     return true; // Allow form submission
   }