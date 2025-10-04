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
    const logoutIconElement = document.getElementById("logoutIcon");
    const searchIconElement = document.getElementsByClassName("searchIcon"); // NEW

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
        // if (searchIconElement) { // NEW: Show search icon
        //     Array.from(searchIconElement).forEach(icon => {
        //         icon.style.top = '99px';
        //     });
        // }
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


function userLogout() {
   
    localStorage.removeItem("loggedInUser");
    
    
    updateHeaderAuthUI();
    
    alert("Logged out successfully!");
}

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderAuthUI();
    
    
    const logoutBtn = document.getElementById("logoutIcon");
    if (logoutBtn) {
        logoutBtn.addEventListener('click', userLogout);
    }
});

function getProducts() {
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((result) => showProduct(result))
        .catch(error => console.error('Error fetching products:', error)); 
}





function showProduct(result) {
    const { products } = result;
    let cardElementContainer = document.getElementById('product-listing-container'); 
    
    if (!cardElementContainer) return; 
    
    let productHTML = ''; 

    products.forEach((element) => { 
        const { thumbnail, price, title, description, id, brand } = element;
        
        productHTML += `
        <a href='./product.html?id=${id}' target="_blank" style="text-decoration: none; color: inherit;">
            <div id="product-card">
                <div id="product-front">
                    <div class="shadow"></div>
                    <img src="${thumbnail}" alt="${title}" />
                    <div class="image_overlay"></div>
                    <div id="view_details">View details</div>
                    <div class="stats">
                        <div class="stats-container">
                            <span class="product_price">$${price}</span>
                            <span class="product_name">${title}</span>
                            <p>${description.substring(0, 50)}...</p>

                            <div class="product-options">
                                <strong>Brand:</strong>
                                <span>${brand}</span> 
                                <strong>SIZE</strong>
                                <span>S, M, L</span>
                                <strong>COLORS</strong>
                                <div class="colors">
                                    <div class="c-blue"><span></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="product-back">
                    <div class="shadow"></div>
                    <div id="flip-back">
                        <div id="cy"></div>
                        <div id="cx"></div>
                    </div>
                </div>
            </div>
        </a>
        `;
    });
    
    cardElementContainer.innerHTML = productHTML;
}

// =======================================================
// PART C: INITIALIZATION (Run the functions when the page loads)
// =======================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup the login/logout UI
    updateHeaderAuthUI();
    
    // 2. Attach the click handler for logout
    const logoutBtn = document.getElementById("logoutIcon");
    if (logoutBtn) {
        // Prevent default navigation to login2.html and run our logout function
        logoutBtn.parentElement.addEventListener('click', (e) => {
             e.preventDefault(); // Stop the <a> tag from running
             userLogout();
        });
    }
});