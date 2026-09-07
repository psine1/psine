
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/logo.png", "images/monitor.png", "images/circle-1-a.png", "images/circle-1-b.png", "images/keyboard.png", "images/cta.png", "images/laptop.png", "images/man-1-a.png", "images/woman-1-a.png", "images/swoosh-1.png"

 );

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

  alert("IE");
  
}


// VARIABLES GLOBALES
var r = 100;
var dur = 1;

var multitimeline = new TimelineMax({paused:false, repeat: 0});
    multitimeline
    .add(fr1(), 0)
    .add(fr2(), 2)
    .add(fr3(), 6)
    .add(fr4(), 10)
   /* .add(loop2(), 15)*/
    ;

//TweenMax.set("#img-2", {autoAlpha: 0});



function fr1(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
.staggerFromTo(".st0", 2, {drawSVG:"100%"}, { drawSVG:"0%", ease:Power2.easeOut }, 0.2, 0.4)
.fromTo("[id='swoosh-1']", 0.01, {autoAlpha: 0}, {autoAlpha: 1}, 0.4)

.staggerFromTo(".st1", 2, {drawSVG:"100%"}, { drawSVG:"0%", ease:Power2.easeOut }, 0.2, 0.8)
.fromTo("[id='swoosh-2']", 0.01, {autoAlpha: 0}, {autoAlpha: 1}, 0.8)

.from("#SVGID_man-1-a-circle", 1, {scale: 0, transformOrigin: "50% 50%",  ease:Power2.easeOut}, 0)
.from("#man-1-a-circle", 1.5, {y: -5, repeat: -1, yoyo: true,  rotation: 1, ease:Linear.easeNone}, 0)
.from("#circle-1-a", 1, {scale: 0,  ease:Power2.easeOut}, 0)

.fromTo("#SVGID_woman-1-a-circle", 1, {scale: 0, transformOrigin: "50% 50%",  ease:Power2.easeOut}, {scale: 1.2}, 0.15)
.from("#woman-1-a-circle", 1.5, {y: 5, repeat: -1, yoyo: true,  rotation: 1, ease:Linear.easeNone}, 0.15)
.from("#circle-1-b", 1, {scale: 0,  ease:Power2.easeOut}, 0.15)

.from("#monitor", 1, {x: 10, autoAlpha: 0, ease:Power2.easeOut}, 0.3)
.from("#laptop", 1, {y: 10, autoAlpha: 0, ease:Power2.easeOut}, 0.6)
.from("#keyboard", 1, {x: 10, autoAlpha: 0, ease:Power2.easeOut}, 0.7)

.from("#monitor img", 1, {y: 5, repeat: -1, yoyo: true, rotation: 1, ease:Linear.easeNone}, 0)
.from("#laptop img", 1, {y: -5, repeat: -1, yoyo: true, rotation: 1, ease:Linear.easeNone}, 0)
.from("#keyboard img", 1, {y: 5, repeat: -1, yoyo: true, rotation: 1, ease:Linear.easeNone}, 0)

;
return tl_  
}


