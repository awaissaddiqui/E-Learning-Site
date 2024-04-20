

document.addEventListener("DOMContentLoaded", function() {
    const previousBtn = document.getElementById('previousBtn');
    const nextBtn = document.getElementById('nextBtn');

    function getUrlParams() {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
        return Object.fromEntries(urlParams.entries());
      }
    const params = getUrlParams();
         
    const courseTitleElement = document.querySelector('.courseTitle h2');
    courseTitleElement.textContent = decodeURIComponent(params['courseTitle'] || '');
    
    const course_ID= decodeURIComponent(params['id'] || 'n000000');
    
    fetch(`http://localhost:4000/api/v1/getsingleCourse/${course_ID}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    
    })
    .then(response => response.json())
    .then(({data}) => {
        const courseData = data.paragraphs;
                 
            const paraElement = document.querySelector('.para p');
            paraElement.textContent = courseData[0];
            
    
    
        let currentParaIndex = 0;
         previousBtn.addEventListener('click', function() {
            if (currentParaIndex > 0) {
                currentParaIndex--;
                paraElement.textContent = courseData[currentParaIndex];
            }
            updateButtonVisibility();
        });
      
         nextBtn.addEventListener('click', function() {
            if (currentParaIndex < courseData.length - 1) {
                currentParaIndex++;
                paraElement.textContent = courseData[currentParaIndex];
            }
            updateButtonVisibility();
        });  
    
        function updateButtonVisibility() {
            previousBtn.style.display = currentParaIndex === 0 ? 'none' : '';
            nextBtn.style.display = currentParaIndex === courseData.length - 1 ? 'none' : '';
        }
        
    
    }).catch(error => {
        console.error('Error fetching course:', error);
    
    });
      
});
