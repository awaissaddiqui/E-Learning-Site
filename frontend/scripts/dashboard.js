import { domain } from "../utils/constants.js";
import { getStarRating } from "../utils/utilsFunctions.js";

function createCourseCard(course) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('image');
  const img = document.createElement('img');
  img.src = '../assets/course_logo.png';
  img.alt = course.title;
  imageDiv.appendChild(img);


  const reviewsDiv = document.createElement('div');
  reviewsDiv.classList.add('reviews');
  const ratingSpan = document.createElement('span');
  const parsedRating = parseFloat(course.averageRating).toFixed(1);
  ratingSpan.textContent = parsedRating;
  // course.averageRating ?? 0;
  const starSpan = document.createElement('span');
  starSpan.classList.add('stars');
   let starRating = getStarRating(course.averageRating, 5);
  // let starRating = '⭐'.repeat(Math.floor(course.averageRating));
  
  
  starSpan.innerHTML = starRating;
  const reviewCountSpan = document.createElement('span');
  reviewCountSpan.textContent = `${course.totalReviews ?? 0} reviews`;
  reviewsDiv.appendChild(ratingSpan);
  reviewsDiv.appendChild(starSpan);
  reviewsDiv.appendChild(reviewCountSpan);

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('heading');
  const heading = document.createElement('h4');
  heading.textContent = course.title;
  headingDiv.appendChild(heading);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button');
  const viewCourseLink = document.createElement('a');
  viewCourseLink.href = `../pages/courseDetail.html?courseId=${course.courseId}&id=${course._id}&courseTitle=${course.title}&courseRating=${parsedRating}&courseDescription=${course.description}&starRating=${starRating}&subjectArea=${course.subjectArea}&preRequisites=${course.preRequisites}&externalMaterial=${course.externalMaterial}&reviewCount=${course.totalReviews}`;
  

  viewCourseLink.textContent = 'View Course';
  buttonDiv.appendChild(viewCourseLink);

  cardDiv.appendChild(imageDiv);
  cardDiv.appendChild(reviewsDiv);
  cardDiv.appendChild(headingDiv);
  cardDiv.appendChild(buttonDiv);

  return cardDiv;
}

async function renderCourses() {
  try {
    const courseContainer = document.getElementById('courseContainer');
    const response = await fetch(`${domain}/api/v1/getCourses`);
    const courses = await response.json();

    courses.data.forEach(course => {
      const courseCard = createCourseCard(course);
      courseContainer.appendChild(courseCard);
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}

window.onload = renderCourses;

