// Obviously only works if image has alt text - which every one should!!!

function alt_filter(bad_words) {
    var allImages = document.getElementsByTagName("img");
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt !== "" || allImages[i].src !== "" || allImages[i].srcset !== "") {
            for (var j = 0, length = bad_words.length; j < length; ++j) {
                console.log(allImages[i]);

                if (allImages[i].alt.toLowerCase().includes(bad_words[j])) {
                    allImages[i].alt = "";
                    allImages[i].src = "";
                    allImages[i].srcset = "";
                    break;
                }

                else if (allImages[i].src.toLowerCase().includes(bad_words[j])) {
                    console.log("trigger 1");
                    allImages[i].alt = "";
                    allImages[i].src = "";
                    allImages[i].srcset = "";
                    break;
                }

                else if (allImages[i].srcset.toLowerCase().includes(bad_words[j])) {
                    console.log("trigger 1");
                    allImages[i].alt = "";
                    allImages[i].src = "";
                    allImages[i].srcset = "";
                    break;
                }
            }
        }
    }
}

chrome.storage.sync.get(['TextFilterStrings'], function(result) {
    let words = result.TextFilterStrings.split("\n");
    words = words.filter(element => { return element !== '' }); // avoid any effective widlcards
    alt_filter(words);
  });
