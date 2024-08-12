let previousParticipantCount = null;

// Fetch the target participant count from storage
function getTargetParticipantCount() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['targetParticipantCount'], (result) => {
      resolve(result.targetParticipantCount || 0); // Default to 0 if not set
    });
  });
}

// Get the participant count from the relevant div with class 'uGOf1d'
function getParticipantCount() {
  const participantCountElement = document.querySelector('.uGOf1d');
  
  if (participantCountElement) {
    const textContent = participantCountElement.textContent.trim();
    const count = textContent.match(/\d+/);
    const participantCount = count ? parseInt(count[0], 10) : null;
    console.log('Extracted Participant Count:', participantCount); // Debug log
    return participantCount;
  }
  
  console.log('Participant Count Element Not Found'); // Debug log
  return null;
}

// Check the participant count and play beep if it changes and does not match the target
async function checkParticipantCount() {
  const currentCount = getParticipantCount();
  const targetCount = await getTargetParticipantCount();
  
  console.log('Target Count:', targetCount); // Debug log

  if (currentCount !== targetCount) {
    //console.log('Counts do not match, play beep'); // Debug log
    chrome.runtime.sendMessage({ action: 'playBeep' });
    previousParticipantCount = currentCount;
  }
}

// Listen for messages from the background script to play the beep sound
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'playBeep') {
    const beepUrl = chrome.runtime.getURL('beep.mp3');
    const audio = new Audio(beepUrl);
    
    // Play the beep sound
    audio.play().then(() => {
      console.log('Beep sound played successfully');
    }).catch((error) => {
      console.error('Failed to play beep sound:', error);
    });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'playBeep') {
    console.log('Received playBeep message');
    const beepUrl = chrome.runtime.getURL('beep.mp3');
    console.log('Beep URL:', beepUrl);

    // Get the saved volume setting
    chrome.storage.local.get('beepVolume', (result) => {
      const audio = new Audio(beepUrl);
      audio.volume = result.beepVolume !== undefined ? result.beepVolume : 0.5; // Default to 0.5 if not set

      audio.addEventListener('error', (error) => {
        console.error('Audio playback error:', error);
      });

      audio.play().then(() => {
        console.log('Beep sound played successfully');
      }).catch((error) => {
        console.error('Failed to play beep sound:', error);
      });
    });
  }
});


// Check participant count every 15 seconds
setInterval(checkParticipantCount, 15000);
