import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBud8ucg7I5wnh0ZzK5gjp5Hhf_2GziFE4",
  authDomain: "voting-a45af.firebaseapp.com",
  projectId: "voting-a45af",
  storageBucket: "voting-a45af.appspot.com",
  messagingSenderId: "591027316381",
  appId: "1:591027316381:web:7140592691fce79306d674",
  measurementId: "G-0KVD9EZ6NX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app)
 const db = getDatabase(app);
 export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
export{auth,storage,db}
