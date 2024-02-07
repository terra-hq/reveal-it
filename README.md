# @terrahq/reveal-it

Javascript module for animate elements written in Vanilla js.  
[> examples](https://terra-revealit.netlify.app//)

## Usage

### Install

```sh
npm install @terrahq/reveal-it
```

### Import

```javascript
import RevealIt from "@terrahq/reveal-it";
```

### Initialize
### JS
```javascript
 let example = new RevealIt({
        element: document.querySelector('.js--reveal-it'),
        // Optional: Customize options here
    });
```

### Markup

#### Minimum markup

```html
<div class="js--reveal-it">
    <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ea deleniti nisi maxime sequi corporis labore repellat impedit,
        id vel, esse ad, culpa praesentium? Nobis quam fugiat natus,
        at nisi cumque.
    </p>
</div>
```

## Initialize with options

### JS
```javascript
const example = document.querySelector(".js--reveal-it-w-options");
const revealWithCallbacks = new RevealIt({
    element: example,
    options: {
        duration: 1,
        opacity: 0,
        yoyo: false,
        repeat: 2,
        onStart: function () {
            example.classList.remove('animation-completed');
            example.classList.add('animation-started');
        },
        onComplete: function () {
            example.classList.add('animation-completed');
            example.classList.remove('animation-started');
        },
    }
});
```
## Options

| Option Name       | Type                                     | Default                   | Desc                                                                                                                     |
|-------------------|------------------------------------------|---------------------------|--------------------------------------------------------------------------------------------------------------------------|
| opacity           | number                                   | 0                         | Initial opacity of the element before the animation starts.                                                              |
| duration          | number                                   | 1                         | Duration of the animation in seconds.                                                                                    |
| rotate            | number                                   | -                         | Degrees to rotate the element. Not set by default.                                                                       |
| scale             | number                                   | -                         | Factor by which to scale the element. Not set by default.                                                                |
| y                 | number                                   | -                         | Vertical movement in pixels. Not set by default.                                                                         |
| x                 | number                                   | -                         | Horizontal movement in pixels. Not set by default.                                                                       |
| repeat            | number                                   | -                        | Number of times the animation repeats. `-1` for infinite.                                                                |
| ease              | string                                   | "none"                    | GSAP easing function to control animation pacing.                                                                        |
| scrollTrigger     | object                                   | start: "top center", markers: false, toggleActions: 'play pause resume pause',                        | Configuration object for GSAP's ScrollTrigger plugin.                                                                    |
| onStart           | function                                 | console.log("start")                       | Callback function that runs at the start of the animation.                                                              |
| onComplete        | function                                 | console.log("finish")                       | Callback function that runs upon completion of the animation.                                                           |


## Responsive Animation Example with Breakpoints

This example demonstrates how to use `RevealIt` to create responsive animations that behave differently based on the viewport size. By specifying breakpoint options, you can define unique animation behaviors for various screen sizes.

### Example Code

```javascript
// Define breakpoint options for responsive animations
const breakpointOptionsScroll = {
    largerScreen: {
        minWidth: 'tablets',
        animationOptions: {
            opacity: 1,
            duration: 1,
            x: 100,
            yoyo: true,
            repeat: -1,
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
            yoyo: false,
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

// Initialize RevealIt with the defined breakpoint options
const box3Reveal = new RevealIt({
    element: document.querySelector('.box3'),
    animateOnMobile: true,
    breakpointOptions: breakpointOptionsScroll
});
```

### Breakpoints
Breakpoints in the configuration are referenced by string names. The corresponding pixel values for each named breakpoint are as follows:

```javascript
const breakpoints = [
    { 'mobile': 580 },
    { 'tablets': 810 },
    { 'tabletm': 1024 },
    { 'tabletl': 1300 },
    { 'laptop': 1570 },
    { 'desktop': 1700 }
];

```

## Methods

### getAnimation()

Retrieves the GSAP animation instance for further manipulation. This allows direct access to GSAP's animation methods such as `.restart()`, `.pause()`, `.play()`, and more.

#### Usage

```javascript
// If we want to restart the animation
revealit.getAnimation().restart;
```

### refresh()

Refreshes the ScrollTrigger instance associated with the animation. This method is useful when the DOM changes in a way that affects the size or position of the animated element, ensuring the scroll animations remain accurate.

#### Usage

```javascript
revealit.refresh();
```

### destroy()

Destroys the ScrollTrigger instance linked to the animation, effectively removing the scroll-triggered behaviors and listeners. Use this method to clean up when an animation is no longer needed to prevent memory leaks and ensure optimal performance.

#### Usage

```javascript
revealit.destroy();
```

## License
