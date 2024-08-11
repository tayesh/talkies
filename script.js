import { userLogin,navToLogin } from './login.js';
import {navToRegistration} from './registration.js'
// initialize the user as null
window.user = null;
// initialize userList as an empty array fro storing all the users temorarily.this will be removed when the site is connected to backend
window.userList = [];
// initialize posts as an empty array to store all the posts.
let posts = [];
// taking reference of login button, logout button, name in navbar, content div and signup button
window.loginButton = document.getElementById("navlogin");
window.logoutButton = document.getElementById("logout");
window.Name = document.getElementById('name');
window.content = document.getElementById("content");
window.signupButton = document.getElementById('signup');

//adding event listener for the name at the navbar
Name.addEventListener('click', function () {

    if (user) {
        // if user is available then it will navigate to the home page
        navToHome();

    }
    else {
        // if user is not available it will show the static page and hide the content div
        document.getElementById("staticpage").style.display = 'block';
        content.style.display = 'none';

    }

})





// this function works as a main function in this code..it decides what it is going to be inside the content div
window.renderContent = () => {

    if (user) {
        // if user is available showing the home button, and profile button on navbar and hiding the static page to show the 
        // content of homepage
        document.getElementById('home').style.display = 'block'
        document.getElementById('home').addEventListener('click', navToHome);
        document.getElementById('profile').addEventListener('click', navToProfile)
        document.getElementById('profile').style.display = 'block';
        document.getElementById("staticpage").style.display = 'none';
        if (user.userInfo?.userName) {
            /*here we are verifying if the user if new or not.if user has a username that means user have updated his profile information
                so we navigate directly to the home page
            */
            navToHome();
        }
        else {
            /*if user does not have a username that means the user is new and hasnt updated his profile information
                so we navigate user to the profile page
            */
            navToProfile();
        }
    }
    else {
        // If no user is logged in, hide the home and profile options, show the static page
        document.getElementById('home').style.display = 'none'
        document.getElementById('profile').style.display = 'none'

        // If any users are registered, navigate to the login page, otherwise show the static page
        if (userList[0]) {
            navToLogin();
        }
        else {
            document.getElementById("staticpage").style.display = 'block';
            content.style.display = 'none';

        }

    }
}



loginButton.addEventListener('click', navToLogin);








// -------------------------------------------Functionalites of Profile page---------------------------------------------



