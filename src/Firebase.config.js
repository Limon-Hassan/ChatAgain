// Import the functions you need from the SDKs you need
import { defaults } from "autoprefixer";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApppXtApFVZgn5TlphP9eWZED9oFIvv8E",
  authDomain: "chattapp-again.firebaseapp.com",
  projectId: "chattapp-again",
  storageBucket: "chattapp-again.appspot.com",
  messagingSenderId: "976403914276",
  appId: "1:976403914276:web:48b1dfc5693ef99a9dc2b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
export default firebaseConfig;
