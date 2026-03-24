// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// // const firebaseConfig = {
// //   apiKey: "YOUR_KEY",
// //   authDomain: "YOUR_DOMAIN",
// //   projectId: "YOUR_PROJECT_ID",
// // };

// // const app = initializeApp(firebaseConfig);

// // export const auth = getAuth(app);
// // export const db = getFirestore(app);
// const firebaseConfig = {
//   apiKey: "AIzaSyDDpOeRouJq0QmyleYXPaTvvEGQs_R1rns",
//   authDomain: "neurosync-9efa8.firebaseapp.com",
//   projectId: "neurosync-9efa8",
//   storageBucket: "neurosync-9efa8.firebasestorage.app",
//   messagingSenderId: "1096365116539",
//   appId: "1:1096365116539:web:caad8dbcb093910238e6de",
//   measurementId: "G-532QML5844"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Your config (correct)
const firebaseConfig = {
  apiKey: "AIzaSyDDpOeRouJq0QmyleYXPaTvvEGQs_R1rns",
  authDomain: "neurosync-9efa8.firebaseapp.com",
  projectId: "neurosync-9efa8",
  storageBucket: "neurosync-9efa8.appspot.com",
  messagingSenderId: "1096365116539",
  appId: "1:1096365116539:web:caad8dbcb093910238e6de"
};

// ❌ REMOVE analytics completely
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);