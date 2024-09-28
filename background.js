// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Default values
  chrome.storage.local.set({ features: { lightText: false } });
});

// Listen for updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getFeatures') {
    chrome.storage.local.get('features', (data) => {
      sendResponse(data.features);
    });
    return true; // Indicates async response
  } else if (request.action === 'setFeatures') {
    chrome.storage.local.set({ features: request.features });
  }
});
