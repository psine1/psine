
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/logo-init.png");

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

function circleLeft(obj, movX, movY) {
var tl_circularLeft = new TimelineMax({ repeat: -1, repeatDelay: 0, delay: 0 });
tl_circularLeft
.to(obj, 4, {
  bezier: {
    type: "quadratic",
    values:[
      /*p1*/{ x: 0, y: 0, rotation: 0.5 }, { x: movX, y: 0, rotation: 0.5 }, { x: movX, y: movX, rotation: 0.5 },
      /*p2*/{ x: movX, y: movY, rotation: 0.5 }, { x: 0, y: movY, rotation: 0.5 },
      /*p3*/{ x: -movX, y: movY, rotation: 0.5 }, { x: -movX, y: movX, rotation: 0.5 },
      /*p4*/{ x: -movX, y: 0, rotation: 0.5 }, { x: 0, y: 0, rotation: 0.5 }],
    autoRotate: false
  },
  ease: Linear.easeNone
}, 0);

return tl_circularLeft;
}

function circleRight(obj, movX, movY) {
var tl_circularRight = new TimelineMax({ repeat: -1, repeatDelay: 0, delay: 0 });
tl_circularRight
.to(obj, 4, {
  bezier: {
    type: "quadratic",
    values:[
      /*p1*/{ x: 0, y: 0, rotation: 0.5 }, { x: -movX, y: 0, rotation: 0.5 }, { x: -movX, y: -movX, rotation: 0.5 },
      /*p2*/{ x: -movX, y: -movY, rotation: 0.5 }, { x: 0, y: -movY, rotation: 0.5 },
      /*p3*/{ x: movX, y: -movY, rotation: 0.5 }, { x: movX, y: -movX, rotation: 0.5 },
      /*p4*/{ x: movX, y: 0, rotation: 0.5 }, { x: 0, y: 0, rotation: 0.5 }],
    autoRotate: false
  },
  ease: Linear.easeNone
}, 0)
;
return tl_circularRight
}

var tl_circularLeft = circleLeft("[id*='circle-1'] img", 5, 10);
var tl_circularRight = circleRight("[id*='circle-2'] img", 5, 10);
var tl_circularRight = circleRight("[id*='circle-3'] img", 5, 10);
var tl_circularLeft = circleLeft("[id*='circle-4'] img", 5, 10);

var tl_circularLeft = circleLeft("[id*='icon-1'] img", 5, 10);
var tl_circularLeft = circleLeft("[id*='line-icon-1'] svg", 5, 10);

var tl_circularRight = circleRight("[id*='icon-2'] img", 10, 20);
var tl_circularLeft = circleLeft("[id*='icon-3'] img", 10, 20);
var tl_circularRight = circleRight("[id*='icon-4'] img", 10, 20);

var tl_circularRight = circleRight("[id*='icon-5'] img", 10, 20);
var tl_circularLeft = circleLeft("[id*='icon-6'] img", 10, 20);
var tl_circularLeft = circleLeft("[id*='icon-7'] img", 10, 20);

var tl_circularRight = circleRight("[id*='screen-1'] img", 5, 10);
var tl_circularLeft = circleLeft("[id*='screen-2'] img", 5, 10);
var tl_circularRight = circleRight("[id*='screen-3'] img", 5, 10);
var tl_circularLeft = circleLeft("[id*='screen-4'] img", 5, 10);


function fr1(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_

.staggerFrom("[id*='circle-']", 1.5, {scale: 0,  ease:Power2.easeOut}, 0.1, 0)

.from("#icon-1, #line-icon-1", 1.5, {y: 100, x: -100, ease:Power2.easeOut}, 0)
.from("#icon-2", 1, {y: -100, x: 100, ease:Power2.easeOut}, 0)
.from("#icon-3", 1, {y: -100, x: 100, ease:Power2.easeOut}, 0.3)
.from("#icon-4", 1, {y: 150, x: -220, ease:Power2.easeOut}, 0.5)

.fromTo("[id='line-icon-1']", 0.01, {autoAlpha: 0}, {autoAlpha: 1}, 0.3)
.staggerFromTo(".st0", 1.5, {drawSVG:"0%"}, { drawSVG:"100%", ease:Power2.easeOut }, 0.2, 0.3)

;
return tl_  
}


