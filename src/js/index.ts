import "./../scss/index.scss";
//@ts-ignore
import RevealIt from "./RevealIt";


//Simple - one element
var element = document.querySelector('.js--reveal-it--simple');
var simpleReveal = new RevealIt({
    element: element,
    options: {
        onStart: function () {
            //@ts-ignore
            element.classList.add('animation-started');
        },
        onComplete: function () {
            //@ts-ignore
            element.classList.add('animation-completed');
            //@ts-ignore
            element.classList.remove('animation-started');
        },
        scrollTrigger: {
            markers: true
        }
    },
    optionsOnBreakpoint: {
        breakpoint: 580,
        type: 'from',
        animation: {
            opacity: 0.5,
            rotate: -180,
            duration: 2,
        },
        scrollTrigger: {
            end: "bottom center",
            scrub: true,
        }
    },
    animateOnMobile: true,
});


//Simple - multiple elements
var reveals = [];
document.querySelectorAll('.js--reveal-it--multiple').forEach(function (element) {
    reveals.push(new RevealIt({
        element: element, options: {

            scrollTrigger: {
                markers: true
            }
        }
    }));
});

//Custom reveal-it
const customReveal = new RevealIt({
    element: document.querySelector(".js--reveal-it-custom"),
    options: {
        duration: 2,
        opacity: 0,
        yoyo: false,
        repeat: 0,
        scale: .2,
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
document.getElementById('triggerAnimationWithCallbacks').addEventListener('click', function () {
    revealWithCallbacks.getAnimation().restart();
});


//Scrolltrigger
const revealWithScroll = new RevealIt({
    element: document.querySelector(".js--reveal-it-scrolltrigger"),
    options: {
        ease: 'power2.inOut',
        opacity: 0,
        yoyo: false,
        onStart: () => console.log("Scrolltrigger Animation started"),
        onComplete: () => console.log("Scrolltrigger Animation completed"),


    },
});
const revealWithScroll2 = new RevealIt({
    element: document.querySelector(".js--rc"),
    type: "from",
    options: {
        ease: 'power2.inOut',
        opacity: 0,
    }
});


