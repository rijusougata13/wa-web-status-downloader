// Load the Firebase SDK
// import {initializeApp} from "firebase/app";
// import "firebase/auth";

// // Initialize Firebase with your project's config object
// const firebaseConfig = {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "download_status") {
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      func: downloadStatus
    }, (results) => {
      // Send back the response after script execution
      sendResponse({
        success: results && results[0]?.result?.success,
        message: results && results[0]?.result?.message
      });
    });
    return true; // Keep the message channel open for async response
  }
});

function downloadStatus() {
  const mediaList = document.querySelectorAll("img[src^='blob:'], video[src^='blob:']");

  if (mediaList.length === 0) {
    return { success: false, message: "Please wait for status to load completely!" };
  }

  mediaList.forEach(async (media, index) => {
    try {
      const response = await fetch(media.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `whatsapp-status-${index + 1}.${media.tagName === 'VIDEO' ? 'mp4' : 'jpg'}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  });

  return { success: true, message: "Download completed" };

  // }

}

