import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBz7yDSfch90erZN3Mi2E2nUj_YCdIpi-Q",
    authDomain: "instagram-clone-rn-3aa7e.firebaseapp.com",
    projectId: "instagram-clone-rn-3aa7e",
    storageBucket: "instagram-clone-rn-3aa7e.appspot.com",
    messagingSenderId: "255768337102",
    appId: "1:255768337102:web:327a6f5900e821b2238e9f"
};

let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth, firebase };
