chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'playBeep') {
        console.log('Received playBeep message');
        const beepUrl = chrome.runtime.getURL('beep.mp3');
        console.log('Beep URL:', beepUrl);

        const audio = new Audio(beepUrl);
        audio.addEventListener('error', (error) => {
            console.error('Audio playback error:', error);
        });

        audio.play().then(() => {
            console.log('Beep sound played successfully');
        }).catch((error) => {
            console.error('Failed to play beep sound:', error);
        });
    }
});
