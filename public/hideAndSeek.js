function createDuck(ducks) {
    let image = document.createElement('img');

    image.src = ducks[Math.floor(Math.random() * (ducks.length + 1))];
    //image.src = "https://www.heart.org/-/media/Images/Health-Topics/Congenital-Heart-Defects/50_1683_44a_ASD.jpg";
    image.style.position = 'absolute';
    image.style.width = `${Math.round(Math.random() * 50)/10 + 3.5}rem`;
    if (Math.floor(Math.random() * 4) !== 0) image.style.zIndex = -1;

    const position = Math.floor(Math.random() * 6);
    if (position === 0) {
        image.style.left = '-4.5rem';
        image.style.top = '-3rem';
        image.style.transform = 'rotate(329deg)'
    }
    else if (position === 1) {
        image.style.right = '-4rem';
        image.style.top = '1rem';
        image.style.transform = 'rotate(36deg)'
    }
    else if (position === 2) {
        image.style.right = '5rem';
        image.style.top = '-4rem';
        image.style.transform = 'rotate(355deg)'
    }
    else if (position === 3) {
        image.style.right = '2rem';
        image.style.top = '-4rem';
        image.style.transform = 'rotate(30deg)'
    }
    else if (position === 4) {
        image.style.right = '2rem';
        image.style.bottom = '-2rem';
        image.style.transform = 'rotate(3deg)'
    }
    else if (position === 5) {
        image.style.left = '-2.5rem';
        image.style.bottom = '-1rem';
        image.style.transform = 'rotate(17deg)'
    }

    return image;
}

chrome.storage.sync.get(['settings.awake', 'settings.enabledModules.module.hideAndSeek'], function(result) {
    if (result['settings.awake'] === false || result['settings.enabledModules.module.hideAndSeek'] === false) return;

    chrome.runtime.sendMessage({ action: 'getDucks' }, function (ducks) {
        if (!ducks) return;

        for (const result of document.getElementsByClassName('islrc')[0].childNodes) {
            if (result.tagName === 'DIV') {
                if (Math.floor(Math.random() * 2) === 0) {
                    // Add image
                    result.appendChild(createDuck(ducks));
                }
            }
        }
    });


});