// Function to navigate to the profile page
const navToProfile = () => {
    // Default male and female profile images
    const male = "https://i.ibb.co/F6ZvDbJ/istockphoto-1040990130-612x612.png";
    const female = "https://i.ibb.co/Gdt5nt4/istockphoto-1040990130-612x61.png";
    // Form to update the user's profile information
    const updateProfileForm = `<div >
        <h2 class="updateProfileText abz">Your Profile Information</h2>
        <hr style="width: 50%; text-align: center; margin-bottom: 40px;">
        <div id="profileUpdate">
            <div id="profileImageContainer">
                <div id="justAnotherContainer">
                    <img id="profileImage" src="https://i.ibb.co/F6ZvDbJ/istockphoto-1040990130-612x612.png" alt="">
                </div>
                <img id="profileImageUpdateBtn" src="https://i.ibb.co/kmVswCW/upload-sign-icon-button-vector-13742369.png" alt="">
                <input type="file" id="image-input" accept="image/*" style="display: none;" />
    
            </div>
            <form id="profileForm" class="profileinfoCollector">
                <input class="input_box" type="text" name="name" placeholder="Name" required>
                <input class="input_box" type="text" name="profession" placeholder="Profession">
                <input class="input_box" type="text" name="city" placeholder="City">
                <input class="input_box" type="text" name="country" placeholder="Country">
                <div class="dropdown-container">
                    <select id="gender" class="input_box" name="gender" required>
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </form>
        </div>
        <h2 id="ProfileUpdateButton" class="button" style="max-width: 250px; text-align: center; margin:20px auto 30px;">Update</h2>
    </div>`;
    // Template for displaying the user's updated profile information
    const updatedProfile = `
    <div class="showProfileInfo">
        <img id="profilePicture" src="${user.userInfo?.image}" alt="">
        <div class="profileDetails">
            <h2 id="profileName">${user.userInfo?.userName}</h2>
            <h4 id="profileGender">(<span>${user.userInfo?.gender}</span>)</h4>
            <h3 id="profileProfession">${user.userInfo?.profession}</h3>
            <h3 id="profileAddress"><span>${user.userInfo?.city}</span>, <span>${user.userInfo?.country}</span></h3>
            
        </div>
    </div>
    `
    // If the user has profile information, display the updated profile, else show the form
    if (!user.userInfo) {
        content.innerHTML = updateProfileForm;
    }
    else {
        content.innerHTML = updatedProfile;
    }
    // changing the active style for navbar buttons
    document.getElementById('home').style.borderBottom = 'none'
    document.getElementById('profile').style.border = '2px solid black'
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';

    // Add an event listener for the gender selection dropdown
    document.getElementById('gender')?.addEventListener('change', function () {
        const selectedGender = this.options[this.selectedIndex].text;
        const profilePicture = document.getElementById("profileImage").src;
        // if the user has already selected the profile picture before picking gender then keeping it
        if (user.image) {
            document.getElementById("profileImage").src = user.image;

        }
        // if the user hasnt selected any profile picture before picking gender then assigning anonymous male or female profile picture on the basis of gender selection
        else {
            if (profilePicture != male && profilePicture != female) {

            }
            else {
                // if selected male changing the default picture to male
                if (selectedGender == 'Male') {
                    document.getElementById("profileImage").src = male;

                }
                // if selected female changing the default picture to female
                if (selectedGender == 'Female') {
                    document.getElementById("profileImage").src = female;
                }
            }
        }
    });
    // adding event listener for image selection button
    document.getElementById('profileImageUpdateBtn')?.addEventListener('click', function () {
        document.getElementById('image-input').click();
    });
    // adding event listener for the image selection input field
    document.getElementById('image-input')?.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const preview = document.getElementById('profileImage');
                preview.src = e.target.result;

            }
            reader.readAsDataURL(file);

        }
    });
    // adding event listener for the update button
    document.getElementById('ProfileUpdateButton')?.addEventListener('click', async function () {
        const form = document.getElementById('profileForm');

        // Check if the form is valid
        if (form.checkValidity()) {
            // Gather form data
            const formData = new FormData(form);

            // Example: Log data to console
            const userInfo = {
                userName: formData.get('name'),
                profession: formData.get('profession'),
                country: formData.get('country'),
                city: formData.get('city'),
                gender: formData.get('gender'),
                image: document.getElementById('profileImage').src
            }
            console.log(userInfo);
            user.userInfo = userInfo;
            document.getElementById('profile').src = userInfo.image;
            document.getElementById('profile').title = userInfo.userName;
            document.getElementById('profile').style.display = 'block';




            // Submit form data to the server or perform other actions here
            // e.g., AJAX request, fetch API, etc.

            // Example: Alert the user
            alert('Profile updated successfully!');
            await renderContent();
        } else {
            alert('Please fill out all required fields.');
        }
    });

}





// --------------------------------------------------Functionaliteis of Home page----------------------------------------





const navToHome = () => {
    // setting the html for homepage
    content.innerHTML = ` <div class="postboxContainer">
                            <div class="pstbx">
                                <input id="title" class="input_box" style="display:block;margin-bottom:30px;width:100%" type="text" name="email" id="" placeholder="Title"/>
                                    <textarea name="" id="postbox" placeholder="Share your Thought" ></textarea>
                                    <img id="postbtn" style="cursor: pointer;" class="postbtn" src="https://i.ibb.co/BPm4ZKJ/image.png" />
                                
                            </div>
                            <div  class="addPhotos">
                                <div id="uploadArea" style="cursor: pointer; padding:30px; border:4px solid #D9D9D9; border-radius: 10px;" class="addPhotos hoverEffect">
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
                            </div>
                            <div id="posts">
                            </div>
    `;
    // making the post writing box empty
    document.getElementById('postbox').value = null;
    // hiding the login button and showing the logout button
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
    // adding event listener for image upload area
    document.getElementById('uploadArea').addEventListener('click', function () {
        document.getElementById('file-input').click();
    });
    // initializing image as null
    let image = null;

    // taking image input
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
    // function to collect data from post box and add a object containing post contents to the "posts" array
    const post = () => {
        const title=document.getElementById("title");
        if(title.value==""){
            alert("please insert a title");
            return;
        }
        const postText = document.getElementById('postbox').value;
        const post = {
            id: posts.length + 1,
            postContent: {
                title:title.value,
                postText,
                image,
                likes: [],
                comments:[],
                date: getFormattedDate()
            },
            user

        }
        posts.push(post);
        document.getElementById("title").value="";
        document.getElementById('postbox').value="";
        // function to render posts
        renderPosts();



    }
    // adding event listener for post button
    document.getElementById('postbtn').addEventListener('click', post);

    document.getElementById('home').style.borderBottom = '2px solid black'
    document.getElementById('profile').style.border = 'none'
    // initial render of posts
    renderPosts();


}

