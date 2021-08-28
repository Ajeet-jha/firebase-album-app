import firebase from 'firebase';
import 'firebase/storage';

export const app = firebase.initializeApp({
  apiKey: "AIzaSyCle-vm7h2MgG-hVXwg_7FLqRH5-5MbMZ0",
  authDomain: "react-firebase-album.firebaseapp.com",
  projectId: "react-firebase-album",
  storageBucket: "react-firebase-album.appspot.com",
  messagingSenderId: "375339538889",
  appId: "1:375339538889:web:4aa3734192035ec2e67018",
  locationId: "us-central"
});