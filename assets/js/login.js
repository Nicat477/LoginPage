import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
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
// const submit=document.getElementById('submit');
// submit.addEventListener("click",function(event){
//     event.preventDefault()
//     const email=document.getElementById('email').value;
//     const password=document.getElementById('password').value;
    
//     signInWithEmailAndPassword(auth, email, password)
//      .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     alert("Logging In..")
//     window.location.href="../../sucess.html"
    
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorMessage)
//     // ..
//   });
// })
const form = document.getElementById('loginForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    // Email validation
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = "Invalid email format";
        isValid = false;
    }

    // Password validation (basic example - improve security)
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    } else if (passwordInput.value.length < 6) { // Example: minimum length
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
    }

    if (isValid) {
        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Logging In..");
                window.location.href = "../../sucess.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
        form.reset();
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}