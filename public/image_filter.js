// Obviously only works if image has alt text - which every one should!!!

const bad_words = ["moodle", "cheese"]; // must be lowercase to match with toLowerCase on alt text

function alt_filter(bad_words) {
    var allImages = document.getElementsByTagName("img");
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt !== "") {
            for (var j = 0, length = bad_words.length; j < length; ++j) {
                
                if (allImages[i].alt.toLowerCase().includes(bad_words[j])) {
                    allImages[i].src = "";
                    allImages[i].alt = "";
                    break;
                }
            }
        }
    }
}

alt_filter(bad_words);