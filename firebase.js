// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot //Escucha cuando los datos cambian
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtzNx7L3ecnodorvbuMsRBkNQArWG81N8",
  authDomain: "firestore-app-b1d2c.firebaseapp.com",
  projectId: "firestore-app-b1d2c",
  storageBucket: "firestore-app-b1d2c.appspot.com",
  messagingSenderId: "104031443516",
  appId: "1:104031443516:web:3a8a87f25fe115c5828139",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const getTasks = () =>
  getDocs(collection(db, "tasks"));

  export const onGetTasks = (callback) => {
    onSnapshot(collection(db,'tasks'),callback)
  }

  export const deleteTask = (id) => (
    //console.log(id)
    deleteDoc(doc(db,'tasks', id))
  )

  export const getTask = (id) =>(
    getDoc(doc(db,'tasks',id))
  )

  export const updateTask = (id, newFields) => (
    updateDoc(doc(db,'tasks',id), newFields)
  )
  