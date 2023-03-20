import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "glider-563df.firebaseapp.com",
    projectId: "glider-563df",
    storageBucket: "glider-563df.appspot.com",
    messagingSenderId: "839479233149",
    appId: "1:839479233149:web:e1bf763a54707750a97f14",
    measurementId: "G-C7VBRP7CHM"
};
// Initialize Firebase
const app = initializeApp (firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;
