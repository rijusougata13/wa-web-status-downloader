// Load the Firebase SDK
// import firebase from "firebase/app";
// import "firebase/auth";

// // Initialize Firebase with your project's config object
// const firebaseConfig = {
// };
// firebase.initializeApp(firebaseConfig);


document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("download-btn");

  // Check if WhatsApp Web is open
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentUrl = tabs[0].url;
    if (!currentUrl.includes('web.whatsapp.com')) {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Open WhatsApp Web first';
      return;
    }
  });

  downloadBtn.addEventListener("click", function () {
    downloadBtn.textContent = 'Downloading...';
    downloadBtn.disabled = true;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.runtime.sendMessage(
        { message: "download_status", tabId: tabs[0].id },
        (response) => {
          if (response && response.success) {
            downloadBtn.textContent = 'Download Complete!';
          } else {
            downloadBtn.textContent = response?.message || 'Download Failed';
          }
          setTimeout(() => {
            downloadBtn.textContent = 'Download Status';
            downloadBtn.disabled = false;
          }, 2000);
        }
      );
    });
  });
});
