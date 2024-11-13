import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD1ap6KUmDp6n2O3iNH7hc2SdTBIuhq8mY",
  authDomain: "appprova-4dbda.firebaseapp.com",
  projectId: "appprova-4dbda",
  storageBucket: "appprova-4dbda.appspot.com",
  messagingSenderId: "807947263197",
  appId: "1:807947263197:web:fcd486729096a8c532cf34",
  databaseURL: "https://appprova-4dbda-default-rtdb.firebaseio.com"
};



const app = initializeApp(firebaseConfig);



const auth =  getAuth(app);
const db = getDatabase(app);




export { auth, db };