// function to render posts
const renderPosts = () => {

    const postContainer = document.getElementById('posts');
    // initially making the post container empty
    postContainer.innerHTML = ``;

    if (posts.length != 0) {
        // loop to show all the posts
        posts.forEach(
            element => {

                // creating a div to contain the post content
                const post = document.createElement('div');
                // setting the html layout
                post.innerHTML = `
                <div id="${element.id}" class="postTextContainer">
                    <div class="posterInfo">
                        <div class="image-container">
                            <img src="${element.user.userInfo.image}"
                                alt="Circular Image">
                        </div>
                        <div>
                            <h2 class="abz" style="margin:0 0 10px;font-size: 30px;">${element.user.userInfo.userName}</h2>
                            <p class="inter" style="margin: 0;">${element.postContent.date}</p>
                        </div>
                    </div>
                    <div>
                    <div>
                        <p class="inter" style="margin:10px 0 10px;font-size: 30px; font-weight: 700;" >${element.postContent.title}</p>
                        <p id=${"postText" + element.id} class="inter f-24" style="color:#656565" >${element.postContent.postText}</p>
                    </div>
                    <div id=${"postEditBoxContainer" + element.id} style="position:relative; width:75%; display:none;">
                        <textarea  name="" id=${"postEditBox" + element.id} class="postEditbox"  >   
                        </textarea>
                        <img onclick="saveUpdate(${element.id})" style="cursor: pointer;" class="postbtn1" src="https://i.ibb.co/BPm4ZKJ/image.png" />
                        <p onclick=cancel(${element.id}) class="inter cancelbutton" >Cancel</p>
                        
                    </div>
                    </div>
                    <div class="likeCommentButtonContainer">
                        <div class="likeContainer">
                            <img onclick="like(${element.id})" style="cursor: pointer;" src="https://i.ibb.co/Nxvpj8T/image.png" alt="">
                            <p class="inter">${element.postContent.likes.length}</p>
                        </div>
                        <div class="commentContainer">
                            <img onclick="openModal(${element.id})" src="https://i.ibb.co/7J44Rzn/image.png" alt="">
                            <p class="inter"></p>
                        </div>
                    </div>

                </div>
                <div class="postImgContainer">
                    <h2 onclick="menuToggle(event,${element.id})" class="f-48" style="margin: 0 0 10px 0; cursor:pointer;">...</h2>
                    <div id="${"menu" + element.id}" class="menu abz">
                        <h2 onclick="editPost(${element.id})" style="margin: 0;">Edit</h2>
                        <hr>
                        <h2 onclick="deletePost(${element.id})" style="margin: 10px 0 0;cursor:pointer;">Delete</h2>
                    </div>
                    <img src="${element.postContent.image}" alt="">

                </div>
                `;

                post.classList.add('postContainer');
                // putting the post inside the post cotainer
                postContainer.appendChild(post);
                const textArea = document.getElementById("postEditBox" + element.id);
                textArea.value = element.postContent.postText;

            }
        )
    }


}
// this function realtime date to show in the post 
function getFormattedDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

window.editPost = (id) => {
    posts.forEach(element => {
        // finding the post we want by comparing id
        if (element.id == id) {
            // checking the if the authors email and the user email are same
            if (element.user.email == user.email) {
                const postText = document.getElementById("postText" + id);
                const postEditBoxContainer = document.getElementById("postEditBoxContainer" + id);
                postText.style.display = "none";
                postEditBoxContainer.style.display = "block"
            }
            else {
                // if not then show alert
                alert("You cannot edit someone elses post");
            }
        }

    });

}
window.saveUpdate = (id) => {
    const newPostText = document.getElementById("postEditBox" + id).value;
    const postText = document.getElementById("postText" + id);
    posts.forEach(element => {
        if (element.id == id) {
            element.postContent.postText = newPostText;
            postText.innerText = newPostText;
        }

    });
    const postEditBoxContainer = document.getElementById("postEditBoxContainer" + id);
    postText.style.display = "block";
    postEditBoxContainer.style.display = "none"




}
window.cancel = (id) => {
    const postText = document.getElementById("postText" + id);
    const postEditBoxContainer = document.getElementById("postEditBoxContainer" + id);
    postText.style.display = "block";
    postEditBoxContainer.style.display = "none"

}




