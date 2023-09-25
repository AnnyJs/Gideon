const workButton = document.querySelector('.work-button');
const homeButton = document.querySelector('.home-button');
const otherButton = document.querySelector('.other-button');
const canvasWork = document.querySelector('.canvas-work');
const canvasOther = document.querySelector('.canvas-other');
const canvasItem1 = document.querySelector('.canvas-item-1');
const canvasEmpty = document.querySelector('.canvas-item-empty');
const canvasCreateForm = document.querySelector('.create-form');
const canvasCreateFormButton = document.querySelector('.confirm-button');

// Функция для сохранения состояния в localStorage
function saveStateToLocalStorage(state) {
  localStorage.setItem('selectedState', state);
}

// Функция для загрузки состояния из localStorage
function loadStateFromLocalStorage() {
  return localStorage.getItem('selectedState');
}

// Функция для управления состоянием
function handleState(state) {
  switch (state) {
    case 'work':
      canvasWork.style.display = 'flex';
      canvasItem1.style.display = 'none';
      canvasOther.style.display = 'none';
      canvasEmpty.style.display = 'none';
      canvasCreateForm.style.display = 'none';
      canvasCreateFormButton.style.display = 'none';
      document.getElementById('block-right').classList.add('inactive');
      break;
    case 'home':
      canvasWork.style.display = 'none';
      canvasItem1.style.display = 'flex';
      canvasOther.style.display = 'none';
      toggleEmptyDivVisibility();
      document.getElementById('block-right').classList.remove('inactive');
      break;
    case 'other':
      canvasWork.style.display = 'none';
      canvasItem1.style.display = 'none';
      canvasOther.style.display = 'flex';
      canvasCreateForm.style.display = 'none';
      canvasCreateFormButton.style.display = 'none';
      document.getElementById('block-right').classList.add('inactive');
      break;
    default:
      break;
  }
}

// Загружаем состояние из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const selectedState = loadStateFromLocalStorage();
  if (selectedState) {
    handleState(selectedState);
  }
});

workButton.addEventListener('click', () => {
  handleState('work');
  saveStateToLocalStorage('work');
});

homeButton.addEventListener('click', () => {
  handleState('home');
  saveStateToLocalStorage('home');
});

otherButton.addEventListener('click', () => {
  handleState('other');
  saveStateToLocalStorage('other');
});
