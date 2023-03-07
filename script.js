const activeUserInfo = document.querySelector(".active-user");

// Sidebar Buttons
const newUser = document.querySelector(".new-user");
const usersList = document.querySelector(".users-list");

// Add User Input
const userFirstnameInput = document.querySelector(".user-firstname-input");
const userLastnameInput = document.querySelector(".user-lastname-input");
const iconsList = document.querySelectorAll(".custom-user-icon");
const addUserBtn = document.querySelector(".add-user-btn");
// Add User Preview
const userIconPreview = document.querySelector(".user-icon-preview");
const userFirstnamePreview = document.querySelector(".user-firstname-preview");
const userLastnamePreview = document.querySelector(".user-lastname-preview");
const colorsList = document.querySelectorAll(".user-logo-color");

// Module Container
const addUserModuleContainer = document.querySelector(".add-user-module-container");
const usersListModuleContainer = document.querySelector(".users-list-module-container");

const moduleList = [addUserModuleContainer, usersListModuleContainer];

// List Element
const listElement = document.querySelector(".users-list-table");

// Global Data
let userInSession;
let selectedIcon = "";
let selectedColor  = "";

// Function
const renderModule = function(moduleName) {
    moduleName.classList.remove("no-render");
    setTimeout(() => moduleName.style.opacity = 100, 100);
};

const noRenderModule = function(moduleName) {
    for(let i = 0; i < moduleList.length; i++) {
        if(moduleName != moduleList[i]) {
            moduleList[i].classList.add("no-render");
            moduleList[i].style.opacity = 0;
        }
    };
};

const iconSelection = function() {
    for(let i = 0; i < iconsList.length; i++) {
        iconsList[i].addEventListener("click", () => {
            selectedIcon = `<i class="${iconsList[i].classList[1]} ${iconsList[i].classList[2]}"></i>`
            userIconPreview.innerHTML = selectedIcon;
        });
    };
};

iconSelection();

const colorSelection = function() {
    for(let i = 0; i < colorsList.length; i++) {
        colorsList[i].addEventListener("click", () => {
            selectedColor = colorsList[i].classList[1];
            userIconPreview.classList[1] && userIconPreview.classList.remove(userIconPreview.classList[1]);
            userIconPreview.classList.add(selectedColor);
        });
    }
};

colorSelection();

const userKeyGenerator = function() {
    const charList = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let key = "";
    for(let i = 0; i < 8; i++) {
        key += charList[Math.floor(Math.random() * charList.length)];
    };
    return key;
};

// Event
userFirstnameInput.addEventListener("input", () => {
    userFirstnamePreview.textContent = userFirstnameInput.value;
});

userLastnameInput.addEventListener("input", () => {
    userLastnamePreview.textContent = userLastnameInput.value;
});

addUserBtn.addEventListener("click", () => {
    if(userFirstnameInput.value != "" && userLastnameInput.value != "") {
        // User Object Creation
        const user = {
            userKey: userKeyGenerator(),
            firstName: userFirstnameInput.value,
            lastName: userLastnameInput.value,
            userSetting: {icon: selectedIcon ? selectedIcon : '<i class="fa-solid fa-user"></i>', color: selectedColor ? selectedColor : "user-logo-color-1"},
            userCreationData: new Intl.DateTimeFormat("it-IT").format(new Date()),
            movements: []
        };
        // Reset Global Data
        selectedIcon = "";
        selectedColor = "";
        // Reset Fields
        localStorage.setItem(user.userKey, JSON.stringify(user));
        userFirstnameInput.value = "";
        userLastnameInput.value = "";
        userIconPreview.classList.remove(userIconPreview.classList[1]);
        userIconPreview.innerHTML = '<i class="fa-solid fa-user"></i>';
        userFirstnamePreview.textContent = "";
        userLastnamePreview.textContent = "";
        // Input Fields Errors Reset
        userFirstnameInput.style = 0;
        userFirstnameInput.placeholder = "";
        userLastnameInput.style = 0;
        userLastnameInput.placeholder = "";
    // Error Warnings
    } else {
        if(!userFirstnameInput.value) {
            userFirstnameInput.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
            userFirstnameInput.placeholder = "*Required field!";
        };
        if(!userLastnameInput.value) {
            userLastnameInput.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
            userLastnameInput.placeholder = "*Required field!";
        };
    }
});

// Sidebar Item
newUser.addEventListener("click", () => {
    renderModule(addUserModuleContainer);
    noRenderModule(addUserModuleContainer);
});

usersList.addEventListener("click", () => {
    renderModule(usersListModuleContainer);
    noRenderModule(usersListModuleContainer);
    const usersLocalStorage = [];
    for(user of Object.values(localStorage)) {
        usersLocalStorage.push(JSON.parse(user));
    };
    listElement.innerHTML = `
        <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Account Creation</th>
            <th>Action</th>
        </tr>
    `;
    usersLocalStorage.forEach(user => {
        const userRow = document.createElement("tr");
        userRow.innerHTML = `
            <td class="users-list-icon-container">${user.userSetting.icon}</td>
            <td class="users-list-item-data">${user.firstName}</td>
            <td class="users-list-item-data">${user.lastName}</td>
            <td class="users-list-item-data">${user.userCreationData}</td>
            <td><button class="users-list-item-button">Login</button></td>
        `;
        listElement.appendChild(userRow);
        userRow.querySelector(".users-list-icon-container").querySelector("i").classList.add("users-list-item-icon");
        userRow.querySelector(".users-list-icon-container").querySelector("i").classList.add(`${user.userSetting.color}`);
    });
});