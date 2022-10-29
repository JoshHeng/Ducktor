// Obviously only works if image has alt text - which every one should!!!

function alt_filter(bad_words) {
    var allImages = document.getElementsByTagName("img");
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt !== "") {
            for (var j = 0, length = bad_words.length; j < length; ++j) {
                console.log(bad_words[j]);
                
                if (allImages[i].alt.toLowerCase().includes(bad_words[j])) {
                    allImages[i].src = "";
                    allImages[i].alt = "";
                    break;
                }
            }
        }
    }
}

chrome.storage.sync.get(['altTextFilterStrings'], function(result) {
    console.log('Value currently is ' + result.altTextFilterStrings);
    let words = result.altTextFilterStrings.split("\n");
    words = words.filter(element => { return element !== '' }); // avoid any effective widlcards
    alt_filter(words);
  });
