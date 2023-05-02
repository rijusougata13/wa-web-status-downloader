// Load the Firebase SDK
// import firebase from "firebase/app";
// import "firebase/auth";

// // Initialize Firebase with your project's config object
// const firebaseConfig = {
//   // Your project's Firebase config object
//   apiKey: "AIzaSyB_T8rdegLHk_o32RS7-pl5Oaxu0l6I-Wc",
//   authDomain: "wa-web-status-download.firebaseapp.com",
//   projectId: "wa-web-status-download",
//   storageBucket: "wa-web-status-download.appspot.com",
//   messagingSenderId: "359789584516",
//   appId: "1:359789584516:web:dc402cbb512bd2de8ea2d1",
//   measurementId: "G-6ESHB1H07K"
// };
// firebase.initializeApp(firebaseConfig);


document.addEventListener("DOMContentLoaded", function() {
    const downloadBtn = document.getElementById("download-btn");
    downloadBtn.addEventListener("click", function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.runtime.sendMessage({ message: "download_status", tabId: tabs[0].id });
      });
    });
  });
  