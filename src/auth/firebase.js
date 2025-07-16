// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV26KiDpDLC4jhZt2IH4Fdwn8xKuvaPyQ",
  authDomain: "react-js---marruca.firebaseapp.com",
  projectId: "react-js---marruca",
  storageBucket: "react-js---marruca.firebasestorage.app",
  messagingSenderId: "769508075200",
  appId: "1:769508075200:web:e3cdd0ac01b0adf4906f25",
  measurementId: "G-SBMCTXX9ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export function crearUsuario(email, password) {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    console.log("Credenciales = ", userCredential )
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    console.log(error.code, error.message);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}