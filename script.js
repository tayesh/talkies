let user = null;
const userList = [];
const posts = [];
const loginButton = document.getElementById("navlogin");

const logoutButton = document.getElementById("logout");

const Name = document.getElementById('name');
const content = document.getElementById("content");
const signupButton = document.getElementById('signup');


Name.addEventListener('click', function () {
    if (user) {

        navToHome();

    }
    else {
        document.getElementById("staticpage").style.display = 'block';
        content.style.display = 'none';

    }

})

const renderContent = () => {
    if (user) {
        document.getElementById('home').style.display = 'block'
        document.getElementById('home').addEventListener('click', navToHome);
        document.getElementById('profile').style.display = 'block'
        document.getElementById('profile').addEventListener('click', navToProfile)
        navToHome();
    }
    else {
        document.getElementById('home').style.display = 'none'
        document.getElementById('profile').style.display = 'none'

        if (userList[0]) {
            // console.log(userList[0]);
            navToLogin();
        }
        else {
            document.getElementById("staticpage").style.display = 'block';
            content.style.display = 'none';
            console.log(userList[0]);
        }

    }
}
const navToLandingPage = () => {
    content.innerHTML = `
    <div class="login">
    
    </div>`;

}






const navToLogin = () => {
    document.getElementById("staticpage").style.display = 'none';
    content.style.display = 'block';
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
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    const navToRegBtn = document.getElementById("navToRegBtn");
    navToRegBtn.addEventListener('click', navToRegistration);
    const login = document.getElementById("login");
    login.addEventListener('click', userLogin);
}
loginButton.addEventListener('click', navToLogin);
const navToRegistration = () => {
    document.getElementById("staticpage").style.display = 'none';
    content.style.display = 'block';
    content.innerHTML = `
            <div class="login">
            <h2 class="text-center f-64 abz form-heading">Welcome to <span class="jua">Talkies</span></h2>
            <h3 class="text-center f-48 abz form-heading">Lets have some talks</h3>
            <div class="form">
                <input id="regEmail" class="input_box" type="text" name="email" id="" placeholder="email@gmail.com"/>
                    <input id="regPass" class="input_box" type="text" name="email" id="" placeholder="password"/>
                    <input id="regConfPass" class="input_box" type="text" name="email" id="" placeholder="confirm password"/>
                    <p id="passMatchError" class="error" style="display: none;">please confirm the password correctly</p>
                        <h2 id="registration" class="button">Registration</h2>
                    </div>
                    <p class="text-center abz f-24">Already a member ? <span id="navToLoginBtn1" class="text-primary">Login </span></p>
            </div>`;
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
    const navToLoginBtn1 = document.getElementById("navToLoginBtn1");
    navToLoginBtn1.addEventListener('click', navToLogin);
    const registration = document.getElementById("registration");
    registration.addEventListener('click', userReg);





}
const navToProfile = () => {
    content.innerHTML = `<div>
        <div>

        </div>
        <div class="profileinfoCollector">
            <input class="input_box" type="text" placeholder="Name">
            <input class="input_box" type="text" placeholder="Proffession">
            <input class="input_box" type="text" placeholder="City">
            <div class="dropdown-container">
                <select id="gender" name="gender">
                    <option value="" disabled selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </div>
    </div>`
    document.getElementById('home').style.borderBottom = 'none'
    document.getElementById('profile').style.borderBottom = '2px solid black'
    document.getElementById('notifications').style.borderBottom = 'none'
    document.getElementById('gender').addEventListener('change', function () {
        const selectedGender = this.options[this.selectedIndex].text;
        // document.getElementById('selected-gender').innerText = 'Selected Gender: ' + selectedGender;
        console.log(selectedGender);
    });

}
const navToNotifications = () => {
    content.innerHTML = `<h2>hello from notifications</h2>`
    document.getElementById('home').style.borderBottom = 'none'
    document.getElementById('profile').style.borderBottom = 'none   '
    document.getElementById('notifications').style.borderBottom = '2px solid black'

}
const navToHome = () => {
    content.innerHTML = ` <div class="postboxContainer">
        <div class="pstbx">
            <textarea name="" id="postbox" placeholder="Share your Thought" >   
            </textarea>
            <img id="postbtn" style="cursor: pointer;" class="postbtn" src="https://i.ibb.co/BPm4ZKJ/image.png" />
            
        </div>
        <div  class="addPhotos">
            <div id="uploadArea" style="cursor: pointer; padding:30px; border-radius: 10px ;" class="addPhotos hoverEffect">
                <img src="https://i.ibb.co/nQxHrgj/image.png"/>
            <h2  class="abz">Add Photos</h2>
                <input type="file" id="file-input" accept="image/*" style="display: none;" />
            </div>
            <div>
                <svg id="deleteImgBtn" class="imgDeleteButton" style="display: none;"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 26 26"
                style="fill:#FA5252;">
                <path d="M 13 0.1875 C 5.925781 0.1875 0.1875 5.925781 0.1875 13 C 0.1875 20.074219 5.925781 25.8125 13 25.8125 C 20.074219 25.8125 25.8125 20.074219 25.8125 13 C 25.8125 5.925781 20.074219 0.1875 13 0.1875 Z M 18.78125 17.394531 L 17.390625 18.78125 C 17.136719 19.035156 16.722656 19.035156 16.46875 18.78125 L 13 15.3125 L 9.53125 18.78125 C 9.277344 19.035156 8.863281 19.035156 8.609375 18.777344 L 7.21875 17.394531 C 6.96875 17.136719 6.96875 16.726563 7.21875 16.46875 L 10.6875 13 L 7.222656 9.535156 C 6.96875 9.277344 6.96875 8.863281 7.222656 8.609375 L 8.609375 7.222656 C 8.863281 6.964844 9.28125 6.964844 9.535156 7.222656 L 13 10.6875 L 16.46875 7.222656 C 16.722656 6.964844 17.140625 6.964844 17.390625 7.222656 L 18.78125 8.605469 C 19.035156 8.863281 19.035156 9.277344 18.78125 9.535156 L 15.3125 13 L 18.78125 16.46875 C 19.03125 16.726563 19.03125 17.136719 18.78125 17.394531 Z"></path>
                </svg>
                <img id="preview" style="display: none;" />
            </div>
            
        </div>
        <div id="posts">
        </div>
            
    </div>`;
    document.getElementById('postbox').value = null;
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    document.getElementById('uploadArea').addEventListener('click', function () {
        document.getElementById('file-input').click();
    });
    let image = null;

    document.getElementById('file-input').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('uploadArea').style.display = 'none';
                const preview = document.getElementById('preview');
                const deleteButton = document.getElementById('deleteImgBtn');
                preview.src = e.target.result;
                preview.style.display = 'block';
                deleteButton.style.display = 'block';
                const handleImgDlt = () => {
                    preview.src = ''; // Clear the image preview src
                    preview.style.display = 'none'; // Hide the image preview
                    deleteButton.style.display = 'none'; // Hide the delete button
                    uploadArea.style.display = 'flex';
                }
                image = e.target.result;




                deleteButton.addEventListener('click', handleImgDlt);
                preview.style.height = '260px'
            }
            reader.readAsDataURL(file);

        }
    });
    const post = () => {
        const postText = document.getElementById('postbox').value;
        console.log(postText, image);

    }
    document.getElementById('postbtn').addEventListener('click', post);
    document.getElementById('home').style.borderBottom = '2px solid black'
    document.getElementById('profile').style.borderBottom = 'none'


}
const userLogin = () => {
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
const userReg = () => {
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
const logout = () => {
    user = null;
    renderContent();

}
signupButton.addEventListener('click', navToRegistration);
logoutButton.addEventListener('click', logout);

renderContent();


