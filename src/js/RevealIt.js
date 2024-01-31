import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
// let bk = breakpoints.reduce((target, inner) => Object.assign(target, inner), {})
// console.log(bk.mobile)

import { breakpoints, currentBreakpoint, getCurrentBreakpoint, updateBreakpointOnResize } from '@teamthunderfoot/breakpoints';

class RevealIt {
    constructor(_payload = {}) {
        console.log('RevealIt', _payload);

        // Default options
        const defaultOptions = {
            duration: 1,
            opacity: 0,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut",  
            delay: 0,             
            stagger: 0,           
            scale: 1,             
            rotation: 0,          
            x: 0,                 
            y: 0,                 
            onStart: null,
            onComplete: null
        };
        // Merge default options with user-provided options
        this.options = { ...defaultOptions, ..._payload.options };
        this.DOM = { element: _payload.element };

        if (!this.DOM.element) {
            console.warn("RevealIt: No element provided");
            return; // Exit if no element is provided
        }

        this.tl = gsap.timeline({});
        this.init();
    }

    init() {

        this.tl = gsap.timeline({
            onStart: () => {
                if (typeof this.options.onStart === 'function') {
                    this.options.onStart();
                }
            },
            onComplete: () => {
                if (typeof this.options.onComplete === 'function') {
                    this.options.onComplete();
                }
            }
        });

        // Use options from this.options
        this.tl.to(this.DOM.element, {
            
            duration: this.options.duration,
            opacity: this.options.opacity,
            yoyo: this.options.yoyo,
            repeat: this.options.repeat,
            ease: this.options.ease,
            delay: this.options.delay,
            stagger: this.options.stagger,
            scale: this.options.scale,
            rotation: this.options.rotation,
            x: this.options.x,
            y: this.options.y
            
        });
    }

    getAnimation() {
        return this.tl;
    }
    destroy() {
        // Kill the GSAP timeline
        this.tl.kill();
    }
    refresh() {
        this.destroy(); // Clean up existing timeline
        this.init(); // Reinitialize
    }
}
export default RevealIt;