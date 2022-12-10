// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJqhtA1Vmi6z3jJz3ovFHMJfZGR0xgEQ0",
  authDomain: "authentication-84b78.firebaseapp.com",
  databaseURL: "https://authentication-84b78-default-rtdb.firebaseio.com",
  projectId: "authentication-84b78",
  storageBucket: "authentication-84b78.appspot.com",
  messagingSenderId: "816322786092",
  appId: "1:816322786092:web:0ae4a5263dda92b8557289"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const buttonSignUp = document.getElementById("button_signup");
const buttonSignIn = document.getElementById("button_signin");

buttonSignUp.addEventListener('click', (e) => {
    let username = document.getElementById("username").value;
    let emailSignUp = document.getElementById("email_signup").value;
    let passwordSignUp = document.getElementById("password_signup").value;

    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
    .then((userCredential) => {
        const user = userCredential.user;
        //  Sign Up
        set(ref(database, "users/" + user.uid), {
            username: username,
            email: emailSignUp,
            password: passwordSignUp
        })
        .then(() => {
            alert("User saved successfully!");
        })
        .catch((error) => {
            alert(error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});

buttonSignIn.addEventListener('click', (e) => {
    let emailSignIn = document.getElementById("email_signin").value;
    let passwordSignIn = document.getElementById("password_signin").value;
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
    .then((userCredential) => {
        const user = userCredential.user;
        location.href="http://127.0.0.1:5500/src/templates/index.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
    });
});
