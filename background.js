chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'playBeep') {
        // Create a new AudioContext when the beep is played
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audio = new Audio(chrome.runtime.getURL('beep.mp3'));

        audio.addEventListener('canplaythrough', () => {
            // Ensure the audio context is resumed
            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    audio.play().catch(error => {
                        console.error('Failed to play beep sound:', error);
                    });
                });
            } else {
                audio.play().catch(error => {
                    console.error('Failed to play beep sound:', error);
                });
            }
        });
    }
});
