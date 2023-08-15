import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf2oB3X0TCyhSTks8cOoQEUwImCBOPqTw",
  authDomain: "sportconnect-140e7.firebaseapp.com",
  projectId: "sportconnect-140e7",
  storageBucket: "sportconnect-140e7.appspot.com",
  messagingSenderId: "291036858163",
  appId: "1:291036858163:web:b9ab0324bca989fdac6046",
  measurementId: "G-VR46X1PWC8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

