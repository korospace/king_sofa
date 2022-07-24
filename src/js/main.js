// document.querySelector("#sofa_1 img").addEventListener('load',function() {
       
// })

const imgBeranda = document.querySelector("#beranda img");

if (imgBeranda.complete) {
    removeLoading();
}

function removeLoading() {
    $('#loading').addClass("loading-hide");
    setTimeout(() => {
        gsap.from("#sofa_1,#sofa_2,#sofa_3,#sofa_4", {y: 20, opacity: 0, duration: 1, stagger:0.2});
    }, 100);
}

/**
 * Navbar
 */
const nav = document.querySelector('nav');
const brandText = document.querySelector('.brand_text');
const alertIg = document.querySelector('#alert_ig');

// --- Add shadow when scrolling ---
window.addEventListener('scroll',(e)=>{
    if (window.scrollY > 0) {
        alertIg.classList.remove("h-0");
        $('#whatsapp').removeClass('whatsapp-hide');
    }
    else{
        alertIg.classList.add("h-0");
        $('#whatsapp').addClass('whatsapp-hide');
    }

    if(!nav.classList.contains('nav-down')){
        if(window.pageYOffset>0){
            nav.classList.add("shadow");
            nav.classList.add("bg-white");
            brandText.classList.remove("opacity-0");
        }
        else{
            nav.classList.remove("shadow");
            nav.classList.remove("bg-white");
            brandText.classList.add("opacity-0");
        }
    }

    if (window.scrollY < $('#jasa').offset().top - 160) {
        $('.navbar-nav li a').removeClass('li-active');
        $('#href-beranda').addClass('li-active');
    }
    if (window.scrollY > $('#jasa').offset().top - 160 && window.scrollY < $('#kelebihan').offset().top - 160) {
        $('.navbar-nav li a').removeClass('li-active');
        $('#href-jasa').addClass('li-active');
    }
    if (window.scrollY > $('#galery').offset().top - 160 && window.scrollY < $('#tentang_kami').offset().top - 160) {
        $('.navbar-nav li a').removeClass('li-active');
        $('#href-galery').addClass('li-active');
    }
    if (window.scrollY > $('#tentang_kami').offset().top - 300) {
        $('.navbar-nav li a').removeClass('li-active');
        $('#href-tentang_kami').addClass('li-active');
        $('#whatsapp').addClass('whatsapp-hide');
    }
});

// --- Add shadow when nav toggle OnClick ---
document.querySelector('.navbar-toggler').addEventListener('click', () => {
    if(window.pageYOffset==0){
        if(nav.classList.contains('nav-down')){
            nav.classList.remove('nav-down');
            nav.classList.remove('shadow');
        }
        else{
            nav.classList.add('nav-down');
            nav.classList.add('shadow');
        }
    }
})

// --- href ono click ---
$('.nav-link').on('click', function(e) {
    e.preventDefault();
    // $('.navbar-nav li a').removeClass('li-active');
    // $(this).addClass('li-active');

    let elementTarget = $($(this).attr('href'));

    $('html').animate({
        scrollTop : elementTarget.offset().top - 140
    },1500);
})

/**
 * Beranda
 */

// typedjs
var options = {
    strings: [
        'Pembuatan',
        'Perubahan Model', 
        'Penggantian Kain'
    ],
    backSpeed: 60,
    typeSpeed: 110,
    loop: true,
    loopCount: Infinity,
    showCursor: true,
};
  
var typed = new Typed('span#typed', options);

// particlejs
tsParticles.load("beranda", {
    particles: {
        color: {
            value: "#BC9F82"
        },
        line_linked: {
          enable: false,
          distance: 500,
          color: "#ffffff",
          opacity: 0,
          width: 2
        },
        size: {
            value: 4
        },
        move: {
            speed: 1
        }
    },
    preset: "snow",
});

/**
 * Img On Click
 */
let zoomBg    = document.querySelector("#zoom_bg");
let zoomImg   = document.querySelector("#zoom_bg #zoom_img")
let zoomClose = document.querySelector("#zoom_bg #zoom_close")

function imgOnClick(el) {
    let src = el.src;

    document.body.style.overflow="hidden";
    zoomBg.classList.remove("zoomHide");
    zoomImg.src = src;
}

zoomClose.addEventListener("click", () => {
    document.body.style.overflow="auto";
    zoomBg.classList.add("zoomHide");
    zoomImg.src = "";
})

/**
 * GSAP
 */
gsap.registerPlugin(ScrollTrigger);

// Jasa
gsap.fromTo("#jasa h1", {x: -20, opacity: 0}, {duration: 1, x: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#jasa h1"});
gsap.fromTo("#jasa p", {x: -20, opacity: 0}, {duration: 1, x: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#jasa p"});
gsap.fromTo("#jasa .card", {y: 10, opacity: 0}, {duration: 1, y: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#jasa .card", stagger: 0.2});

// kelebihan
gsap.fromTo("#kelebihan h1", {x: -20, opacity: 0}, {duration: 1, x: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#kelebihan h1"});
gsap.fromTo("#kelebihan p", {x: -20, opacity: 0}, {duration: 1, x: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#kelebihan p"});
gsap.fromTo("#kelebihan li", {y: 10, opacity: 0}, {duration: 1, y: 0, opacity: 1, delay: 0.6 ,scrollTrigger:"#kelebihan li", stagger: 0.3});
gsap.fromTo("#kelebihan img", {x: 20, opacity: 0}, {duration: 1, x: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#kelebihan img"});

// galery
gsap.fromTo("#galery h1", {y: -20, opacity: 0}, {duration: 1, y: 0, opacity: 1, delay: 0.3 ,scrollTrigger:"#galery h1"});
gsap.fromTo("#galery img", {opacity: 0}, {duration: 1, opacity: 1,scrollTrigger:"#galery img", stagger: 0.2});

// tentang kami
gsap.fromTo("#tentang_kami .subtitle", {y: 20, opacity: 0}, {duration: 1, y: 0, opacity: 1,scrollTrigger:"#tentang_kami .subtitle", stagger: 0.2});