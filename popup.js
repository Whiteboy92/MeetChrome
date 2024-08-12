document.addEventListener('DOMContentLoaded', () => {
    const targetCountInput = document.getElementById('targetCount');
    const volumeControl = document.getElementById('volumeControl');
    const saveBtn = document.getElementById('saveBtn');
  
    // Load the current target count and volume from storage
    chrome.storage.local.get(['targetParticipantCount', 'beepVolume'], (result) => {
      targetCountInput.value = result.targetParticipantCount || 0;
      volumeControl.value = result.beepVolume !== undefined ? result.beepVolume : 0.5;
    });
  
    // Save the target count and volume when the button is clicked
    saveBtn.addEventListener('click', () => {
      const targetCount = parseInt(targetCountInput.value, 10);
      const beepVolume = parseFloat(volumeControl.value);
      chrome.storage.local.set({ 
        targetParticipantCount: targetCount,
        beepVolume: beepVolume
      }, () => {
        alert('Settings saved!');
      });
    });
  });
  