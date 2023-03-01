const activeUserInfo = document.querySelector(".active-user");
const newUser = document.querySelector(".new-user");

// Module Container
const addUserModuleContainer = document.querySelector(".add-user-module-container");

// Global Data
let userInSession;

// Function
const renderModule = function(moduleName) {
    moduleName.classList.remove("no-render");
    setTimeout(() => moduleName.style.opacity = 100, 100);
};

// Sidebar Item
newUser.addEventListener("click", () => renderModule(addUserModuleContainer));