function fr2(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
.to("#circle-1", 1.2, {y: 170, x: 250, ease:Power2.easeOut}, 0)
.to("#icon-3", 1, {y: "+=160", x: "+160", ease:Power2.easeOut}, 0)
.to("#icon-4", 1, {y: "+=150", x: "+200", ease:Power2.easeOut}, 0)

.to("#circle-2", 1.2, {y: -170, x: 170, ease:Power2.easeOut}, 0)
.to("#icon-2", 1, {y: "-=250", x: "+50", ease:Power2.easeOut}, 0)

.to("#circle-4", 1.2, {y: 120, x: 400, scale: 1.6, ease:Power2.easeOut}, 0)
.to("#circle-3", 1.2, {y: 180, x: 0,   ease:Power2.easeOut}, 0)
.to("#icon-1, #line-icon-1", 1, {y: "+=110", x: "+=30", ease:Power2.easeOut}, 0)
.staggerFromTo(".st0", 2, {drawSVG:"100%"}, { drawSVG:"0%", ease:Power2.easeOut }, 0.2, 0)

.from("#icon-5", 1, {y: -100, x: 200,  ease:Power2.easeOut}, 0)
.from("#icon-6", 1, {y: -100, x: 100,  ease:Power2.easeOut}, 0.3)
.from("#icon-7", 1, {y: 100, x: -100,  ease:Power2.easeOut}, 0.5)

.from("[id*='logo-init']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 0)


.staggerFrom("[id*='txt-1']", 1, {y: -10, autoAlpha: 0, rotation: 0.5 , ease:Power2.easeOut}, 0.2, 0.5)

.to("[id*='txt-1']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 3.5)


;
return tl_  
}


function fr3(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_

.to("#circle-4", 1.2, {y: "+=70", x: "-=150", scale: 1.5, ease:Power2.easeOut}, 0)

.to("#icon-7", 1, {y: "+=160", x: "+=200", ease:Power2.easeOut}, 0)
.to("#icon-1", 1, {y: "-=260", x: "+=15", ease:Power2.easeOut}, 0)
.to("#icon-6", 1, {y: "+=300", x: "-=180", ease:Power2.easeOut}, 0.3)
.to("#icon-5", 1, {y: "-=5", x: "+=65", ease:Power2.easeOut}, 0.3)

.to("#icon-7", 0.3, {scale: 0, ease:Power2.easeOut}, 0.8)
.from("#screen-1", 0.5, {scale: 0, ease:Power2.easeOut}, 0.8)

.to("#icon-1", 0.3, {scale: 0, ease:Power2.easeOut}, 0.8)
.from("#screen-2", 0.5, {scale: 0, ease:Power2.easeOut}, 0.8)

.to("#icon-6", 0.3, {scale: 0, ease:Power2.easeOut}, 1)
.from("#screen-3", 0.5, {scale: 0, ease:Power2.easeOut}, 1)

.to("#icon-5", 0.3, {scale: 0, ease:Power2.easeOut}, 1)
.from("#screen-4", 0.5, {scale: 0, ease:Power2.easeOut}, 1)




.staggerFrom("[id*='txt-2']", 1, {y: -10, autoAlpha: 0, rotation: 0.5, ease:Power2.easeOut}, 0.2, 1)

.to("[id*='txt-2']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 3.5)
.to("[id*='logo-init']", 1, {autoAlpha: 0 , ease:Power2.easeOut}, 3.5)

;
return tl_  
}


function fr4(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_

.to("#screen-1", 0.5, {scale: 0, ease:Power2.easeOut}, 0)
.to("#screen-2", 0.6, {scale: 0, ease:Power2.easeOut}, 0)
.to("#screen-3", 0.7, {scale: 0, ease:Power2.easeOut}, 0)
.to("#screen-4", 0.8, {scale: 0, ease:Power2.easeOut}, 0)

.to("#circle-4", 1.2, {y: "-=30", x: "+=20", scale: 1.5, ease:Power2.easeOut}, 0)
.to("#circle-3", 1.2, {y: "-=120", x: "+=70", scale: 1.3, ease:Power2.easeOut}, 0)


.staggerFrom("[id*='txt-3']", 1, {y: -10, autoAlpha: 0, rotation: 0.5, ease:Power2.easeOut}, 0.2, 1)
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

