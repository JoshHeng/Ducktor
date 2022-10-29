function dismiss() {
    console.log("Dismiss");

    var duckDiv = document.getElementById("floatingDuck");
    duckDiv.setAttribute("visibility", "hidden");
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    document.body.style.backgroundColor = "green";
});


function createFloatingDuck(message) {
    var div = document.createElement( 'div' );

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

    div.style.position = "fixed";
    div.style.bottom = 0;
    div.style.right = 0;
    div.style.height = "200px";
    div.style.width = "400px";
    div.style.margin = "0";
    div.style.cursor = "pointer";

    var msgDiv = document.createElement( 'div' );
    msgDiv.innerHTML = message;
    msgDiv.style.left = "25px";
    msgDiv.style.top = "15px";
    msgDiv.style.position = "absolute";

    div.appendChild(msgDiv);
    div.setAttribute("id", "floatingDuck");

    div.addEventListener("click", dismiss);

    return div;
}

var div = createFloatingDuck("Test message!");
document.body.appendChild(div);