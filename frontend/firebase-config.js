// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyD5pQ9cCQ3KNltlE8C2IsJ0oK8l2JpY3p6c",
  authDomain: "cloudexpensepro.firebaseapp.com",
  projectId: "cloudexpensepro",
  storageBucket: "cloudexpensepro.appspot.com",
  messagingSenderId: "824009979641",
  appId: "1:824009979641:web:fadf9dea55859b826e5428",
  measurementId: "G-JE5NZY4YCH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
