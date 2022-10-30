const duckHatId = "duckHat";
const msgDivId = "msgDiv";

// Listen for changes to storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
    // Update the hat
    setHat();

    // Check if the duck should be visible or not
    setVisibility();
});

function dismiss() {
    console.log("Dismiss");

    var duckDiv = document.getElementById("floatingDuck");
    duckDiv.style.display = "none";

    // Clear the message
    chrome.storage.sync.set({'msg.floatDuck': ''}, function() {
        console.log('Cleared floatDuck message');
    });
}

// Checks if there are any messages
// If there are, then show the duck, otherwise, keep it hidden
function setVisibility() {
    chrome.storage.sync.get(['msg.floatDuck'], function(value) {
        console.log("msg.floatDuck: " + value);
        console.log(value['msg.floatDuck']);
        var msg = value['msg.floatDuck'];
        var msgDiv = document.getElementById(msgDivId);

        var duckDiv = document.getElementById("floatingDuck");

        if (msg !== '' && msg !== undefined) {
            msgDiv.innerHTML = msg;
            duckDiv.style.display = "";
            console.log("Show duck");
        }
        else {
            msgDiv.innerHTML = "";
            duckDiv.style.display = "none";
            console.log("Hide duck");
        }
    });
}

function setHat() {
    chrome.storage.sync.get(['settings.awake', 'settings.duckType', 'settings.name'], function(values) {
        var duckType = values['settings.duckType'];
        console.log(duckType);

        var duckHat = document.getElementById(duckHatId);

        if (duckType !== "none" && duckType !== undefined) {            
            // Convert from duck hat name to filename
            // Filename must be in format: Hatname.png (where it starts with a capital letter)
            // https://stackoverflow.com/a/1026087
            duckHat.setAttribute("src", chrome.runtime.getURL("/hats/" + duckType.charAt(0).toUpperCase() + duckType.slice(1) + ".png"));
            duckHat.style.visibility = "visible";
            console.log("Hat visible");
        }        
        else {
            duckHat.style.visibility = "hidden";
            console.log("Hat hidden");
        }
    });
}


function createFloatingDuck(message) {
    var div = document.createElement('div');

    var hat = document.createElement('img');
    //hat.setAttribute("src", chrome.runtime.getURL(""));
    hat.setAttribute("id", duckHatId);
    hat.style.visibility = "hidden";
    hat.style.position = "absolute";
    hat.style.width = "200px"
    hat.style.right = 0;
    hat.style.bottom = 0;

    var duck = document.createElement('img');
    duck.setAttribute("src", chrome.runtime.getURL("/ducks/Duck.gif"));
    duck.setAttribute("alt", "Duck");
    duck.style.width = "200px";

    duck.style.position = "absolute";
    //duck.style.left = 0;
    //duck.style.top = 0;
    duck.style.right = 0;
    duck.style.bottom = 0;

    var duckShadow = document.createElement('img');
    duckShadow.setAttribute("src",  chrome.runtime.getURL("/ducks/DuckShadow.png"));
    duckShadow.setAttribute("alt", "Duck Shadow");
    duckShadow.style.width = "200px";

    duckShadow.style.position = "absolute";
    //duckShadow.style.left = 0;
    //duckShadow.style.top = 0;
    duckShadow.style.right = 0;
    duckShadow.style.bottom = 0;

    var speechBubble = document.createElement('img');
    speechBubble.setAttribute("src",  chrome.runtime.getURL("/assets/SpeechBubble.png"));
    speechBubble.setAttribute("alt", "Duck Speech Bubble");
    speechBubble.style.width = "350px";

    speechBubble.style.position = "absolute";
    speechBubble.style.left = 0;
    speechBubble.style.top = 0;
    //speechBubble.style.right = 0;
    //speechBubble.style.bottom = 0;

    div.appendChild(speechBubble);
    div.appendChild(duckShadow);
    div.appendChild(duck);
    div.appendChild(hat);

    div.style.position = "fixed";
    div.style.bottom = 0;
    div.style.right = 0;
    div.style.height = "200px";
    div.style.width = "400px";
    div.style.margin = "0";
    div.style.cursor = "pointer";
    div.style.zIndex = "10";

    // TODO: Set styling for message
    // Otherwise it'll inherit the text styling for the page it's on
    var msgDiv = document.createElement('div');
    msgDiv.innerHTML = message;
    msgDiv.setAttribute("id", msgDivId);
    msgDiv.style.left = "25px";
    msgDiv.style.top = "15px";
    msgDiv.style.position = "absolute";
    msgDiv.style.color = "#1a1a1a";
    msgDiv.style.fontSize = "14px";
    msgDiv.style.fontFamily = "sans-serif";

    div.appendChild(msgDiv);
    div.setAttribute("id", "floatingDuck");

    div.addEventListener("click", dismiss);

    return div;
}

var div = createFloatingDuck("Test message!");
document.body.appendChild(div);
setHat();
setVisibility();