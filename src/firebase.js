import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCadK4DJ-MAna1jlgotUgG5Tb-1D8m9kQc",
  authDomain: "instagram-clone-ff439.firebaseapp.com",
  databaseURL: "https://instagram-clone-ff439.firebaseio.com",
  projectId: "instagram-clone-ff439",
  storageBucket: "instagram-clone-ff439.appspot.com",
  messagingSenderId: "569285457515",
  appId: "1:569285457515:web:515637947df944e9a4632e",
  measurementId: "G-6P3XTYRRY7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
