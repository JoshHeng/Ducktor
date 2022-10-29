chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'setAwake') {
        if (msg.value) {
            chrome.action.setIcon({ path: '/ducks/DuckOn.png' });
        } else {
            chrome.action.setIcon({ path: '/ducks/DuckOff.png' });
        }
    }
});