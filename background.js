chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'playBeep') {
        console.log('Received playBeep message in background script');
        
        // Query the active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                // Send the playBeep message to the content script of the active tab
                chrome.tabs.sendMessage(tabs[0].id, { action: 'playBeep' });
            }
        });
    }
});
