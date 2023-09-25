document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-button');
    let lastClickTime = 0;

    searchButton.addEventListener('click', function() {
        const currentTime = Date.now();

        if (currentTime - lastClickTime > 4000) {
            lastClickTime = currentTime;
            performSearch();
        }
    });

    const cancelSearchButton = document.querySelector('.cansel-search-notes');

    cancelSearchButton.addEventListener('click', function() {
        clearHighlight();
    });

    const searchNotesInput = document.getElementById('searchNotes');
    const canselSearchNotes = document.querySelector('.cansel-search-notes');

    searchNotesInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            canselSearchNotes.style.display = 'none';
        } else {
            canselSearchNotes.style.display = 'flex';
        }
    });
});

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function performSearch() {
    const searchTerm = document.getElementById('searchNotes').value.trim().toLowerCase();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteContainer = document.getElementById('noteContainer');
    const notesDivs = noteContainer.getElementsByClassName('note');

    clearHighlight(); // Очищаем предыдущее выделение

    if (searchTerm === "") {
        return;
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.description.toLowerCase().includes(searchTerm)
    );

    renderSearchResults(filteredNotes, notesDivs, searchTerm);
}

function clearHighlight() {
    const highlightedElements = document.querySelectorAll('.highlighted');
    highlightedElements.forEach(element => {
        element.classList.remove('highlighted');
    });
}

function renderSearchResults(results, notesDivs, searchTerm) {
    const noteContainer = document.getElementById('noteContainer');

    if (results.length === 0) {
        noteContainer.innerHTML = '<p>Ничего не найдено.</p>';
        return;
    }

    let firstResultDiv = null;

    results.forEach(note => {
        Array.from(notesDivs).forEach(noteDiv => {
            if (noteDiv.textContent.includes(note.title) || noteDiv.textContent.includes(note.description)) {
                const titleHTML = noteDiv.querySelector('h1').innerHTML;
                const descriptionHTML = noteDiv.querySelector('.description').innerHTML;

                const escapedTitle = escapeRegExp(note.title);
                const escapedDescription = escapeRegExp(note.description);

                noteDiv.querySelector('h1').innerHTML = titleHTML.replace(new RegExp(escapedTitle, 'gi'), '<span class="highlighted">$&</span>');
                noteDiv.querySelector('.description').innerHTML = descriptionHTML.replace(new RegExp(escapedDescription, 'gi'), '<span class="highlighted">$&</span>');

                if (!firstResultDiv) {
                    firstResultDiv = noteDiv;
                }
            }
        });
    });

    if (firstResultDiv) {
        firstResultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}


const canselSearchNotes = document.querySelector('.cansel-search-notes');
const searchButton = document.querySelector('.search-button');
const searchNotesInput = document.getElementById('searchNotes');
const highlighted = document.querySelector('.highlighted');

function cancelSearchNotes() {
    searchNotesInput.value = ''; // Очищаем поле ввода
    canselSearchNotes.style.display = 'none'; // Скрываем элемент .cansel-search-notes
}

canselSearchNotes.addEventListener('click', () => {
    canselSearchNotes.style.display = 'flex';
});

// Добавляем обработчик для кнопки cansel-search-notes
canselSearchNotes.addEventListener('click', cancelSearchNotes);