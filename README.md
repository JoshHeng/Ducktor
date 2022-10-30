# ❤ Ducktor - Your Adorable Web Companion

> Ducktor blocks out bad image content and replaces it with... well... ducks. And more! From screen time reminders to duck dress-up, Ducktor sits in your tray, keeping you company as you surf the web. 🦆

## Inspiration
The news and internet often gets a lot of us down. We see things we don't wish to see, and we often know what kind of material we really want to block out. As a group, we decided that the best way to navigate the web safely is to replace these images using a blocked wordlist. But no one wants to stare at a bunch of broken image links, so what better, cuter thing to use than **a bunch of ducks?**

So we set out to do just that, adding some customisable duck fun along the way and a host of other functions to make our cute little duckling a truly formidable web companion.

## What it does
Ducktor sits in any Chrome-based browser, showing a customisable animated duck whenever you click it. This duck can be awakened or set to sleep, depending on whether you want Ducktor's functions on or off - and its individual functions can be toggled too.

Ducktor's main function is **image replacement.** When on, it replaces any image that matches a set of user-defined word criteria with a picture of your own customised duck. This duck can be given various hats and even a name, making sure that you never get bored of replacing images with an adorable friend you've helped make.

Ducktor also promotes other forms of wellbeing;
- A little duck will pop up in the bottom right corner of your screen giving you a reminder of how much time you've been spending online. This reminder is customisable, allowing you to set just how long you want to be online.
- When opening the Ducktor window, your duck will give you motivational and inspirational quotes to remind you just how much it loves you <3
- The hide and seek function is a much needed boost of serotonin, that weaves ducks in and out of Google image searches to enhance your searching experience.

## How we built it
- Ducktor's graphics are all made using vector graphic programs such as Affinity Designer, and hand-drawn by our graphic designer **Ana.** She also animated these ducks using Krita, exported them as .gifs and helped in styling them within CSS and JS.
- **Oscar** built Ducktor's image replacement, using React and TypeScript. This searches image sources and alt text for matching keywords, determining whether an image should be fully replaced or not.
- **Eugene** created the screen-time reminders and made sure the bottom right duck appeared with appropriate speech bubbling. The timing customisation logic was also made by him, using all the same tech as the image replacement function.
- And last, but DEFINITELY not least, **Josh** put everything together, making sure each module is toggle-able, works seamlessly with the others, and that all changes to a duck persist as the page/browser is reloaded or changed. And he also made the hide and seek function; all of this was done with React and TypeScript too.

## Challenges we ran into
Here are a few of the many challenges we ran into as we tried to work through making all our objectives a reality:
- We found that many webpages have inconsistent tags and attributes that they use for images. When blocking out images we needed very, VERY long conditional statements to ensure the ducks could always block things when needed.
- Image sizing. Just image sizing. So. Many. Stretched. Ducks.
- Time management and understanding where we needed to be at certain points in our code - in the words of Oscar, we were definitely "sleep-challenged".

## Accomplishments that we're proud of and what we learned
In our first hackathon as a group of friends, we are so proud of ourselves for having created a working product that is also utterly adorable!

**Eugene** had never used any web languages before, and so learning them on the spot and creating one of the more complex modules was his proudest achievement.

**Ana** had also never used animation software - from downloading an open source program to do so to learning its full toolkit, she pushed herself to finish some well-made GIF animations.

**Josh** has never coded under time pressure and really glued the whole project together, being the only person with existing JS expertise. His contributions as a whole are so large that it's definitely something to be proud of in his first ever hackathon.

**Oscar** has never created applications which have an emphasis on styling and UI. His work on styling the application and integrating Ana's work into his own has taught him valuable lessons in user experience and how to make existing assets shine in his web work.

## What's next for ❤ Ducktor - Your Adorable Web Companion
We hope to make Ducktor into a full-fledged Chrome extension that's publicly downloadable, so anyone can experience the love and comfort of a little web duckling.

# Development Instructions

1. Install dependencies using `npm install`
2. Run `npm run buildwindows` or `npm run buildlinux` to build the project
3. Open Chrome, go to [extensions](chrome://extensions/) and enable **Developer Mode** in the top right
4. Click **Load Unpacked** and navigate to `$PROJECT_DIR$/build`
5. Click the bookmarks icon in the toolbar to pin Ducktor

### Running with Refresh

If developing the UI, run `npm start` and then the UI can be visited at [http://localhost:3000](http://localhost:3000).
