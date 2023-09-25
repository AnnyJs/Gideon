/* animation-tabs */
function toggleTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const tabContainer = document.querySelector('.tab-container');
    const blockBottomRight = document.querySelector('.block-bottom-right');

    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
            const span = tab.querySelector('span');
            if (!span) {
                const newSpan = document.createElement('span');
                if (i === 0) {
                    newSpan.innerText = 'Home';
                } else if (i === 1) {
                    newSpan.innerText = 'Work';
                } else if (i === 2) {
                    newSpan.innerText = 'Other';
                }
                tab.appendChild(newSpan);
            }
        } else {
            tab.classList.remove('active');
            const span = tab.querySelector('span');
            if (span) {
                span.remove();
            }
        }
    });

    if (index === 1 || index === 2) {
        blockBottomRight.style.opacity = '0';
        blockBottomRight.style.marginRight = '-70px';
    } else {
        blockBottomRight.style.opacity = '1';
        blockBottomRight.style.marginRight = '0';
    }

    // Сохраняем индекс выбранной вкладки в Local Storage
    localStorage.setItem('selectedTabIndex', index);
}

// Проверяем, была ли сохранена выбранная вкладка в Local Storage
const savedTabIndex = localStorage.getItem('selectedTabIndex');
if (savedTabIndex !== null) {
    toggleTab(parseInt(savedTabIndex));
}
