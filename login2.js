function signup()
{
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";

};

function login()
{
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";

}










class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName,
            this.lastName = lastName,
            this.fullName = firstName + " " + lastName,
            this.email = email,
            this.password = password
    }

}

let users = JSON.parse(localStorage.getItem("users")) || []

function userSignUp(event) {
    event.preventDefault()
    let firstName = document.getElementById("firstName")
    let lastName = document.getElementById("lastName")
    let email = document.getElementById("email") // user ne type kea he ye email
    let password = document.getElementById("password")

    const savedData = JSON.parse(localStorage.getItem("users")) || []

    let result = savedData.find((element) => element.email == email.value)
    if (result?.email) {
        alert("user already exist")
    } else {
        console.log(firstName.value, lastName.value, email.value, password.value)
        let user = new User(firstName.value, lastName.value, email.value, password.value)
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users))
    }
}


// const detail = {
//     userName: "Arham",
//     age: 23
// }

// let { userName, age } = detail // destructing hai ye
// console.log(userName)

function userSignIn(event) {
    event.preventDefault()
    let userEmail = document.getElementById("user-email")
    let userPassword = document.getElementById("user-password")

    let loggedInUser = users.find((element) => element.email === userEmail.value && element.password === userPassword.value)

    if (loggedInUser) {
        alert("login successful")
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
        window.location.href = "index.html"   // login hone ke baad index pe bhej do
    } else {
        alert("invalid email or password")
    }
}

// In script.js (This file is linked to index.html)

// In script.js (linked to index.html)

function updateHeaderAuthUI() {
    // 1. Get the data saved by login2.js
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    // 2. Get the elements we need to show/hide
    const loginTextElement = document.getElementById("loginText");
    const userIconElement = document.getElementById("userIcon");
    const logoutIconElement = document.getElementById("logoutIcon"); // NEW

    if (loggedInUser) {
        // If logged in: Hide Login Text, Show User Icon, Show Logout Icon
        if (loginTextElement) {
            loginTextElement.style.display = 'none';
        }
        if (userIconElement) {
            userIconElement.style.display = 'block';
        }
        if (logoutIconElement) { // NEW: Show logout icon
            logoutIconElement.style.display = 'block';
        }
    } else {
        // If logged out (or not logged in): Show Login Text, Hide Icons
        if (loginTextElement) {
            loginTextElement.style.display = 'block';
        }
        if (userIconElement) {
            userIconElement.style.display = 'none';
        }
        if (logoutIconElement) { // NEW: Hide logout icon
            logoutIconElement.style.display = 'none';
        }
    }
}

// 3. Define the Logout Function (NEW FUNCTION)
function userLogout() {
    // 1. Remove the logged-in user data
    localStorage.removeItem("loggedInUser");
    
    // 2. Update the UI immediately without reloading
    updateHeaderAuthUI();

    // OPTIONAL: Reload the page to ensure all components are reset
    // window.location.reload(); 
    // OR: Redirect to the home page if you want to clear the URL history
    // window.location.href = "index.html"; 
    
    alert("Logged out successfully!");
}


// Run the UI update when the page finishes loading
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderAuthUI();
    
    // Add event listener for the new logout function
    const logoutBtn = document.getElementById("logoutIcon");
    if (logoutBtn) {
        logoutBtn.addEventListener('click', userLogout);
    }
});