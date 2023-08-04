 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
 import { getDatabase } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyAk_s-0Bh0LikhGJUCG4Q7iMJNBI2Tz4V0",
   authDomain: "expenceapp-64f9b.firebaseapp.com",
   databaseURL: "https://expenceapp-64f9b-default-rtdb.firebaseio.com",
   projectId: "expenceapp-64f9b",
   storageBucket: "expenceapp-64f9b.appspot.com",
   messagingSenderId: "82855956089",
   appId: "1:82855956089:web:093230c24b469d21c24ea8",
   measurementId: "G-PG28QSPZQ9"
 };


 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getDatabase(app);
 export {app,auth,db}