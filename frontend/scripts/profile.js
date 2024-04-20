import { domain } from "../utils/constants.js";
import { goBack } from "../utils/utilsFunctions.js";

document.querySelector('.arrow').addEventListener('click', goBack);

document.querySelector('#btnSignOut').addEventListener('click', function () {
    fetch(`${domain}/api/v1/logout`)
        .then((data) => {            
            localStorage.removeItem("id");
            window.location.href = "../index.html";
        })
        .catch(error => console.error('Error While signing out', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem("id");
    if(!userId) {
        alert("You are not logged in");
        window.location.href = "../index.html";
        return;
    }

    fetch("http://localhost:4000/api/v1/profile/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    })
        .then(response => response.json())
        .then(({ data }) => {
            const profileInfoElements = document.querySelectorAll('.profileInfo');

            profileInfoElements[0].textContent = data.name;
            profileInfoElements[1].textContent = data.department;
            profileInfoElements[2].textContent = data.studentNumber;
            profileInfoElements[3].textContent = data.semester;
        })
        .catch(error => console.error('Error fetching data:', error));
});


document.querySelector('#deleteAccount').addEventListener('click', function () {
    const userId = localStorage.getItem("id");
    if(!userId) {
        alert("You are not logged in");
        window.location.href = "../index.html";
        return;
    }

    fetch(`http://localhost:4000/api/v1/deleteuser/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then(({ data }) => {
            // console.log(data.name + " account deleted successfully");
            localStorage.removeItem("id");
            window.location.href = "../pages/signUp.html";
        })
        .catch(error => console.error('Error deleting account:', error));
});