import firebase from "firebase/app";
import "firebase/firebase-auth";
import "firebase/firestore/memory";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCcR2mwP4xM_nNx6xF2wqBS7xGSfeosqXs",
  authDomain: "kyoshu-d26a6.firebaseapp.com",
  projectId: "kyoshu-d26a6",
  storageBucket: "kyoshu-d26a6.appspot.com",
  messagingSenderId: "826111504379",
  appId: "1:826111504379:web:b9f0bbac5e55029060255e",
  measurementId: "G-L8M7KDX8S0",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics(app);
export const firestore = firebase.firestore(app);
export const auth = firebase.auth();
