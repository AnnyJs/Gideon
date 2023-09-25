const select1 = document.querySelector('.sl-1');
const select2 = document.querySelector('.sl-2');
const select3 = document.querySelector('.sl-3');
const theme1 = document.querySelector('.theme-1');
const theme2 = document.querySelector('.theme-2');
const theme3 = document.querySelector('.theme-3');

function fadeIn(element) {
    let opacity = 0;
    element.style.display = 'flex';

    function increaseOpacity() {
        opacity += 0.03;
        element.style.opacity = opacity;
        if (opacity < 1) {
            requestAnimationFrame(increaseOpacity);
        }
    }

    increaseOpacity();
}

function fadeOut(element) {
    let opacity = 1;

    function decreaseOpacity() {
        opacity -= 0.03;
        element.style.opacity = opacity;
        if (opacity > 0) {
            requestAnimationFrame(decreaseOpacity);
        } else {
            element.style.display = 'none';
        }
    }

    decreaseOpacity();
}

function setSelectedOption(option) {
    localStorage.setItem('selectedOption', option);
}

function getSelectedOption() {
    return localStorage.getItem('selectedOption');
}

function applySelectedOption() {
    const selectedOption = getSelectedOption();

    if (selectedOption === 'select1') {
        fadeOut(theme2);
        fadeOut(theme3);
        fadeIn(theme1);
    } else if (selectedOption === 'select2') {
        fadeOut(theme1);
        fadeOut(theme3);
        fadeIn(theme2);
    } else if (selectedOption === 'select3') {
        fadeOut(theme1);
        fadeOut(theme2);
        fadeIn(theme3);
    }
}

// Event listeners with local storage
select1.addEventListener('click', () => {
    setSelectedOption('select1');
    applySelectedOption();
});

select2.addEventListener('click', () => {
    setSelectedOption('select2');
    applySelectedOption();
});

select3.addEventListener('click', () => {
    setSelectedOption('select3');
    applySelectedOption();
});

// Apply selected option on page load
document.addEventListener('DOMContentLoaded', () => {
    applySelectedOption();
});
