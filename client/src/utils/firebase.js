import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC4OpTu58Xbd_ju6dLUG1t1_RJVyRa68CU",
    authDomain: "react-super-med.firebaseapp.com",
    projectId: "react-super-med",
    storageBucket: "react-super-med.appspot.com",
    messagingSenderId: "953456474180",
    appId: "1:953456474180:web:82ec846b267dc38882a411",
    measurementId: "G-QDQCXWQN7F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);