import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if (user) {
        console.log(('logged in'));
        console.log(user);
    } else {
        console.log('Logged out');
    }
});
