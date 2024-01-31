import "./../scss/index.scss";
//@ts-ignore
import RevealIt from "./RevealIt";

//@ts-ignore
// Find the first element with the class '.js--reveal-it' and pass it to the RevealIt constructor
// const firstRevealElement = document.querySelector(".js--reveal-it");
// var simpleReveal = new RevealIt({ element: firstRevealElement });

var exampleReveal = new RevealIt({ element: document.getElementById('js--reveal-it-example') });

// Toggle the animation on button click
//@ts-ignore
document.getElementById('toggleAnimation').addEventListener('click', function () {
    if (exampleReveal.getAnimation().isActive()) {
        exampleReveal.getAnimation().pause();
    } else {
        exampleReveal.getAnimation().play();
    }
});


// For multiple elements
//@ts-ignore
var reveals = [];
document.querySelectorAll('.js--reveal-it--multiple').forEach(function (element) {
    reveals.push(new RevealIt({ element: element }));
});
//@ts-ignore
document.getElementById('toggleAllAnimations').addEventListener('click', function () {
    //@ts-ignore
    reveals.forEach(function (reveal) {
        if (reveal.getAnimation().isActive()) {
            reveal.getAnimation().pause();
        } else {
            reveal.getAnimation().play();
        }
    });
});

//Custom reveal-it
const customReveal = new RevealIt({
    element: document.querySelector(".js--reveal-it-custom"),
    options: {
        duration: 2,
        opacity: 0,
        yoyo: false,
        repeat: 3
    }
});
//@ts-ignore
document.getElementById('triggerCustomAnimation').addEventListener('click', function () {
    customReveal.getAnimation().restart();
});


// Create a RevealIt instance with callbacks
const revealWithCallbacks = new RevealIt({
    element: document.querySelector(".js--reveal-it-callback"),
    options: {
        duration: 1,
        opacity: 0,
        yoyo: false,
        repeat: 2,
        onStart: () => console.log("Animation started"),
        onComplete: () => console.log("Animation completed")
    }
});

//@ts-ignore
document.getElementById('triggerAnimationWithCallbacks').addEventListener('click', function() {
    revealWithCallbacks.getAnimation().restart();
});

// referencias para getAnimation
// simpleReveal.getAnimation.play();
// simpleReveal.getAnimation.ScrollTrigger.normalizeScroll(true);
// simpleReveal.getAnimation.ScrollTrigger.enable()
// document.querySelectorAll(".js--reveal-it").forEach((element) => {
//     var multipleReveal = new RevealIt({ element: element });
// });

