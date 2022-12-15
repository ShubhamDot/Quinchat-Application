// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCzg3LWUQzYUdhWgKjxQ0IrIBYAY4ENLtw",
  
    authDomain: "quinchat-7c47c.firebaseapp.com",
  
    projectId: "quinchat-7c47c",
  
    storageBucket: "quinchat-7c47c.appspot.com",
  
    messagingSenderId: "504603956966",
  
    appId: "1:504603956966:web:282237484ccae1b9738d27",
  
    measurementId: "G-8XZJGJ1H8V"
  
  };
    

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
