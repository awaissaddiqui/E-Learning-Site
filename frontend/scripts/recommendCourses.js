import {domain, mLServer} from "../utils/constants"
// Function to create HTML elements for the course cards
function createCourseCard(course) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    const img = document.createElement('img');
    img.src = '../assets/course_logo.png';
    img.alt = course.course_name;
    imageDiv.appendChild(img);

     const reviewsDiv = document.createElement('div');
     reviewsDiv.classList.add('reviews');
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = course.rating;
    const starSpan = document.createElement('span');
    let starRating = '⭐'.repeat(Math.round(course.rating));
    starSpan.textContent = starRating;
    const reviewCountSpan = document.createElement('span');
    reviewCountSpan.textContent = `${course.review_count ?? 0} reviews`;
    reviewsDiv.appendChild(ratingSpan);
    reviewsDiv.appendChild(starSpan);
    reviewsDiv.appendChild(reviewCountSpan);

    const headingDiv = document.createElement('div');
    headingDiv.classList.add('heading');
    const heading = document.createElement('h4');
    heading.textContent = course.course_name;
    headingDiv.appendChild(heading);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button');
    const viewCourseLink = document.createElement('a');
    viewCourseLink.href = `../pages/courseDetail.html`;
    viewCourseLink.textContent = 'View Course';
    buttonDiv.appendChild(viewCourseLink);

    cardDiv.appendChild(imageDiv);
    cardDiv.appendChild(reviewsDiv);
    cardDiv.appendChild(headingDiv);
    // cardDiv.appendChild(buttonDiv);

    return cardDiv;
}

// Function to fetch all courses from the server
async function getAllCourses() {
    try {
        const response = await fetch(`${domain}/api/v1/getCourses`);
        const { data } = await response.json();

        const formattedCourses = data.map(course => ({
            course_name: course.title,
            rating: course.rating,
            review_count: course.reviewCount
        }));

        // Call fetchData function to send courses to another server
        fetchData(formattedCourses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        // Handle error
    }
}

// Function to send courses to another server
function fetchData(courses) {
    fetch(` http://192.168.10.11:5000/predict_satisfaction`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courses)
    })
    .then(response => response.json())
    .then(data => {
        const satisfiedOrNeutralCourses = data.filter(course => {
            return course.satisfaction_level === 'Satisfied';
        });
      
        const courseContainer = document.getElementById('courseContainer');
        satisfiedOrNeutralCourses.forEach(course => {
            const courseCard = createCourseCard(course);
            courseContainer.appendChild(courseCard);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


window.onload = getAllCourses;
