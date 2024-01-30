import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
// let bk = breakpoints.reduce((target, inner) => Object.assign(target, inner), {})
// console.log(bk.mobile)

import { breakpoints, currentBreakpoint, getCurrentBreakpoint, updateBreakpointOnResize } from '@teamthunderfoot/breakpoints';

class RevealIt{
    constructor(_payload = {}) {
        console.log('RevealIt', _payload);
        this.element = _payload.element;
        if (!this.element) {
            console.warn("RevealIt: No element provided");
        }
        // USE THIS.DOM FOR ALL SELECTORS
        // this.DOM = {
        //     element: this.element // use this.DOM for all animations
        // }
        this.tl = gsap.timeline({});
        console.log(this);
        this.init();
    }

    init() {
        this.tl.to(this.element, { duration: 1, opacity: 0, yoyo: true, repeat: -1 });        
    }

    getAnimation(){
       return this.tl;
    }
    destroy(){

    }
    refresh(){

    }
}
export default RevealIt;