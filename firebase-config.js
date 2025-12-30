import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAHHRGXZF6HcvoKUE4KKqedLl2tAl5zRro",
  authDomain: "samorzadsp2-ca51a.firebaseapp.com",
  projectId: "samorzadsp2-ca51a",
  storageBucket: "samorzadsp2-ca51a.firebasestorage.app",
  messagingSenderId: "928474288056",
  appId: "1:928474288056:web:c4b8d54c844ac9d607c94d",
  measurementId: "G-Z2HEKBR50V"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
