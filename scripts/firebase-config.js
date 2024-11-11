import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAExQxKLmBVM30Zd8zpA_WrRMlfEeQ45_U",
  authDomain: "pra-fazer-app-71aee.firebaseapp.com",
  databaseURL: "https://pra-fazer-app-71aee-default-rtdb.firebaseio.com",
  projectId: "pra-fazer-app-71aee",
  storageBucket: "pra-fazer-app-71aee.appspot.com",
  messagingSenderId: "1040866220280",
  appId: "1:1040866220280:web:38abfb59ce59a6ca81c30d"
};


const app = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const db = getDatabase(app);

export { auth, db};