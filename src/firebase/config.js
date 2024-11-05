import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCBO3fBbfzKeWkL6FB8k-jd_8TYzuM4jkk",
    authDomain: "prog3-rn-b7be0.firebaseapp.com",
    projectId: "prog3-rn-b7be0",
    storageBucket: "prog3-rn-b7be0.firebasestorage.app",
    messagingSenderId: "589939798224",
    appId: "1:589939798224:web:09e797aaf7eb8ffa966ed5"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();