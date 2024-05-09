// Program Title : To-Do List Application
// Programmer & Author : Keith Ralph Poncardas
// Programming Language : Vanilla JavaScript
// Date Launched : May 4, 2024

// Selecting DOM elements for task management
const titleInput = document.getElementById('titleInput'); // Input field for task title
const commentInput = document.getElementById('commentInput'); // Input field for task comment
const taskList = document.getElementById('taskList'); // Element representing the task list

// Function to display a modal with specified content
function showModal(title, comment) {
  // Creating a modal element
  const modal = document.createElement('div');
  modal.className = 'modal fade';

  // Adding HTML content to the modal
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-break" id="exampleModalLabel">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${comment}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;

  // Appending the modal to the document body
  document.body.appendChild(modal);

  // Creating a modal instance and displaying it
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

// Dynamic Toast Notification Function
function showToast(head, message) {
  // Create a new toast element
  var toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add('border-danger');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.setAttribute('data-bs-autohide', 'true');
  toast.setAttribute('data-bs-delay', '1000');

  // Set the content of the toast
  toast.innerHTML = `
    <div class="toast-header">
      <box-icon name='error-circle' type='solid' color='#ff3333' ></box-icon>
      <strong class="me-auto mx-1">${head}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      ${message}
    </div>
  `;

  // Add the toast to the container
  document.getElementById('toastContainer').appendChild(toast);

  // Show the toast
  var toastElement = new bootstrap.Toast(toast);
  toastElement.show();
}

// Function to trim a string to a specified maximum length and append ellipsis if needed
function trimToLengthWithEllipsis(str, maxLength) {
  // If the length of the string is already less than or equal to the maxLength, return the original string
  if (str.length <= maxLength) {
    return str;
  } else {
    // If the length exceeds maxLength, return a substring of length maxLength - 3 with '...' appended
    return str.substring(0, maxLength - 3) + '...';
  }
}

var trashIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
  </svg>
`;

var viewIconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
  </svg>
`;

var editIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
`;

// Function to add a new task
function addTask() {
  // Trim input values
  const titleContent = titleInput.value.trim();
  const commentContent = commentInput.value.trim();

  // Check if both title and comment are not empty
  if (titleContent !== '' && commentContent !== '') {
    // Create a new list item element
    let li = document.createElement('li');
    // Set class for styling and animation
    li.className = 'list-group-item animate__animated animate__tada';
    // Set text content for the list item, trimming to 25 characters with ellipsis
    li.textContent = trimToLengthWithEllipsis(titleContent, 25);

    commentInput.classList.add('text-break');

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-outline-danger btn-sm me-2 float-end';
    removeBtn.setAttribute('title', 'Remove');
    // Set inner HTML for remove button icon
    removeBtn.innerHTML = trashIconSvg;
    // Add event listener to remove button
    removeBtn.addEventListener('click', function () {
      // Add exit animation to the list item
      li.classList.add('animate__backOutRight');
      // Remove list item after animation ends
      li.addEventListener('animationend', function () {
        taskList.removeChild(li);
      });
    })

    // Create view button
    const viewBtn = document.createElement('button');
    viewBtn.className = 'btn btn-outline-success btn-sm me-2 float-end';
    viewBtn.setAttribute('title', 'View');
    // Set inner HTML for view button icon
    viewBtn.innerHTML = viewIconSvg;
    // Add event listener to view button
    viewBtn.addEventListener('click', function () {
      // Show modal with title and comment content
      showModal(titleContent, commentContent);
    })

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-outline-info btn-sm me-2 float-end'
    editBtn.setAttribute('title', 'Edit');
    // Set inner HTML for edit button icon
    editBtn.innerHTML = editIconSvg;
    // Add event listener to edit button
    editBtn.addEventListener('click', function () {
      // Show modal with message that edit button is not available
      showModal('Available Soon!', 'Edit button is not available right now.');
    })

    // Append buttons to the list item
    li.appendChild(removeBtn);
    li.appendChild(viewBtn);
    li.appendChild(editBtn);
    // Append list item to the task list
    taskList.appendChild(li);
    // Clear input fields
    titleInput.value = '';
    commentInput.value = '';
    // Remove validation styling
    titleInput.classList.remove('is-invalid');
    commentInput.classList.remove('is-invalid');
  } else {
    // If either title or comment is empty, show toast message and add validation styling
    showToast('No Input', 'Inputs Cannot Be Empty');
    titleInput.classList.add('is-invalid');
    commentInput.classList.add('is-invalid');
  }
}

// Attach a click event listener to the HTML element with the id "addTaskBtn", triggering the addTask function when clicked.
document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('clearTaskBtn').addEventListener('click', function () {
  // Check if the task list is empty
  if (taskList.childElementCount === 0) {
    titleInput.classList.remove('is-invalid');
    commentInput.classList.remove('is-invalid');
    showToast("Task Is Empty", "Task is already cleared");
  } else {
    // Iterate over each child of the task list and add the animation class
    taskList.childNodes.forEach(function (child) {
      child.classList.add('animate__backOutLeft');
      titleInput.classList.remove('is-invalid');
      commentInput.classList.remove('is-invalid');
      // Wait for the animation to finish before removing the element
      child.addEventListener('animationend', function () {
        taskList.removeChild(child);
      });
    });
  }
});



