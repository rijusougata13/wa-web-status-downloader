// Load the Firebase SDK
// import {initializeApp} from "firebase/app";
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
// const firebase=initializeApp(firebaseConfig);

let user_signed_in = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'is_user_signed_in') {
      sendResponse({
          message: 'success',
          payload: user_signed_in
      });
  } else if (request.message === 'sign_out') {
      user_signed_in = false;
      sendResponse({ message: 'success' });
  } else if (request.message === 'sign_in') {
      user_signed_in = true;
      sendResponse({ message: 'success' });
  }

  return true;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "download_status") {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      func: downloadStatus
    });
  }
});

function downloadStatus() {
  // Find all the image and video elements on the page

  // var user= firebase.auth().currentUser;
  // if(!user){
  //   const provider = new firebase.auth.GoogleAuthProvider();

  // // Prompt the user to sign in with Google
  // firebase
  //   .auth()
  //   .signInWithPopup(provider)
  //   .then((result) => {
  //     // Handle the successful sign-in
  //     console.log("Google sign-in successful:", result.user);
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Handle the sign-in error
  //     console.error("Google sign-in error:", error);
  //     // ...
  //   });
  // }
  // else{
const mediaList = document.querySelectorAll("img[src^='blob:'], video[src^='blob:']");

// Check if any media was found
if (mediaList.length === 0) {
  alert("No status media found or please wait until the status is loaded!!");
}

for (let i = 0; i < mediaList.length; i++) {
  const mediaUrl = mediaList[i].src;
  // Fetch the media file as binary data
  fetch(mediaUrl)
    .then(response => response.blob())
    .then(blob => {
      // Create a download link using the Blob
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `status_${i}.${blob.type.split("/")[1]}`;
      // Simulate a click on the link to initiate the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => console.error(error));
}
  // }

}

