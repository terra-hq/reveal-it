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

//MATCHMEDIA

// red square options
const breakpointOptionsScroll = {
    largerScreen: {
        minWidth: 'tablets', 
        animationOptions: {
            opacity: 1,
            duration: 1,
            x: 100,
            yoyo:true,
            repeat:-1,
            scrollTrigger: {
                trigger: ".box3",
                start: "top center",
                toggleActions: 'play none none none',
            },
            onStart: () => console.log("Animation started on larger screens"),
            onComplete: () => console.log("Animation completed on larger screens"),
        }
    },

    smallerScreen: {
        maxWidth: 'tablets', 
        animationOptions: {
            opacity: 0.5,
            duration: 1.5,
            y: 100,
            yoyo:false,
            scrollTrigger: {
                trigger: ".box3",
                start: "top center+=100",
                toggleActions: 'play none none none',
            },
            onStart: () => console.log("Animation started on smaller screens"),
            onComplete: () => console.log("Animation completed on smaller screens"),
        }
    }
};
//red square instance
const box3Reveal = new RevealIt({
    element: document.querySelector('.box3'),
    animateOnMobile: true,
    breakpointOptions: breakpointOptionsScroll
});

// purple square options
const breakpointOptionsRotate = {
    defaultRotation: {
        minWidth: 'tabletm',
        animationOptions: {
            rotate: 360, 
            duration: 2, 
            repeat: -1, 
            ease: "none" 
        }
    },
    reverseRotation: {
        maxWidth: 'tabletm', 
        animationOptions: {
            rotate: -360, 
            duration: 2, 
            repeat: -1, 
            ease: "none" 
        }
    },
    reverseRotationScale: {
        maxWidth: 'mobile', 
        animationOptions: {
            scale: 2,
            duration: 2, 
            repeat: -1, 
            ease: "none" 
        }
    }
};

// purple square instance
const box2Reveal = new RevealIt({
    element: document.querySelectorAll('.box2'),
    animateOnMobile: true,
    breakpointOptions: breakpointOptionsRotate
});