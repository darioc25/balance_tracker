const activeUserInfo = document.querySelector(".active-user");
const newUser = document.querySelector(".new-user");

// Add User Input
const userFirstnameInput = document.querySelector(".user-firstname-input");
const userLastnameInput = document.querySelector(".user-lastname-input");
const iconsList = document.querySelectorAll(".custom-user-icon");
const addUserBtn = document.querySelector(".add-user-btn");
// Add User Preview
const userIconPreview = document.querySelector(".user-icon-preview");
const userFirstnamePreview = document.querySelector(".user-firstname-preview");
const userLastnamePreview = document.querySelector(".user-lastname-preview");

// Module Container
const addUserModuleContainer = document.querySelector(".add-user-module-container");

// Global Data
let userInSession;
let selectedIcon = "";

// Function
const renderModule = function(moduleName) {
    moduleName.classList.remove("no-render");
    setTimeout(() => moduleName.style.opacity = 100, 100);
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

// Event
userFirstnameInput.addEventListener("input", () => {
    userFirstnamePreview.textContent = userFirstnameInput.value;
});

userLastnameInput.addEventListener("input", () => {
    userLastnamePreview.textContent = userLastnameInput.value;
});

addUserBtn.addEventListener("click", () => {
    const user = {
        firstName: userFirstnameInput.value,
        lastName: userLastnameInput.value,
        userIcon: selectedIcon,
        userCreation: new Intl.DateTimeFormat("it-IT").format(new Date()),
        movements: {}
    };
    userFirstnameInput.value = "";
    userLastnameInput.value = "";
    userIconPreview.innerHTML = '<i class="fa-solid fa-user"></i>';
    userFirstnamePreview.textContent = "";
    userLastnamePreview.textContent = "";
    console.log(user);
});

// Sidebar Item
newUser.addEventListener("click", () => renderModule(addUserModuleContainer));