// Obviously only works if image has alt text - which every one should!!!

function alt_filter(bad_words) {
    let allImages = document.getElementsByTagName("img");
    var imgURL = chrome.runtime.getURL("ducks/duck.png");

    for (let i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt !== "" || allImages[i].src !== "" || allImages[i].srcset !== "") {
            for (let j = 0, length = bad_words.length; j < length; ++j) {
                if (allImages[i].alt.toLowerCase().includes(bad_words[j])) {
                    allImages[i].alt = "";
                    allImages[i].src = imgURL;
                    allImages[i].srcset = "";
                    break;
                }

                else if (allImages[i].src.toLowerCase().includes(bad_words[j])) {
                    allImages[i].alt = "";
                    allImages[i].src = imgURL;
                    allImages[i].srcset = "";
                    break;
                }

                else if (allImages[i].srcset.toLowerCase().includes(bad_words[j])) {
                    allImages[i].alt = "";
                    allImages[i].src = imgURL;
                    allImages[i].srcset = "";
                    break;
                }
            }
        }
    }
}

chrome.storage.sync.get(['TextFilterStrings', 'settings.awake', 'settings.enabledModules.module.imageFilter'], function(result) {
    if (result['settings.awake'] === false || result['settings.enabledModules.module.imageFilter'] === false) return;

    let words = result.TextFilterStrings.split("\n");
    words = words.filter(element => { return element !== '' }); // avoid any effective wildcards
    alt_filter(words);
});
