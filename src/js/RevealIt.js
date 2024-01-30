import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
// let bk = breakpoints.reduce((target, inner) => Object.assign(target, inner), {})
// console.log(bk.mobile)

// import { breakpoints, currentBreakpoint, getCurrentBreakpoint, updateBreakpointOnResize } from '@teamthunderfoot/breakpoints';

class RevealIt{
    constructor(_payload = {}){
        console.log('RevealIt',_payload)
        this.tl = gsap.timeline({});
        console.log(this)
        this.init()
    }
    init(){

        this.tl.to(document.querySelector(".js--reveal-it"),{duration:1,opacity:0,yoyo:true,repeat:-1})
        setTimeout(()=>{

            this.getAnimation();
        },1000)
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