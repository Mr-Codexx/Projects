// Select elements
const noteForm = document.getElementById('noteForm');
const notesList = document.getElementById('notesList');
const usernamePrompt = document.getElementById('usernamePrompt');
const notesApp = document.getElementById('notesApp');
const submitUsername = document.getElementById('submitUsername');
const usernameInput = document.getElementById('username');

// Show username prompt on load
window.onload = function() {
  if (!localStorage.getItem('username')) {
    usernamePrompt.style.display = 'block';
  } else {
    showNotesApp();
  }
};

// Function to show notes app
function showNotesApp() {
  usernamePrompt.style.display = 'none';
  notesApp.style.display = 'block';
  loadNotes();
}

// Submit username
submitUsername.addEventListener('click', function() {
  const username = usernameInput.value.trim();
  if (username) {
    localStorage.setItem('username', username);
    showNotesApp();
  }
});

// Load notes from local storage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => addNoteToList(note.title, note.content));
}

// Listen for form submission to add a new note
noteForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get input values
  const title = document.getElementById('noteTitle').value;
  const content = document.getElementById('noteContent').value;

  if (title && content) {
    // Add the new note to the list
    addNoteToList(title, content);

    // Save note to local storage
    saveNoteToLocalStorage(title, content);

    // Clear the form
    noteForm.reset();
  }
});

// Function to save note to local storage
function saveNoteToLocalStorage(title, content) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push({ title, content });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to add a note to the list
function addNoteToList(title, content) {
  // Create a card for each note
  const noteCard = document.createElement('div');
  noteCard.classList.add('col-md-4');
  noteCard.innerHTML = `
    <div class="card note-card">
      <div class="card-header note-card-header">
        <h5>${title}
          <button class="delete-btn">&times;</button>
        </h5>
      </div>
      <div class="card-body note-card-body">
        <p>${content}</p>
      </div>
    </div>
  `;

  // Append to notes list
  notesList.appendChild(noteCard);

  // Add delete functionality
  noteCard.querySelector('.delete-btn').addEventListener('click', function() {
    noteCard.remove();
    removeNoteFromLocalStorage(title);
  });
}

// Function to remove a note from local storage
function removeNoteFromLocalStorage(title) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const updatedNotes = notes.filter(note => note.title !== title);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}
