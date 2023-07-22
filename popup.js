// Load the Firebase SDK
// import firebase from "firebase/app";
// import "firebase/auth";

// // Initialize Firebase with your project's config object
// const firebaseConfig = {
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
  
