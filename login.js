import { navToRegistration } from "./registration.js";


export const navToLogin = () => {
    // Hide the static page and display the login content
    document.getElementById("staticpage").style.display = 'none';
    content.style.display = 'block';
    // Set the HTML content for the login form
    content.innerHTML = `
            <div class="login">
            <h2 class="text-center f-64 abz form-heading">Welcome to <span class="jua">Talkies</span></h2>
            <h3 class="text-center f-48 abz form-heading">Lets have some talks</h3>
            <div class="form">
                <input id="loginEmail" class="input_box" type="text" name="email" id="" placeholder="email@gmail.com"/>
                    <input id="loginPass" class="input_box" type="text" name="email" id="" placeholder="password"/>
                    <p id="LoginError" class="error" style="display: none;">Invalid Credentials</p>
                        <h2 id="login" class="button">Login</h2>
                    </div>
                    <p class="text-center abz f-24">Not a member ? <span id="navToRegBtn" class="text-primary">Register </span> to join us</p>
            </div>`;
    // Show the login button and hide the logout button
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    // Add event listener for navigation to the registration page
    const navToRegBtn = document.getElementById("navToRegBtn");
    navToRegBtn.addEventListener('click', navToRegistration);
    // Add event listener for the login action
    const login = document.getElementById("login");
    login.addEventListener('click', userLogin);
}


export const userLogin = () => {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;
    let credentials = null;
    userList.forEach(element => {
        if (element.email == email && element.pass == pass) {
            credentials = true;
            user = element;
            console.log(user);
            renderContent();
        }

    });
    if (!credentials) {
        const loginError = document.getElementById("LoginError");
        loginError.style.display = 'block';

    }



    console.log("clicked", email, pass);
}