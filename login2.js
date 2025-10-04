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
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))
    window.location.href = "index.html"
    if (loggedInUser) {
        alert("login successful")
document.getElementById("sellIcon").classList.add("userIconCls")
    } else {
        alert("invalid email or password")
    }   
}