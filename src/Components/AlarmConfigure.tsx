const alarmName = "screenTimer";

function setAlarm() {
    chrome.alarms.create(alarmName, {delayInMinutes: 0.1, periodInMinutes: 0.2} );
    chrome?.storage?.sync.set({ "alarmMsg": "You've spent x mins in Chrome - make sure to take a break!" }, function(){
        //  A data saved callback omg so fancy
    });

    chrome.alarms.onAlarm.addListener(function( alarm ) {
        console.log("Alarm triggered!");
    
        // https://stackoverflow.com/a/72646720
        chrome.windows.create(
            {
              url: 'index.html?type=alarm',
              type: 'popup',
              width: 450,
              height: 600,
              left: 0,
              top: 0,
            },
          );
        
    });

    console.log("Alarm set");
}

function cancelAlarm() {
    chrome.alarms.clear(alarmName);
}

function AlarmConfigure() {

    return (
        <div className="alarmConfigure">
            <button onClick={setAlarm}>Set Alarm</button>
            <button onClick={cancelAlarm}>Cancel Alarm</button>
        </div>
    );
}

export default AlarmConfigure;
