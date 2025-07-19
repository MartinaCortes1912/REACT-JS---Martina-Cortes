// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      console.log("Credenciales = ", userCredential);
      const user = userCredential.user;
      console.log(user);
      return userCredential;
    })
    .catch((error) => {
      console.log(error.code, error.message);
      throw error;
    });
}

export function loginEmailPass(email, password){
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("Credenciales completas:", userCredential);
      console.log("Usuario:", userCredential.user);
      console.log("Email del usuario:", userCredential.user?.email);
      
      return userCredential;
    })
    .catch((error) => {
      console.log("Error en loginEmailPass:", error.code);
      throw error;
    });
}