// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyBPdj37Z7OytkGK78eOAUtOdlqtOAqRYFs',
  authDomain: 'fruitapp-kosa.firebaseapp.com',
  projectId: 'fruitapp-kosa',
  storageBucket: 'fruitapp-kosa.appspot.com',
  messagingSenderId: '218988798259',
  appId: '1:218988798259:web:dummyappid',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
