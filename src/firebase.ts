import firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyBezuObk3je9ft-nSNUX6Wef-XKtsA-YZg",
  authDomain: "t10test.firebaseapp.com",
  projectId: "t10test",
  storageBucket: "t10test.appspot.com",
  messagingSenderId: "841678622429",
  appId: "1:841678622429:web:f030b9c23e6177438c9534",
  measurementId: "G-PQ9MKYRFJZ"
};

firebase.initializeApp(config);

export default firebase.database();