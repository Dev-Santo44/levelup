import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBXIFvM5mDncSLvOYzRuG2z7Xd5UgSkY_g",
    authDomain: "levelup-2feb7.firebaseapp.com",
    projectId: "levelup-2feb7",
    storageBucket: "levelup-2feb7.firebasestorage.app",
    messagingSenderId: "206728654163",
    appId: "1:206728654163:web:9fe950b6dd3099a47585a6",
    measurementId: "G-T4HYM6XMRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export {app, auth};
