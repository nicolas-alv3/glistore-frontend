import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC2VIiXoW59ujcS8fvSNdZHWT--Ks3ZlBo",
    authDomain: "pomelo-bebes.firebaseapp.com",
    projectId: "pomelo-bebes",
    storageBucket: "pomelo-bebes.appspot.com",
    messagingSenderId: "501627781259",
    appId: "1:501627781259:web:5f03afc496b6154fc7948e",
    measurementId: "G-T0LWJC5XSB"
};

// Initialize Firebase
const app = initializeApp (firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;