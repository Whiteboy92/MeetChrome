document.addEventListener('DOMContentLoaded', () => {
    const targetCountInput = document.getElementById('targetCount');
    const saveBtn = document.getElementById('saveBtn');
    const playBeepBtn = document.getElementById('playBeep'); // Get the Play Beep button
  
    // Load the current target count from storage
    chrome.storage.local.get(['targetParticipantCount'], (result) => {
      targetCountInput.value = result.targetParticipantCount || 0;
    });
  
    // Save the target count when the button is clicked
    saveBtn.addEventListener('click', () => {
      const targetCount = parseInt(targetCountInput.value, 10);
      chrome.storage.local.set({ targetParticipantCount: targetCount }, () => {
        alert('Target participant count saved!');
      });
    });

    // Play beep sound when the button is clicked
    playBeepBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'playBeep' });
    });
});
