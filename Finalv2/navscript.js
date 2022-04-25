const lis = document.querySelectorAll(".header .menu ul li");
const lbs = document.querySelectorAll("svg polygon.lb");
const ul = document.querySelector(".header .menu ul");
const lineDash = document.querySelector(".line-dash");

const activeOnLoad = document.querySelector("li.active");
const indexOnLoad = Array.prototype.indexOf.call(lis, activeOnLoad);

var dashOrigin = tabIndexToOffset(indexOnLoad); //pixels
var selectedLi = tabIndexToOffset(indexOnLoad); //pixels
var speed = 500; //move this many pixels in one second.
var distance = Math.abs(tabIndexToOffset(indexOnLoad));
var time = 0;

// set initial hover indicator bar to the active nav element
TweenLite.to(lineDash, 0, {strokeDashoffset: tabIndexToOffset(indexOnLoad)})

// initial animation and class for HOME
TweenLite.to(lbs[indexOnLoad], 0.6, {
                    y: -43,
                    ease: Bounce.easeOut,
                    delay: 1
                });

//push all the bottom lines down.
function pushDownLb() {
    for(let k = 0; k < lbs.length; ++k)
        TweenLite.to(lbs[k], 0.5, {
                    y: 0,
                    ease:  Power3.easeOut
                });
}

function tabIndexToOffset(index) {
    return (-250 * index) - 35;
}

ul.addEventListener(
    "mouseleave",
    function(e) {
        // to avoid a bug in chrome that sometimes triggers mouseleave on click
        // and the relatedTarget comes up null
        if (e.relatedTarget) {
            distance = Math.abs(dashOrigin - selectedLi);
            time = distance / speed;
            dashOrigin = selectedLi;
            if (time) {
                // overlaping tweens would give a zero time
                TweenLite.to(lineDash, time, {
                    strokeDashoffset: selectedLi,
                    ease: Bounce.easeOut
                });
            } //if
        } //if
    },
    false
);

for (let i = 0; i < 4; ++i) {
    lis[i].addEventListener("mouseover", function() {
        distance = Math.abs(tabIndexToOffset(i) - dashOrigin);
        time = distance / speed;
        dashOrigin = tabIndexToOffset(i);
        if (time) {
            TweenLite.to(lineDash, time, {
                strokeDashoffset: tabIndexToOffset(i),
                ease: Bounce.easeOut
            });
        } //if
    });

    lis[i].addEventListener("click", function() {
        selectedLi = tabIndexToOffset(i);
        pushDownLb();
        let current = document.getElementsByClassName("active");
        current[0].classList.remove("active");
        lis[i].classList.add("active");
        TweenLite.to(lbs[i], 0.5, {
                    y: -43,
                    ease: Bounce.easeOut
                });
    });
}