// this function is to delete a post following the id of that post
window.deletePost = (id) => {

    console.log(id);
    // loop to go through the array of posts to find the post we want to delete
    posts.forEach(element => {
        // finding the post we want by comparing id
        if (element.id == id) {
            // checking the if the authors email and the user email are same
            if (element.user.email == user.email) {
                // if same then delete the post by filter function
                posts = posts.filter(item => item.id != id);
                // and render the posts again
                renderPosts();
            }
            else {
                // if not then show alert
                alert("You cannot delete someone elses post");
            }
        }

    });

}
// function to manage the work of like button 
window.like = (id) => {
    // loop to find the desired post
    posts.forEach(
        element => {
            // matching the id
            if (element.id == id) {
                // if theres no like the we simply just increase the likes by one
                if (element.postContent.likes.length == 0) {
                    // we store the users email for future verification
                    const like = {
                        email: user.email,
                        likeSatus: "disabled"
                    }
                    element.postContent.likes.push(like);

                }

                else {
                    // else we verify if the user has liked this post before 
                    let userCanLike = true;
                    element.postContent.likes.forEach(e => {
                        console.log(e, user.email);
                        if (e.email == user.email) {
                            // if true then we decrease the likes by one
                            element.postContent.likes = element.postContent.likes.filter(item => item.email != user.email);
                            userCanLike = false;
                            return;
                        }
                    })
                    if (userCanLike) {
                        // if the user hasnt liked the post before we increase the likes by one
                        const like = {
                            email: user.email,
                            likeSatus: "disabled"
                        }
                        element.postContent.likes.push(like);
                    }
                }


            }
            console.log(element.postContent.likes)
        }
    )
    // after increasing or decreasing likes we re-render the posts
    renderPosts();
    console.log(id);
}

// Get modal elements
const modal = document.getElementById("commentModal");
const closeModalButton = document.getElementsByClassName("close")[0];
const postCommentButton = document.getElementById("postCommentButton");
const commentBox = document.getElementById("commentBox");
const commentSection = document.getElementById("commentSection");

// Open modal
window.openModal=(id)=> {
    modal.style.display = "block";
    postCommentButton.onclick=()=>postComment(id);
    showComments(id);

};

// Close modal
closeModalButton.onclick = function() {
    modal.style.display = "none";

};

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
window.showComments=(id)=>{ 
    posts.forEach(element => {
        if(element.id==id){
            element.postContent.comments.forEach(element1=>{
                const comment = document.createElement('div');
                comment.innerHTML=`
                <div class="posterInfo">
                    <div class="image-container">
                        <img src="${element1.author.image}"
                            alt="Circular Image">
                    </div>
                    <div>
                        <h2 class="abz" style="margin:0 0 10px;font-size: 30px;">${element1.author.name}</h2>
                        <p class="inter" style="margin: 0;">${element1.date}</p>
                    </div>
                </div>
                <p>${element1.content}</p>
                
                `;
                commentSection.appendChild(comment);
            })
        }
        
    });

}

// Post a comment
const postComment=(id)=> {
    console.log(id);
    const commentText = commentBox.value.trim();
    if (commentText) {
        const comment ={
            author:{
                image:user.userInfo.image,
                name:user.userInfo.userName,
            },
            date:getFormattedDate(),
            content:commentText

        }
        posts.forEach(element=>{
            if(element.id==id){
                element.postContent.comments.push(comment);
            }
        })
        showComments(id);
        console.log(comment);
    } else {
        alert("Please enter a comment.");
    }
};

const logout = () => {
    user = null;
    renderContent();

}
// adding event listeners for signup and logout button
signupButton.addEventListener('click', navToRegistration);
logoutButton.addEventListener('click', logout);
// function to edit/delete toggle menu on posts 
function menuToggle(event, id) {
    const menuId = "menu" + id;
    event.stopPropagation(); // Prevent the event from bubbling up
    var menu = document.getElementById(menuId);
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}
// initial render of the page content
renderContent();


