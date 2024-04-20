function showData (){
  
  const table = document.querySelector('#myTable');
  const id = localStorage.getItem('id');
  if(!id){
    window.location.href = '../pages/admin-login.html';
    return;
  }
  fetch(`http://localhost:4000/api/v1/getCourses`)
  .then((res) => res.json())
  .then(({data}) => {
    data.forEach(course => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
      <td>${course.courseId}</td>
      <td>${course.title}</td>
      <td>${course.subjectArea}</td>
      <td>${course.totalRegisteredUsers}</td>
      <td>${course.totalReviews}</td>
      <td>${parseFloat(course.averageRating).toFixed(1)}</td>
        <td>${course.preRequisites}</td>
        <td>${course.toolsOrSoftwares}</td>
        <td>${course.externalMaterial}</td>
        <td colspan="2">${course.description}</td>
        `;
        
        table.appendChild(row);
      });
    
  }).catch((error) => {
    console.log(error);
  });


  }
  window.onload = showData;

  function logout(event){
    event.preventDefault();
    localStorage.removeItem('id');
    window.location.href = '../pages/admin-login.html';
  }