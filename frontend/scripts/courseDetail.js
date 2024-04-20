
  document.getElementById("startReadingBtn").addEventListener("click", function() {
    // Check localStorage for user authentication
    const isAuthenticated = localStorage.getItem("id");
    
    if (isAuthenticated) {
      // Redirect to reading.html
       const readBtn = document.getElementById("read");
       const newparams = getUrlParams();
        const course = {
          title: newparams['courseTitle'],
          id: newparams['id'],
        };
        
       readBtn.href = `../pages/reading.html?courseTitle=${course.title}&id=${course.id}`;
       window.location.href = "../pages/reading.html";
      console.log("Redirecting to reading.html");
    } else {
      // Redirect to login page or perform any other action
      alert("Please log in to start reading.");

       window.location.href = "../index.html";
    }
  });


// Function to get URL parameters
function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
  // console.log(urlParams);
  return Object.fromEntries(urlParams.entries());
}

// Function to populate course details
function populateCourseDetails() {
  const params = getUrlParams();
  document.getElementById('courseTitle').textContent = decodeURIComponent(params['courseTitle'] || '');
  document.getElementById('CId').textContent = decodeURIComponent(params['courseId'] || '');
  document.getElementById('subjectArea').textContent = decodeURIComponent(params['subjectArea'] || '');
  document.getElementById('preRequisites').textContent = decodeURIComponent(params['preRequisites'] || '');
  document.getElementById('stars').textContent = decodeURIComponent(params['starRating'] || '');
  document.getElementById('points').textContent = decodeURIComponent(params['courseRating'] || '');
  document.getElementById('totalCount').textContent = decodeURIComponent(params['reviewCount'] || '');
  document.getElementById('externalMaterial').textContent = decodeURIComponent(params['externalMaterial'] || '');
  document.getElementById('description').textContent = decodeURIComponent(params['courseDescription'] || '');
}
document.addEventListener("DOMContentLoaded", populateCourseDetails)
//  window.onload = populateCourseDetails;


