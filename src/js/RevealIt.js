import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import JSUTIL, { isDevice } from '@andresclua/jsutil';

import { breakpoints, currentBreakpoint, getCurrentBreakpoint, updateBreakpointOnResize } from '@teamthunderfoot/breakpoints';

class RevealIt {
    constructor(_payload = {}) {
        console.log('RevealIt', _payload);

        this.DOM = { element: _payload.element };
        this.animateOnMobile = _payload.animateOnMobile !== undefined ? _payload.animateOnMobile : true; // Default to true
        this.optionsOnBreakpoint = _payload.optionsOnBreakpoint;
        //this.mediaQueriesConfig = _payload.mediaQueriesConfig || {};

        // Default options
        const defaultOptions = {
            opacity: 0,
            duration: 1, // Default option
            scrollTrigger: {
                start: "top center",
                markers: false,
                toggleActions: 'play pause resume pause',
            },
            onStart: () => console.log("start"),
            onComplete: () => console.log("finish"),
            // Add any other animation defaults here
        };

        // Merge default options with user-provided options
        this.options = { ...defaultOptions, ..._payload.options };
        this.initialTrigger = _payload.initialTrigger ? _payload.initialTrigger : "top 80%";
        this.markers = _payload.markers ? _payload.markers : false;
        this.type = _payload.type ? _payload.type : "from";

        if (!this.DOM.element) {
            console.warn("RevealIt: No element provided");
            return; // Exit if no element is provided
        }

        //animateOnMobile
        if (this.animateOnMobile === false && isDevice('touch')) {
            return; // Exit initialization to disable animations on mobile
        }


        this.init();
    }

    init() {        

        // Determine current viewport width and apply options based on the breakpoint
        const isBelowBreakpoint = this.optionsOnBreakpoint && currentBreakpoint.currentWidth <= this.optionsOnBreakpoint.breakpoint;

        // Merge default options with breakpoint-specific ones if applicable
        if (isBelowBreakpoint) {
            this.options = {
                ...this.options,
                ...this.optionsOnBreakpoint.animation,
                scrollTrigger: {
                    ...this.options.scrollTrigger,
                    ...this.optionsOnBreakpoint.scrollTrigger
                }
            };
            this.type = this.optionsOnBreakpoint.type || this.type;
        }

        // Configure ScrollTrigger with possibly adjusted options
        const scrollTriggerConfig = {
            trigger: this.DOM.element,
            start: this.initialTrigger,
            markers: this.markers,
            ...this.options.scrollTrigger, // Spread any additional scrollTrigger options
        };

        // Configure the animation based on the type
        switch (this.type) {
            case "from":
                this.tl = gsap.from(this.DOM.element, { ...this.options, scrollTrigger: scrollTriggerConfig });
                break;
            case "to":
                this.tl = gsap.to(this.DOM.element, { ...this.options, scrollTrigger: scrollTriggerConfig });
                break;
            case "fromTo":
                if (Array.isArray(this.options.fromTo) && this.options.fromTo.length === 2) {
                    this.tl = gsap.fromTo(this.DOM.element, this.options.fromTo[0], { ...this.options.fromTo[1], scrollTrigger: scrollTriggerConfig });
                } else {
                    console.error("RevealIt: Invalid options structure for fromTo animation.");
                }
                break;
            default:
                console.warn(`RevealIt: Unsupported animation type '${this.type}'`);
        }

        //MATCHMEDIA TESTING
        let bk = breakpoints.reduce((target, inner) => Object.assign(target, inner), {});
        let mm = gsap.matchMedia();
        mm.add(`(max-width:${bk.mobile}px)`,() => {
            //gsap.to(this.DOM.element, { ...this.options, scrollTrigger: scrollTriggerConfig });
            gsap.to(".box",{rotation:360,duration:2})
            //console.log(this.tl);
        })
        mm.add(`(min-width:${bk.mobile+1}px)`,() => {
            gsap.to(".box",{rotation:-360,duration:2})
        })

    }

    getAnimation() {
        return this.tl;
    }

    refresh() {
        if (this.tl && this.tl.scrollTrigger) {
            this.tl.scrollTrigger.refresh();
        }
    }

    destroy() {
        if (this.tl && this.tl.scrollTrigger) {
            this.tl.scrollTrigger.kill();
        }
    }
}

export default RevealIt;
