// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA27BEMI_AhdtmgnkKcQ4K9ylQAad16TdU",
  authDomain: "ptmo-c1434.firebaseapp.com",
  databaseURL: "https://ptmo-c1434-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ptmo-c1434",
  storageBucket: "ptmo-c1434.appspot.com",
  messagingSenderId: "325717336823",
  appId: "1:325717336823:web:c1eea0376ff721236629f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
export { db };

const auth = getAuth(app);
export { auth };