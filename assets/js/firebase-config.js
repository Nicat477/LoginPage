import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHG4cVU3qS5rk5bK1rQTf4yGNc-fYszR0",
  authDomain: "loginapi-da3fe.firebaseapp.com",
  projectId: "loginapi-da3fe",
  storageBucket: "loginapi-da3fe.firebasestorage.app",
  messagingSenderId: "538066010895",
  appId: "1:538066010895:web:74273f5a56c82f4293b47a",
  measurementId: "G-QC9JYDLX4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const form = document.getElementById("signupForm");
// const submit=document.getElementById('submit');
// submit.addEventListener("click",function(event){
//     event.preventDefault()
//     const email=document.getElementById('email').value;
//     const password=document.getElementById('password').value;
//     const con=document.getElementById('con').value;
//     createUserWithEmailAndPassword(auth, email, password,con)
//      .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     alert("Creating Account..")
//     window.location.href="../../login.html"
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorMessage)
//     // ..
//   });
// })
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("con");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  let isValid = true;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    emailError.textContent = "Invalid email format";
    isValid = false;
  }

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (passwordInput.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    isValid = false;
  }

  if (confirmPasswordInput.value.trim() === "") {
    confirmPasswordError.textContent = "Confirm password is required";
    isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match";
    isValid = false;
  }
  // ... (Your validation code - same as before) ...

  if (isValid) {  // Only proceed with Firebase if validation passes
      createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
          .then((userCredential) => {
              const user = userCredential.user;
              alert("Creating Account..");
              window.location.href = "../../login.html";
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage);
          });
      form.reset(); // Reset the form *after* successful Firebase signup or error
  }
});

function isValidEmail(email) { // Keep this function
  // ... (Your email validation regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}