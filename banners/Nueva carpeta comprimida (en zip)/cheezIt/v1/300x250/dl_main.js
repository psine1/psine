
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/cheese.png" );

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
var multitimeline = new TimelineMax({paused:false, repeat: 0});
    multitimeline
    .add(fr1(), 0)
    ;

//TweenMax.set("#img-2", {autoAlpha: 0});


function fr1(){
var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_

//.from(".cheese", 1, {x: -200 , ease:Power2.easeOut}, 0)

.set(".cheese", {z:250})
.set(".cookie", {z:500})  
.set(".cheese", {transformStyle:"preserve-3d"})
.set(".scene", {opacity: 0, scale: 0.5}, 0)  



.to(".cheese", 1, {scale: 0, autoAlpha: 0 , ease:Power2.easeOut}, 2.1)

.fromTo(".shine", 1, {autoAlpha: 0, scale: 0}, {scale: 2.5, autoAlpha: 1 , ease:Power2.easeInOut}, 1.8)
.to(".shine", 1, {scale: 0, autoAlpha: 0 , ease:Power2.easeOut}, 2.5)
.to(".shine", 2.5, {rotation: 360 , ease:Power2.easeOut}, 1.8)
.from(".cookie", 1, {scale: 0.5, autoAlpha: 0 , ease:Power2.easeOut}, 2.3)


.set(".cookie", {z:250})
//.set(".box", {z:500})  
.set(".cookie", {transformStyle:"preserve-3d"})

.to(".cookie", 0.15, {delay: 0, autoAlpha: 0, rotationY:"+=360", repeat:1, ease: Power0.easeNone}, 5)
.to(".cookie", 0, {delay: 0, autoAlpha: 0,ease: Power0.easeNone}, "Hide-Icon1")


.to(".scene", 1, {opacity: 1, scale: 1, ease:Power2.easeOut}, 5)

.to(".box", 1, {rotationY: 558,  rotationX: 16, scale: 1.05,  ease:Power2.easeOut}, 5)
.to(".scene", 1, {rotation: -5, skewY: -2, skewX: 3, ease:Power2.easeOut}, 5)

.fromTo(".shine", 1, {autoAlpha: 0, scale: 0}, {scale: 2.5, autoAlpha: 1 , ease:Power2.easeInOut}, 4.8)
.to(".shine", 1, {scale: 0, autoAlpha: 0 , ease:Power2.easeOut}, 5.5)
.to(".shine", 2.5, {rotation: 720 , ease:Power2.easeOut}, 4.8)

.from(".txt-1", 0.7, {autoAlpha: 0,/* scale: 1.1,*/ ease:Power2.easeOut}, 0)
.to(".txt-1", 0.7, {autoAlpha: 0,/* scale: 0.8,*/ ease:Power2.easeOut}, 2.3)
.from(".txt-2", 0.7, {autoAlpha: 0,/* scale: 1.1,*/ ease:Power2.easeOut}, 2.5)


.to(".logo", 1, {y: 80, autoAlpha: 0, ease:Power2.easeOut}, 4.7)

//.to(".txt-2", 1.2, {x: -10, ease:Power2.easeOut}, 5.5)


.from(".txt-3", 1, {y: 100, ease:Power2.easeOut}, 5)
.from(".footer", 1, {y: 100, ease:Power2.easeOut}, 5)


;
return tl_  
}



function initAnimations(){
    multitimeline.timeScale(1.4); 
}


//HANDLERS
function initHandlers() {

var clicktag = document.getElementById('clickTag');
    clicktag.addEventListener('mouseup', function(event) {
        
         
        window.open(window.clickTag,'_blank');
        
          
    })



  clicktag.addEventListener('mouseenter', function (e) {
    if (ready) {
      a.enter();
    }
  });

  clicktag.addEventListener('mouseleave', function (e) {
    if (ready) {
      a.leave();
    }
  });


  var a = {
    enter: function () {
      console.log('enter');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl.fromTo("#shine img", 1, {x: -150}, {x: 150, ease:Power2.easeOut}, 0)
        .to("#cta", 1, {scale: 1.05, ease:Power2.easeOut}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl.fromTo("#shine img", 1, {x: -150}, {x: 150, ease:Power2.easeOut}, 0)
        .to("#cta", 1, {scale: 1, ease:Power2.easeOut}, 0)

    },
  };

}

