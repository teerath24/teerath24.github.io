// ACTIVE HAMBURGER MENU
let menuIcon = document.querySelector('.menu-icon');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active'); // toggle -  assigning or removing a class directly from an element 
})

//ACTIVE NAV MENU
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activateMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove('active'));
    menuLi[len].classList.add('active');
}
//Calculates the index of the currently active section based on the user's scroll position. It compares the window's vertical scroll position (window.scrollY) plus 97 pixels with the offsetTop property of each section to determine the active section.
// Removes the 'active' class from all menu items (anchor elements) within the header.
//Adds the 'active' class to the menu item (anchor element) corresponding to the active section based on the scroll position.

activateMenu();
window.addEventListener('scroll',activateMenu);



//TYPING TEXT ANIMATION
const text = document.querySelector('.sec-text');

const textLoad = () =>{
    setTimeout(() =>{
        text.textContent = "Frontend Developer";
    },0);
    setTimeout(() =>{
        text.textContent = "UX/UI Designer";
    },4000);
    setTimeout(() =>{
        text.textContent = "Drummer";
    },8000); //1s is 1000 milliseonds
}
    textLoad();
    setInterval(textLoad,12000);

// SWITCH BETWEEN ABOUT BUTTONS
const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click',() => {
        contents.forEach(content => content.style.display = "none");
        contents[index].style.display = "block";
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    })
});

//PORTFOLIO FILTER

var mixer = mixitup('.portfolio-gallery',{
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});

// SIDE PROGRESS BAR
let calcScrollValue = () => {
    let scrollProgress = document.getElementById('progress');
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight)
    
    //If the scroll position is greater than 100 pixels, it displays the progress bar by setting its display style to "grid". If not, it hides the progress bar by setting its display style to "none"
    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener('click',() =>{
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#000 ${scrollValue}%,#0ef ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

//It calculates the scroll value as a percentage of the total scrollable height based on the current scroll position (pos) and the total scrollable height of the page (calcHeight).
//The scroll value is calculated as (pos * 100) / calcHeight.
//It rounds the scroll value using Math.round().