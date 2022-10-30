// Obviously only works if image has alt text - which every one should!!!

function alt_filter(bad_words, duckType) {

    let allImages = document.getElementsByTagName("img");

    if (!duckType || duckType === "none") {
        var imgURL = chrome.runtime.getURL("ducks/Duck.png");
    }

    else {
        duckType = duckType.charAt(0).toUpperCase() + duckType.slice(1);
        var imgURL = chrome.runtime.getURL("ducks/Duck"+duckType+".png");
    }

    for (let i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt !== "" || allImages[i].src !== "" || allImages[i].srcset !== "") {
            for (let j = 0, length = bad_words.length; j < length; ++j) {
                let word = bad_words[j].toLowerCase()

                if (allImages[i].alt.toLowerCase().includes(word)) {
                    allImages[i].alt = "";
                    allImages[i].src = imgURL;
                    allImages[i].srcset = "";
                    break;
                }

                else if (allImages[i].src.toLowerCase().includes(word)) {
                    allImages[i].alt = "";
                    allImages[i].src = imgURL;
                    allImages[i].srcset = "";
                    break;
                }

                else if (allImages[i].srcset.toLowerCase().includes(word)) {
                    allImages[i].alt = "";
                    allImages[i].src = imgURL;
                    allImages[i].srcset = "";
                    break;
                }
            }
        }
    }
}

chrome.storage.sync.get(['TextFilterStrings', 'settings.awake', 'settings.enabledModules.module.imageFilter', 'settings.duckType'], function(result) {
    if (result['settings.awake'] === false || result['settings.enabledModules.module.imageFilter'] === false) return;

    let words = result.TextFilterStrings.split("\n");
    words = words.filter(element => { return element !== '' }); // avoid any effective wildcards
    alt_filter(words, result['settings.duckType']);
});
