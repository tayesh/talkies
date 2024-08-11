import { userLogin,navToLogin } from './login.js';
export const navToRegistration = () => {
    // Hide the static page and display the registration content
    document.getElementById("staticpage").style.display = 'none';
    content.style.display = 'block';
    // Set the HTML content for the registration form
    content.innerHTML = `
            <div class="login">
            <h2 class="text-center f-64 abz form-heading">Welcome to <span class="jua">Talkies</span></h2>
            <h3 class="text-center f-48 abz form-heading">Lets have some talks</h3>
            <form class="form">
                <input id="regEmail" class="input_box" type="text" name="email" id="" placeholder="email@gmail.com"/>
                    <input id="regPass" class="input_box" type="text" name="email" id="" placeholder="password" required/>
                    <input id="regConfPass" class="input_box" type="text" name="email" id="" placeholder="confirm password"/>
                    <p id="passMatchError" class="error" style="display: none;">please confirm the password correctly</p>
                        <h2 id="registration" class="button">Registration</h2>
                    </div>
                    <p class="text-center abz f-24">Already a member ? <span id="navToLoginBtn1" class="text-primary">Login </span></p>
            </form>`;
    // Show the login button and hide the logout button
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    // Add event listener for navigation to the login page
    const navToLoginBtn1 = document.getElementById("navToLoginBtn1");
    navToLoginBtn1.addEventListener('click', navToLogin);
    // Add event listener for the registration action
    const registration = document.getElementById("registration");
    registration.addEventListener('click', userReg);
}
export const userReg = () => {
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPass").value;
    const confPass = document.getElementById("regConfPass").value;
    const error = document.getElementById("passMatchError");
    if (pass != confPass) {

        error.style.display = "block"
    }
    else {
        error.style.display = "none";
        const user = {
            email,
            pass
        }
        userList.push(user);
        alert("successfully registered. please login");
        navToLogin();

    }
    console.log(email, pass, confPass);
}