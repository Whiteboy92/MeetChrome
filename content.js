let previousParticipantCount = null;

// Fetch the target participant count from storage
function getTargetParticipantCount() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['targetParticipantCount'], (result) => {
      resolve(result.targetParticipantCount || 0); // Default to 0 if not set
    });
  });
}

// Get the participant count from the second div with class 'uGOf1d'
function getParticipantCount() {
  // Select the first (and only) element with the class 'uGOf1d'
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


// Check the participant count and play beep if it changes and matches the target
async function checkParticipantCount() {
  const currentCount = getParticipantCount();
  const targetCount = await getTargetParticipantCount();
  
  console.log('Target Count:', targetCount); // Debug log

  if (currentCount !== null && currentCount !== previousParticipantCount && currentCount === targetCount) {
    console.log('Counts match, sending beep message'); // Debug log
    chrome.runtime.sendMessage({ action: 'playBeep' });
    previousParticipantCount = currentCount;
  }
}


// Check participant count every 10 seconds
setInterval(checkParticipantCount, 3000);
