const alarmName = "screenTimer";

function setAlarm() {
    chrome.alarms.create(alarmName, {delayInMinutes: 0.01, periodInMinutes: 0.2} );
    chrome?.storage?.sync.set({ alarmName: "screenTimer" }, function(){
        //  A data saved callback omg so fancy
    });

    chrome.alarms.onAlarm.addListener(function( alarm ) {
        console.log("Alarm triggered!");
        chrome.storage.sync.set({'msg.floatDuck': 'Plz take break :) 🦆'}, function() { });
    });

    console.log("Alarm set");
}

function cancelAlarm() {
    chrome.alarms.clear(alarmName);
    console.log("Alarm cancelled");
}

function TimerConfigure() {

    return (
        <div className="timerConfigure">
            <p>Yes please make a prettier UI for this</p>
            <button onClick={setAlarm}>Set Timer</button>
            <button onClick={cancelAlarm}>Cancel Timer</button>
        </div>
    );
}

export default TimerConfigure;
