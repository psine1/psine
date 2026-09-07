
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/logo.png");

function preloadImages(e) {
    for (var i = 0; i < imageArray.length; i++) {
        var tempImage = new Image();
        tempImage.addEventListener("load", trackProgress, true);
        tempImage.src = imageArray[i];
    }
}

function trackProgress() {
    loadedImages++;
    if (loadedImages == imageArray.length) {
        imagesLoaded();
    }
}

function imagesLoaded() {
    
    document.getElementById('loader-container').style.display = 'none';
    document.getElementById('banner_content').style.display = 'block';    

    initHandlers();
    initAnimations();

}

/* PARA DETECTAR SI ES IOs */
var is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (is_Mac == true || iOS == true) {
     
}



/* PARA DETECTAR SI ES IE */
if(navigator.userAgent.indexOf('MSIE')!==-1
|| navigator.appVersion.indexOf('Trident/') > 0){
  
}


// VARIABLES GLOBALES
var multitimeline = gsap.timeline();
 //   multitimeline.addPause(25);
    multitimeline
    .add(fr1(), 0)
    .add(fr2(), 2.5)
    .add(fr3(), 6.5)
    .add(fr4(), 15)
    .add(fr5(), 19.5)
    ;

var flagg = 0;
var hover = false;


function fr1(){
    var tl_ = gsap.timeline();
    tl_.timeScale( 1 );  
    tl_
    .from("[id*='txt-1']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 0)
    .to("[id*='smoke-1-a']", {duration: 15, x: -250, ease: "power3.out"}, 0)
    .to("[id*='smoke-1-b']", {duration: 15, x: -130, ease: "power2.out"}, 0)
    .to("[id*='overlay-1']", {duration: 2.5, autoAlpha: 0, ease: "power3.out"}, 0)

    .fromTo("[id*='shine']", {autoAlpha: 0}, {duration: 1, autoAlpha: 0.5, ease: "power3.out"}, 1)
    .to("[id*='animShine']", {duration: 4, x: -300, y: -300, ease: "power3.out"}, 1)
    ;
return tl_  
}


function fr2(){
    var tl_ = gsap.timeline();
    tl_.timeScale( 1 );  
    tl_
    .to("[id*='txt-1']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 0.75)
    .from("[id*='txt-2']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 1.5)

    //.to("[id*='ultraGear-1']", {duration: 2, scale: 0.18, y: 85, ease: "power3.out"}, 0)
    .to("[id*='UG']", {duration: 0.1, autoAlpha:0, ease: "power3.out"}, 0)
    .from("[id*='img-1']", {duration: 2, scale: 6, transformOrigin: "50% 50%", y: -98, x: -19, ease: "power3.out"}, 0)
    .from("[id*='bg']", {duration: 2, scale: 3, ease: "power3.out"}, 0)
    .from("[id*='ultraGear-2']", {duration: 2, autoAlpha: 0, ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false})"}, 2)
    
    .to("[id*='smoke-1-a']", {duration: 3, autoAlpha: 0, y: 60, ease: "power3.out"}, 0)
    .to("[id*='smoke-1-b']", {duration: 3, autoAlpha: 0, y: 60, ease: "power2.out"}, 0)

    ;
return tl_  
}


function fr3(){
    var tl_ = gsap.timeline();
    tl_.timeScale( 1 );  
    tl_
    .from("[id*='img-screen']", {duration: 7, x: 50, ease: "power3.out"}, 0.3)  

    //.fromTo("[id*='svgId-2']", {x: 300}, {duration: 3.5, x: -500, ease: "power2.inOut"}, 0)
    .fromTo("[id*='svgId-2']", {x: 300}, {duration: 1.5, x: -50, ease: "power2.inOut"}, 0)
    .fromTo("[id*='svg-screen2']", {x: -500}, {duration: 2, x: 0, ease: "power2.inOut"}, 0.5)

    .to("[id*='wrap-screen']", {duration: 6.5, scale: 0.81, x: 14, y: -113, ease: "power3.inOut"}, 4.5)
    .to("[id*='txt-2']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 0)
    .from("[id*='txt-3']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 2.3)
    .to("[id*='txt-3']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 5)
    .from("[id*='txt-4']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 5.5)



    ;
return tl_  
}


function fr4(){
    var tl_ = gsap.timeline();
    tl_.timeScale( 1 );  
    tl_
    .from("[id*='img-ft6']", {duration: 0.7, autoAlpha: 0, ease: "power3.inOut"}, 0)
    .to("[id*='img-ft6']", {duration: 6, scale: 1.3, transformOrigin: "50% 0%", ease: "power3.out"}, 0)
    .to("[id*='txt-4']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 0)
    .from("[id*='txt-5']", {duration: 1, autoAlpha: 0, ease: "power3.out"}, 0.5)

    ;
return tl_  
}

function fr5(){
    var tl_ = gsap.timeline();
    tl_.timeScale( 1 );  
    tl_
    .to("[id*='txt-5']", {duration: 0.7, autoAlpha: 0, ease: "power3.out"}, 0)
    .from("[id*='img-endFrame']", {duration: 0.7, autoAlpha: 0, ease: "power3.inOut"}, 0)
    .from("[id*='img-endFrame']", {duration: 4, scale: 1.3, transformOrigin: "50% 50%", ease: "power3.out"}, 0)

    .from("[id*='logo-endFrame']", {duration: 2, autoAlpha: 0, ease: "power3.out"}, 1)
    .from("[id*='txt-endFrame-1']", {duration: 2, autoAlpha: 0, ease: "power3.out"}, 1.5)
    .from("[id*='txt-endFrame-2']", {duration: 2, autoAlpha: 0, ease: "power3.out"}, 1.8)

    .from("#cta", {duration: 2, autoAlpha: 0, ease: "power3.out"}, 2.5)

    .add( function(){ hover = true }, 2.5 )

    .from("[id*='dust']", {duration: 3, autoAlpha: 0, ease: "power3.out"}, 0)


      .from("#dust img", {duration: 18, ease: "none", x: -615, repeat: -1},0)
      .from("#dust2 img", {duration: 18, ease: "none", x: -615, repeat: -1},0)

      .from("[id*='dust']", {duration: 10, ease:"power1.inOut", y: 50, yoyo: true, repeat: -1}, 0)
      .add( function(){ flagg = 2 } )

    ;
return tl_  
}

 

 



function initAnimations(){
    multitimeline.timeScale(1); 
}


//HANDLERS
function initHandlers() {

var clicktag = document.getElementById('clickTag');
    clicktag.addEventListener('mouseup', function(event) {
        
        window.open(window.clickTag,'_blank');
                  
    })


    clicktag.addEventListener('mouseover', function(event) {
       
        if (hover == true){
             gsap.fromTo("[id*='cta-hover']", 0.3, {autoAlpha: 0}, {autoAlpha: 1, rotation: 0.01, ease: "power3.out"});  
        }        
        multitimeline.play();
    })

    clicktag.addEventListener('mouseout', function(event) {
        
        if (hover == true){
            gsap.fromTo("[id*='cta-hover']", 0.3, {autoAlpha: 1}, {autoAlpha: 0, rotation: 0.01, ease: "power3.out"});  
        }        
        

        if (flagg === 2){
            multitimeline.pause();
        }

    })

}

