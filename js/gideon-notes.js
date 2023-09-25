//Open the create-form//
const button = document.querySelector(".create-button");
const form = document.querySelector(".create-form");
const buttonform = document.querySelector(".confirm-button");

button.addEventListener("click", () => {
    form.style.display = form.style.display === "flex" ? "none" : "flex";
    buttonform.style.display = buttonform.style.display === "flex" ? "none" : "flex";
});

const buttonform2 = document.querySelector(".confirm-button");

buttonform2.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "flex" : "none";
    buttonform.style.display = buttonform.style.display === "none" ? "flex" : "none";
});
const titleInput = document.getElementById('titleInput');
const descriptionInput = document.getElementById('descriptionInput');
const saveButton = document.getElementById('saveButton');
const noteContainer = document.getElementById('noteContainer');
// Загрузка заметок из localStorage при загрузке страницы
loadNotes();

saveButton.addEventListener('click', function() {
    const title = titleInput.value;
    const description = descriptionInput.value;
    
    if (title.trim() === '' || description.trim() === '') {
        alert('Both title and description must be filled out.');
        return;
    }
    
    // Получаем текущий список заметок из localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // Добавляем новую заметку
    notes.push({ title, description });
    
    // Сохраняем обновленный список заметок в localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
    
    // Очищаем поля ввода, обновляем список заметок и сбрасываем форму
    titleInput.value = '';
    descriptionInput.value = '';
    loadNotes();
});

// Загрузка заметок из localStorage и отображение на странице
function loadNotes() {
    noteContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    notes.forEach(function(note, index) {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
  
      const titleElement = document.createElement('h1');
      titleElement.textContent = note.title;
      noteDiv.appendChild(titleElement);
  
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = note.description;
      descriptionElement.classList.add('description');
      noteDiv.appendChild(descriptionElement);
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', function(event) {
        event.stopPropagation();
        deleteNote(index);
      });
  
      const deleteImage = document.createElement('img');
      deleteImage.src = 'img/delete-notes.png';
      deleteImage.alt = 'Удалить';
      deleteButton.appendChild(deleteImage);
  
      noteDiv.appendChild(deleteButton);
      noteContainer.appendChild(noteDiv);
  
      noteDiv.addEventListener('click', () => {
        noteDiv.classList.toggle('fullscreen');
        const isFullscreen = noteDiv.classList.contains('fullscreen');
      
        notes.forEach(function(otherNote, otherIndex) {
          const otherNoteDiv = noteContainer.children[otherIndex];
          if (otherIndex !== index) {
            otherNoteDiv.style.display = isFullscreen ? 'none' : 'flex';
          }
        });
        // Добавляем код для установки стилей canvas-item-1
        const canvasItem1 = document.querySelector('.canvas-item-1');
        if (isFullscreen) {
            canvasItem1.style.alignItems = 'center';
            canvasItem1.style.justifyContent = 'center';
        } else {
            // Если не в fullscreen, удаляем стили
            canvasItem1.style.alignItems = '';
            canvasItem1.style.justifyContent = '';
        }
      });
      noteContainer.appendChild(noteDiv);
    });
    toggleEmptyDivVisibility();
}

// Удаление заметки по индексу
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];

  // Проверяем, хочет ли пользователь действительно удалить заметку
  const shouldDelete = confirm('Вы уверены, что хотите удалить эту заметку?');

  if (shouldDelete) {
    // Удаляем заметку по индексу
    notes.splice(index, 1);

    // Сохраняем обновленный список заметок в localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Обновляем список заметок на странице
    loadNotes();
  }
  toggleEmptyDivVisibility();
}

// Add this code after your existing JavaScript
function toggleEmptyDivVisibility() {
  const noteContainer = document.getElementById('noteContainer');
  const emptyDiv = document.querySelector('.canvas-item-empty');
  
  if (noteContainer.children.length === 0) {
    emptyDiv.style.display = 'flex';
  } else {
    emptyDiv.style.display = 'none';
  }
}

// Call the function to set the initial visibility
toggleEmptyDivVisibility();
