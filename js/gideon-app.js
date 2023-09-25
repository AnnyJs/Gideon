function createApp() {
  var appName = document.getElementById("inputName").value;
  var appLink = document.getElementById("inputLink").value;

  if (appName && appLink) {
    var appBar = document.querySelector(".app-bar");
    var appContainers = appBar.querySelectorAll(".app");

    if (appContainers.length < 6) {
      var appContainer = document.createElement("div");
      appContainer.classList.add("app");

      var faviconUrl = getFaviconUrl(appLink);

      if (faviconUrl) {
          appContainer.innerHTML = `
              <a class="app-item" href="${appLink}" target="_blank">
                  <img src="${faviconUrl}">
                  <span class="app-name">${appName}</span>
              </a>
              <div class="delete-app" onclick="deleteApp(this)" data-app-name="${appName}" data-app-link="${appLink}">
                  <img src="img/delete-app.svg">
              </div>
          `;
      } else {
          appContainer.innerHTML = `
              <a class="app-item" href="${appLink}" target="_blank">
                  <span class="app-name">${appName}</span>
              </a>
              <div class="delete-app" onclick="deleteApp(this)" data-app-name="${appName}" data-app-link="${appLink}">
                  <img src="img/delete-app.svg">
              </div>
          `;
      }

      appBar.appendChild(appContainer);

      var deleteAppElement = appContainer.querySelector('.delete-app');
      deleteAppElement.style.display = 'none';
      appContainer.addEventListener('mouseenter', function() {
          deleteAppElement.style.display = 'flex';
      });
      appContainer.addEventListener('mouseleave', function() {
          deleteAppElement.style.display = 'none';
      });

      document.getElementById("inputName").value = "";
      document.getElementById("inputLink").value = "";

      var appForm = document.querySelector(".app-form");
      appForm.style.display = "none";

      var apps = JSON.parse(localStorage.getItem('apps')) || [];
      apps.push({
          name: appName,
          link: appLink
      });
      localStorage.setItem('apps', JSON.stringify(apps));

      setTimeout(function() {
          var appNames = appContainer.querySelectorAll('.app-name');
          appNames.forEach(function(appName) {
              appName.style.opacity = '1';
          });
      }, 1000);
    } else {
      alert("Maximum number of apps reached (6)");
      var appForm = document.querySelector(".app-form");
      appForm.style.display = "none";
    }
  }
}





function getFaviconUrl(url) {
  try {
    var hostname = new URL(url).hostname;
    return `https://api.faviconkit.com/${hostname}/64`;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function deleteApp(element) {
  var appName = element.dataset.appName;
  var appLink = element.dataset.appLink;

  var apps = JSON.parse(localStorage.getItem('apps')) || [];
  apps = apps.filter(function(app) {
    return !(app.name === appName && app.link === appLink);
  });

  localStorage.setItem('apps', JSON.stringify(apps));

  var appContainer = element.parentNode;
  appContainer.remove();
}

document.querySelector(".app-create").addEventListener("click", function() {
  var appForm = document.querySelector(".app-form");
  appForm.style.display = "flex";
});

document.addEventListener('DOMContentLoaded', function() {
    var apps = JSON.parse(localStorage.getItem('apps')) || [];
    var appBar = document.querySelector(".app-bar");
    
    
    apps.forEach(function(app) {
        var appContainer = document.createElement("div");
        appContainer.classList.add("app");
        appContainer.classList.add("app-fade-in");

        var faviconUrl = getFaviconUrl(app.link);
        if (faviconUrl) {
            appContainer.innerHTML = `
                <a class="app-item" href="${app.link}" target="_blank">
                    <img src="${faviconUrl}">
                    <span class="app-name">${app.name}</span>
                </a>
                <div class="delete-app" onclick="deleteApp(this)" data-app-name="${app.name}" data-app-link="${app.link}">
                    <img src="img/delete-app.svg">
                </div>
            `;
        } else {
            appContainer.innerHTML = `
                <a class="app-item" href="${app.link}" target="_blank">
                    <span class="app-name">${app.name}</span>
                </a>
                <div class="delete-app" onclick="deleteApp(this)" data-app-name="${app.name}" data-app-link="${app.link}">
                    <img src="img/delete-app.svg">
                </div>
            `;
        }


        appBar.appendChild(appContainer);

        var deleteAppElement = appContainer.querySelector('.delete-app');

        // Добавляем обработчик события для появления delete-app при наведении на него
        deleteAppElement.style.display = 'none';
        appContainer.addEventListener('mouseenter', function() {
            deleteAppElement.style.display = 'flex';
        });

        // Добавляем обработчик события для скрытия delete-app при уходе курсора с элемента
        appContainer.addEventListener('mouseleave', function() {
            deleteAppElement.style.display = 'none';
        });
    });
});


// Находим все элементы с классом app-form-button-close
const closeButton = document.querySelectorAll('.app-form-button-close');

// Добавляем обработчик события для каждой кнопки
closeButton.forEach(function(button) {
    button.addEventListener('click', function() {
        const appFormClose = this.closest('.app-form');
        appFormClose.style.display = 'none';
    });
});