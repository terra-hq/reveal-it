import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { isDevice } from '@andresclua/jsutil';

import { breakpoints, currentBreakpoint, getCurrentBreakpoint, updateBreakpointOnResize } from '@teamthunderfoot/breakpoints';

class RevealIt {
    constructor(_payload = {}) {
        //console.log('RevealIt', _payload);

        this.DOM = { element: _payload.element };
        this.animateOnMobile = _payload.animateOnMobile !== undefined ? _payload.animateOnMobile : true; // Default to true
        this.optionsOnBreakpoint = _payload.optionsOnBreakpoint;
        //matchmedia
        this.breakpointOptions = _payload.breakpointOptions || {};

        // Default options
        const defaultOptions = {
            //opacity: 0,
            duration: 1, // Default option
            scrollTrigger: {
                start: "top center",
                markers: false,
                toggleActions: 'play pause resume pause',
            },
            onStart: () => console.log("start"),
            onComplete: () => console.log("finish"),
        };

        // Merge default options with user-provided options
        this.options = { ...defaultOptions, ..._payload.options };
        this.initialTrigger = _payload.initialTrigger ? _payload.initialTrigger : "top 80%";
        this.markers = _payload.markers ? _payload.markers : false;
        //default animation type: from
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

        //Deprecated isBelowBreakpoint
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

        //matchmedia
        let bk = breakpoints.reduce((target, inner) => Object.assign(target, inner), {});
        
        if (this.breakpointOptions && Object.keys(this.breakpointOptions).length > 0) {
            const mm = gsap.matchMedia();
            Object.keys(this.breakpointOptions).forEach(key => {
                const breakpoint = this.breakpointOptions[key];
                let mediaQuery;
                
                if (breakpoint.minWidth !== undefined) {
                    const minWidthValue = typeof breakpoint.minWidth === 'string' ? bk[breakpoint.minWidth] : breakpoint.minWidth;
                    mediaQuery = `(min-width: ${minWidthValue+1}px)`;
                } else if (breakpoint.maxWidth !== undefined) {
                    const maxWidthValue = typeof breakpoint.maxWidth === 'string' ? bk[breakpoint.maxWidth] : breakpoint.maxWidth;
                    mediaQuery = `(max-width: ${maxWidthValue}px)`;
                }
                
                if (mediaQuery) {
                    mm.add(mediaQuery, () => {
                        this.configureAnimation(breakpoint.animationOptions);
                    });
                }
            });
        } else {
            this.configureAnimation(this.options);
        }

    }

    configureAnimation(animationOptions) {
        const scrollTriggerConfig = {
            trigger: this.DOM.element,
            start: this.initialTrigger,
            markers: this.markers,
            ...animationOptions.scrollTrigger, // Use animationOptions for scrollTrigger config
        };

        // Animation type (from/to/fromTo) if it's not defined it will be from
        switch (this.type) {
            case "from":
                this.tl = gsap.from(this.DOM.element, { ...animationOptions, scrollTrigger: scrollTriggerConfig });
                break;
            case "to":
                this.tl = gsap.to(this.DOM.element, { ...animationOptions, scrollTrigger: scrollTriggerConfig });
                break;
            case "fromTo":
                // Ensure fromTo logic correctly uses animationOptions
                if (Array.isArray(animationOptions.fromTo) && animationOptions.fromTo.length === 2) {
                    this.tl = gsap.fromTo(this.DOM.element, animationOptions.fromTo[0], { ...animationOptions.fromTo[1], scrollTrigger: scrollTriggerConfig });
                } else {
                    console.error("RevealIt: Invalid options structure for fromTo animation.");
                }
                break;
            default:
                console.warn(`RevealIt: Unsupported animation type '${this.type}'`);
        }
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
