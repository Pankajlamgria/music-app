
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCKDpKqjjsdjgKMTdPBSQe85Mf__rE9Rfw",
  authDomain: "spotifyclone-94304.firebaseapp.com",
  projectId: "spotifyclone-94304",
  storageBucket: "spotifyclone-94304.appspot.com",
  messagingSenderId: "694082510725",
  appId: "1:694082510725:web:f9725e17bf8b660c9deeec",
  measurementId: "G-NRXT5736WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);