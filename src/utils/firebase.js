import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxaMaF4DpowWcdiQ9yPKh3az-oRxY59yQ",
  authDomain: "to-do-26c9f.firebaseapp.com",
  databaseURL: "https://to-do-26c9f.firebaseio.com",
  projectId: "to-do-26c9f",
  storageBucket: "to-do-26c9f.appspot.com",
  messagingSenderId: "214449248489",
  appId: "1:214449248489:web:aae6c6de32cea9157f3878",
};

export default firebase.initializeApp(firebaseConfig);
