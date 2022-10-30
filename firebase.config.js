import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "glistore.firebaseapp.com",
    projectId: "glistore",
    storageBucket: "glistore.appspot.com",
    messagingSenderId: "404281818606",
    appId: "1:404281818606:web:9010dfc8cfadeb46d262ff",
    measurementId: "G-3KS0H4FVE7"
};

console.log("firebas eapi key " + process.env.NEXT_PUBLIC_FIREBASE_APIKEY)
// Initialize Firebase
const app = initializeApp (firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;