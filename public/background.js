const duckTypes = ['Hacker', 'Halo', 'Mario', 'Pirate', 'Pumpkin', 'Witch', ''];

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'setAwake') {
        if (msg.value) {
            chrome.action.setIcon({ path: '/ducks/DuckOn.png' });
        } else {
            chrome.action.setIcon({ path: '/ducks/DuckOff.png' });
        }
    }
    else if (msg.action === 'getDucks') {
        sendResponse(duckTypes.map(duckType => chrome.runtime.getURL(`/ducks/Duck${duckType}.png`)));
    }
});

chrome.alarms.onAlarm.addListener(function( alarm ) {
    console.log("Alarm triggered!");
    chrome.storage.sync.set({'msg.floatDuck': 'Plz take break :) 🦆'}, function() { });
});