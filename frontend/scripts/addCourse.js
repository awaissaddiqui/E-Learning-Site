// import {domain}  from "../utils/constants";
let paragraphs = [];


function addPara(e) {
    e.preventDefault();
 
    const paragraphInput = document.querySelector('.paragraphInput');
    const paragraphValue = paragraphInput.value.trim();
    
   
    if (paragraphValue !== '') {
        paragraphs.push(paragraphValue);
        
        paragraphInput.value = '';
        paragraphInput.placeholder = 'Added Successfully. Enter another paragraph';
    } else {
      
        alert("Please enter a paragraph before adding.");
    }
}


 function addCourseToDatabase(event) {
    event.preventDefault(); 
    const id = localStorage.getItem('id');
    if(!id){
        window.location.href = '../pages/admin-login.html';
        return;
    } 
    const formData = new FormData(event.target);

    
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    jsonData['paragraphs'] = paragraphs;
     console.log(jsonData);

    
    fetch("http://localhost:4000/api/v1/courses/createCourse", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response =>  response.json())
    .then(data => {
        console.log('Course created successfully:', data);
        paragraphInput.value = '';
     
    })
    .catch(error => {
        console.error('Error creating course:', error);
     
    });
};