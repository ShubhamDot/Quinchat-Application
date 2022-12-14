// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBKz2HQqVUw3GuY7MM10wf99kPd0GaOKoU",
  authDomain: "quinchat-3e1f9.firebaseapp.com",
  projectId: "quinchat-3e1f9",
  storageBucket: "quinchat-3e1f9.appspot.com",
  messagingSenderId: "1055524558897",
  appId: "1:1055524558897:web:e4b44e4e9cc7916a055d10"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()