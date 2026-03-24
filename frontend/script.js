// // async function analyze() {

// //   const text = document.getElementById("input").value;

// //   if (!text) {
// //     alert("Please enter your mood!");
// //     return;
// //   }

// //   const resultDiv = document.getElementById("result");
// //   resultDiv.innerHTML = "Analyzing... ⏳";

// //   try {
// //     const res = await fetch("http://localhost:3001/analyze", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json"
// //       },
// //       body: JSON.stringify({ text })
// //     });

// //     const data = await res.json();

// //     let color;
// //     if (data.stress === "High") color = "red";
// //     else if (data.stress === "Medium") color = "orange";
// //     else color = "lightgreen";

// //     resultDiv.innerHTML = `
// //       <h3 style="color:${color}">Stress: ${data.stress}</h3>
// //       <p>${data.suggestion}</p>
// //     `;
// //   } catch (error) {
// //     resultDiv.innerHTML = "Error connecting to server ❌";
// //   }
// // }




// // let history = [];

// // function setMood(text) {
// //   document.getElementById("input").value = text;
// // }

// // async function analyze() {
// //   const text = document.getElementById("input").value;

// //   const res = await fetch("http://localhost:3001/analyze", {
// //     method: "POST",
// //     headers: {"Content-Type": "application/json"},
// //     body: JSON.stringify({ text })
// //   });

// //   const data = await res.json();

// //   document.getElementById("result").innerHTML = `
// //     <h3>Stress: ${data.stress}</h3>
// //     <p>${data.suggestion}</p>
// //   `;

// //   // Save history
// //   history.push(data.stress);

// //   updateChart();
// // }

// // function updateChart() {
// //   const counts = {
// //     Low: history.filter(x => x === "Low").length,
// //     Medium: history.filter(x => x === "Medium").length,
// //     High: history.filter(x => x === "High").length
// //   };

// //   const ctx = document.getElementById('chart');

// //   new Chart(ctx, {
// //     type: 'bar',
// //     data: {
// //       labels: ["Low", "Medium", "High"],
// //       datasets: [{
// //         label: "Stress History",
// //         data: [counts.Low, counts.Medium, counts.High]
// //       }]
// //     }
// //   });
// // }



// // // firebase


// // import { auth } from "./firebase.js";
// // import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// // function signup() {
// //   const email = document.getElementById("email").value;
// //   const pass = document.getElementById("password").value;

// //   createUserWithEmailAndPassword(auth, email, pass)
// //     .then(() => alert("Signup successful"))
// //     .catch(err => alert(err.message));
// // }

// // function login() {
// //   const email = document.getElementById("email").value;
// //   const pass = document.getElementById("password").value;

// //   signInWithEmailAndPassword(auth, email, pass)
// //     .then(() => alert("Login successful"))
// //     .catch(err => alert(err.message));
// // }



// import { auth, db } from "./firebase.js";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// import {
//   collection,
//   addDoc,
//   getDocs
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// let chart;

// // 🔥 NAVIGATION
// function showSection(sectionId) {
//   document.querySelectorAll(".section").forEach(sec => {
//     sec.style.display = "none";
//   });
//   document.getElementById(sectionId).style.display = "block";
// }

// // 🔥 EMOJI INPUT
// function setMood(text) {
//   document.getElementById("input").value = text;
// }

// // 🔥 ANALYZE MOOD
// async function analyze() {
//   const text = document.getElementById("input").value;

//   if (!text) {
//     alert("Enter mood!");
//     return;
//   }

//   const res = await fetch("http://localhost:3001/analyze", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({ text })
//   });

//   const data = await res.json();

//   document.getElementById("result").innerHTML = `
//     <h3>Stress: ${data.stress}</h3>
//     <p>${data.suggestion}</p>
//   `;

//   // Save to Firebase
//   await addDoc(collection(db, "moods"), {
//     text: text,
//     stress: data.stress,
//     time: new Date()
//   });

//   loadHistory();
// }

// // 🔥 LOAD HISTORY
// async function loadHistory() {
//   const querySnapshot = await getDocs(collection(db, "moods"));

//   let history = [];

//   querySnapshot.forEach(doc => {
//     history.push(doc.data().stress);
//   });

//   updateChart(history);
// }

// // 🔥 UPDATE CHART
// function updateChart(history) {
//   const counts = {
//     Low: history.filter(x => x === "Low").length,
//     Medium: history.filter(x => x === "Medium").length,
//     High: history.filter(x => x === "High").length
//   };

//   const ctx = document.getElementById("chart");

//   if (chart) chart.destroy();

//   chart = new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: ["Low", "Medium", "High"],
//       datasets: [{
//         label: "Stress History",
//         data: [counts.Low, counts.Medium, counts.High]
//       }]
//     }
//   });
// }

// // 🔐 SIGNUP
// window.signup = function() {
//   const email = document.getElementById("email").value;
//   const pass = document.getElementById("password").value;

//   createUserWithEmailAndPassword(auth, email, pass)
//     .then(() => alert("Signup successful"))
//     .catch(err => alert(err.message));
// };

// // 🔐 LOGIN
// window.login = function() {
//   const email = document.getElementById("email").value;
//   const pass = document.getElementById("password").value;

//   signInWithEmailAndPassword(auth, email, pass)
//     .then(() => alert("Login successful"))
//     .catch(err => alert(err.message));
// };

// // Load data on start
// loadHistory();


import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let chart;

// NAVIGATION
window.showSection = function(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
};

// EMOJI
function setMood(text) {
  document.getElementById("input").value = text;
}

// VOICE INPUT
window.startVoice = function() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    document.getElementById("input").value = event.results[0][0].transcript;
  };

  recognition.start();
};

// ANALYZE
async function analyze() {
  const text = document.getElementById("input").value;

  if (!text) return alert("Enter mood!");

  const user = auth.currentUser;
  if (!user) return alert("Login first!");

  document.getElementById("loader").style.display = "block";

  const res = await fetch("http://localhost:3001/analyze", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ text })
  });

  const data = await res.json();

  document.getElementById("loader").style.display = "none";

  document.getElementById("result").innerHTML = `
    <h3>Stress: ${data.stress}</h3>
    <p>${data.suggestion}</p>
  `;

  await addDoc(collection(db, "moods"), {
    uid: user.uid,
    text,
    stress: data.stress,
    time: new Date()
  });

  loadHistory();
}

// LOAD HISTORY (USER-SPECIFIC)
async function loadHistory() {
  const user = auth.currentUser;
  if (!user) return;

  const q = query(collection(db, "moods"), where("uid", "==", user.uid));
  const snapshot = await getDocs(q);

  let history = [];
  snapshot.forEach(doc => history.push(doc.data().stress));

  updateChart(history);
}

// CHART
function updateChart(history) {
  const counts = {
    Low: history.filter(x => x === "Low").length,
    Medium: history.filter(x => x === "Medium").length,
    High: history.filter(x => x === "High").length
  };

  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Low", "Medium", "High"],
      datasets: [{
        label: "Stress History",
        data: [counts.Low, counts.Medium, counts.High]
      }]
    }
  });
}

// AUTH
window.signup = function() {
 const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then(() => alert("Signup successful"))
    .catch(err => alert(err.message));
};

window.login = function() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      alert("Login successful");
      loadHistory();
    })
    .catch(err => alert(err.message));
};

window.logout = function() {
  signOut(auth)
    .then(() => alert("Logged out"))
    .catch(err => alert(err.message));
};

window.analyze = analyze;
window.setMood = setMood;