function fr2(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
.to("#circle-1-b", 2, {scale: 1.65, y: 60, x: 70,  ease:Power2.easeOut}, 0)
.to("#laptop", 2, {scale: 1.2, y: 150, x: 115,  ease:Power2.easeOut}, 0)
.to("#keyboard", 2, {scale: 0.9, y: -30, x: 40,  ease:Power2.easeOut}, 0)
.to("#woman-1-a-circle", 2, {scale: 0.9, x: 30, y: "-=10", ease:Power2.easeOut}, 0)
.to("[id='swoosh-2'], #Layer-smoosh-2", 2, {scale: 1.3, x: -30 , y: 25, rotation: 10, ease:Power2.easeOut}, 0)


.staggerFromTo(".starWoman", 0.7, {drawSVG:"0%"}, { drawSVG:"100%", ease:Power2.easeOut }, 0.2, 0.4)
.from("#star", 0.5, {scale: 0, transformOrigin: "216px 49px",  ease:Power2.easeOut}, 0.85)


.to("#circle-1-a", 2, {scale: 1.65, x: -100 + 400, y: 0,  ease:Power2.easeOut}, 0)
.to("#monitor", 2, {scale: 1.6, y: 50, x: 0 + 400,  ease:Power2.easeOut}, 0)
.to("#man-1-a-circle", 2, {scale: 1.5, y: -25, x: 400, rotation: -15,  ease:Power2.easeOut}, 0)
.to("[id='swoosh-1'], #Layer-smoosh-1", 2, {scale: 1.8, x: 20 + 400, y: 25, rotation: -10, ease:Power2.easeOut}, 0)

.staggerFrom("[id*='txt-1']", 1, {y: -10, autoAlpha: 0, rotation: 0.5 , ease:Power2.easeOut}, 0.2, 0.5)

.to("#woman-1-a-circle image", 1.5, {y: "-=5", repeat: -1, yoyo: true,  rotation: 1, ease:Linear.easeNone}, 0)

.to("[id*='txt-1']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 3.5)

;
return tl_  
}


function fr3(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
.fromTo("[id='swoosh-3'], #Layer-smoosh-3", 0.01, {autoAlpha: 0}, {autoAlpha: 1}, 1.05)
.staggerFromTo(".st2", 2, {drawSVG:"100%"}, { drawSVG:"0%", ease:Power2.easeOut }, 0.2, 1)
.to("#circle-1-b", 2, {x: "-=330", y: 200,  ease:Power2.easeOut}, 0)
.to("#laptop", 2, {x: -300, y: 200,  ease:Power2.easeOut}, 0)
.to("#keyboard", 2, {x: -300, y: 200,  ease:Power2.easeOut}, 0)
.to("#woman-1-a-circle, [id='swoosh-2']", 2, {x: -300, y: 200, rotation: 10,  ease:Power2.easeOut}, 0)
.to("#star, #start-woman", 2, {x: -300, y: 200, rotation: 10,  ease:Power2.easeOut}, 0)

.to("#circle-1-a", 2, {x: -120,  ease:Power2.easeOut}, 0)
.to("#monitor", 2, {x: -100, y: -140, scale: 1.4, rotation: 35, ease:Power2.easeOut}, 0)
.to("#man-1-a-circle", 2, {x: 80, y: 125, scale: 1.8, rotation: 20,  ease:Power2.easeOut}, 0)
.to("[id='swoosh-1'], #Layer-smoosh-1", 2, {x: 100, ease:Power2.easeOut}, 0)

.staggerFrom("[id*='txt-2']", 1, {y: -10, autoAlpha: 0, rotation: 0.5 , ease:Power2.easeOut}, 0.2, 1)
.to("#man-1-a-circle image", 1.5, {y: "-=5", repeat: -1, yoyo: true,  rotation: 1, ease:Linear.easeNone}, 0)

.to("[id*='txt-2']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 3.5)
.to("[id*='logo-init']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 3.5)

;
return tl_  
}


function fr4(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
.to("#SVGID_man-1-a-circle", 1, {scale: 0, transformOrigin: "50% 50%",  ease:Power2.easeOut}, 0)
.to("#monitor", 1, {autoAlpha: 0, x: "+=20" , ease:Power2.easeOut}, 0)
.to("[id='swoosh-3'], #Layer-smoosh-3", 1, {autoAlpha: 0, ease:Power2.easeOut}, 0)



.to("#circle-1-a", 2, {x: -70, y: -190, scale: 1.45, ease:Power2.easeOut}, 0)
.to("#circle-1-b", 2, {x: -100, y: 175, scale: 1.75, ease:Power2.easeOut}, 0.2)

.staggerFrom("[id*='txt-3']", 1, {y: -10, autoAlpha: 0, rotation: 0.5 , ease:Power2.easeOut}, 0.2, 1)
.from("#cta", 1, {scale: 0,  ease:Power2.easeOut}, 0)

.from("#line-logo, #logo-end", 0.01, {scale: 0,  ease:Power2.easeOut}, 0.3)

.staggerFromTo(".stLogo", 0.5, {drawSVG:"100%"}, { drawSVG:"0%", ease:Power2.easeOut }, 0.2, 0.4)
.from("#logo-star", 0.5, {scale: 0, transformOrigin: "55px 10px",  ease:Power2.easeOut}, 0.8)
.from("#logo-type", 0.5, {scale: 0.8, autoAlpha: 0, transformOrigin: "55px 10px",  ease:Power2.easeOut}, 0.9)


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


setTimeout(function() {

  clicktag.addEventListener('mouseenter', function (e) {
      a.enter();
  });

  clicktag.addEventListener('mouseleave', function (e) {
      a.leave();
  });

}, 1000);






  var a = {
    enter: function () {
      console.log('enter');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#264955", ease:Power2.easeOut}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#1f3942", ease:Power2.easeOut}, 0)

    },
  };

}

