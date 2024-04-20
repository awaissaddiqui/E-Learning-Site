

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
    const userId = localStorage.getItem('id');
    
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
            
            if(currentParaIndex === courseData.length - 1){
                const ratingDiv = createRatingStars();
                const submitButton = createSubmitButton();
                const rating = document.querySelector('.star-rating');
                rating.appendChild(ratingDiv);
                rating.appendChild(submitButton);
                const ratingLabels = document.querySelectorAll('.rating label');
                let selectedRating = 0;
            
                ratingLabels.forEach(label => {
                    label.addEventListener('click', function() {
                        selectedRating = this.previousElementSibling.value;
                        console.log(selectedRating); // Print the selected rating to the console
                    });
                });
                ratingLabels.forEach(label => {
                    label.addEventListener('mouseover', function() {
                        const currentLabel = this;
                        ratingLabels.forEach(label =>{
                            currentLabel.innerHTML = '★';
                        })
                        
                    });
                });
                submitButton.addEventListener('click', function() {
                    console.log(course_ID, userId, selectedRating);
                 
                    fetch("http://localhost:4000/api/v1/course/rating",{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',

                        },
                        body: JSON.stringify({
                            courseId: course_ID,
                            userId: userId,
                            ratingValue: selectedRating
                        }),
                    })
                        .then(data => {
                            submitButton.textContent = 'Submitted';
                            submitButton.disabled = true;
                            console.log(data);
                        }).catch(error => {
                            console.log('Error submitting rating:', error);
                        })
                    
                });
                console.log(selectedRating);
            }
             updateButtonVisibility();
        });  
    
        function updateButtonVisibility() {
            previousBtn.style.display = currentParaIndex === courseData.length-1 ? 'none' : '';
            nextBtn.style.display = currentParaIndex === courseData.length - 1 ? 'none' : '';
            paraElement.style.display  = currentParaIndex === courseData.length - 1 ? 'none' : '';
        }
        function createRatingStars() {
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating');
            ratingDiv.innerHTML = `
                <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label>
                <input type="radio" name="rating" value="4.6" id="4"><label for="4">☆</label>
                <input type="radio" name="rating" value="3.5" id="3"><label for="3">☆</label>
                <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label>
                <input type="radio" name="rating" value="1.8" id="1"><label for="1">☆</label>
            `;
            return ratingDiv;
        }
        
        function createSubmitButton() {
            const submitButton = document.createElement('button');
            submitButton.textContent = 'Submit';
            submitButton.classList.add('submit-button');
            return submitButton;
        }
    
    }).catch(error => {
        console.error('Error fetching course:', error);
    
    });
      
});
