
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/bg-1.jpg" );

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
    multitimeline.timeScale( 1.05 );  
    multitimeline
    .add(fr1(), 0)
    .add(fr2(), 1.8) 
    .add(fr3(), 4.3)  
    .add(fr4(), 7)        


    ;

//    multitimeline.play(18);
//TweenMax.set("#img-2", {autoAlpha: 0});


function fr1(){
      var tl_ = new TimelineMax({repeat: 0});  
          tl_.timeScale( 1.05 );  
          tl_
          .to("#base-1", 3, {y: 30, x: -50, transformOrigin: "50% 100%", ease:Power1.easeOut}, 0)
          .to("[id*='bg']", 20, {y: 10, x: -130, transformOrigin: "50% 100%", ease:Power1.easeOut}, 0)
          .from("[id*='X-Window']", 8, {scale: 1.3, ease:Power1.easeOut}, 0)
          .fromTo("[id*='skater']", 2.3, {y: 100, x: -250, rotation: -20}, {y: 0, x: 330, rotation: 50, transformOrigin: "246px 124px", ease:new SlowMo(0.5, 0.8)}, 0)
          .fromTo("[id*='brush-1']", 3, {y: 100, x: -250, rotation: -20}, {y: 0, x: 180, rotation: 50, transformOrigin: "100% 80%", ease:new SlowMo(0.5, 0.8)}, 0)
          .staggerFromTo(".mask-path", 1.3, {drawSVG:"0%"}, { drawSVG:"100%", repeat: 1, yoyo: true, ease:Power2.easeOut }, 0.2, 0)

          
          ;
return tl_  
}

function fr2(){
  var tl_ = new TimelineMax({repeat: 0});  
      tl_.timeScale( 1.05 );  
      tl_
//      .fromTo("#gradient", 0.3, {autoAlpha: 0, scale: 5}, {autoAlpha: 1, scale: 1, transformOrigin: "0% 100%", repeat: 1, yoyo: true, ease:Power1.easeOut}, 0)
      .from("#base-2 img", 0.5, {y: 150, ease:Power1.easeOut}, 0.3)
      .to("#base-1 img", 0.5, {y: 150, ease:Power1.easeOut}, 0)

      .to("#base-2", 4, {x: -100, transformOrigin: "50% 100%", ease:Power1.easeOut}, 0)
      .fromTo("[id*='bike']", 2.8, {y: 100, x: -400, rotation: -50}, {y: 0, x: 480, rotation: 30, transformOrigin: "34px 55px", ease:new SlowMo(0.5, 0.8)}, 0.5)
      .staggerFromTo(".mask-path2", 1.2, {drawSVG:"0%"}, { drawSVG:"100%", repeat: 1, yoyo: true, ease:Power2.easeOut }, 0.2, 0.7)
      .fromTo("[id*='brush-2']", 2.8, {rotation: -15, x: 0}, {rotation: 25, x: -5, ease:Power1.easeOut}, 0.5)

      
      ;
return tl_  
}

function fr3(){
  var tl_ = new TimelineMax({repeat: 0});  
      tl_.timeScale( 1.05 );  
      tl_
//      .fromTo("#gradient", 0.3, {autoAlpha: 0, scale: 5}, {autoAlpha: 1, scale: 1, transformOrigin: "0% 100%", repeat: 1, yoyo: true, ease:Power1.easeOut}, 0)

      .from("#base-3 img", 0.5, {y: 150, ease:Power1.easeOut}, 0.3)
      .to("#base-2 img", 0.5, {y: 150, ease:Power1.easeOut}, 0)    

      .to("#base-3", 4, {y: 30, transformOrigin: "50% 100%", ease:Power1.easeOut}, 0)
      .fromTo("[id*='moto']", 2.8, {y: 100, x: 450, rotation: -80}, {y: 50, x: -440, rotation: 30, transformOrigin: "142px 131px", ease:new SlowMo(0.5, 0.8)}, 0.5)
      .staggerFromTo(".mask-path3", 1, {drawSVG:"0%"}, { drawSVG:"100%", repeat: 1, yoyo: true, ease:Power2.easeOut }, 0.2, 0.9)
      .fromTo("[id*='brush-3']", 2.8, {rotation: -15, y: 0}, {rotation: 20, y: -5, ease:Power1.easeOut}, 0.5)

      .fromTo("#fire-1", 2.5, {x: 50, y: 50, autoAlpha: 1}, {ease: Power1.easeOut, x: -100, y: -700, autoAlpha: 0, repeat: 0}, 0.3)
      .fromTo("#fire-2", 2.5, {x: 50, y: 50, autoAlpha: 1}, {ease: Power1.easeOut, x: -50, y: -700, autoAlpha: 0, repeat: 0}, 0.7)
      .fromTo("#fire-3", 2.5, {x: 50, y: 50, autoAlpha: 1}, {ease: Power1.easeOut, x: -200, y: -700, autoAlpha: 0, repeat: 0}, 1)        

      .fromTo("#dust img", 5, {x: 100}, {ease:Linear.easeNone, x: -500, repeat: -1},0)
      .to("#dust", 5, {ease:Linear.easeNone, autoAlpha: 0},0)

       ;

      ;
return tl_  
}


function fr4(){
  var tl_ = new TimelineMax({repeat: 0});  
      tl_.timeScale( 1.05 );  
      tl_
      .fromTo("#gradient", 0.3, {autoAlpha: 0, scale: 5}, {autoAlpha: 1, scale: 1, transformOrigin: "0% 100%", ease:Power1.easeOut}, 0)

      .to("#base-3 img", 0.5, {y: 150, ease:Power1.easeOut}, 0.3)

      
      .from("[id*='X-Window2']", 1, {autoAlpha: 0, zIndex: 0, ease:Power1.easeOut}, 0)
      .from("#lines", 0.8, {autoAlpha: 0, scaleY: 0, ease:Power1.easeOut}, 0.5)
      .fromTo("[id*='txt-1']", 0.8, {clip:"rect(63px 365px 0px 0px)"}, {clip:"rect(0px 365px 63px 0px)", ease:Power3.easeOut}, 0.6)

      .from("#events img", 1, {y: 100, ease:Power1.easeOut}, 0.8)

      .from("#cta", 1, {x: 300, ease: Back.easeOut.config(1.4)}, 1.2)
      .from("#ventura", 1, {autoAlpha: 0, ease: Back.easeOut.config(1.4)}, 2)


       ;

      ;
return tl_  
}


 //multitimeline.play(10);

function initAnimations(){
    multitimeline.timeScale( 1.05 ); 
}


//HANDLERS
function initHandlers() {

  var clicktag = document.getElementById('clickTag');
  clicktag.addEventListener('mouseup', function(event) {      
      window.open(window.clickTag,'_blank');              
  })
           

      TweenMax.set(".cardCont", {
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      });    
      
      TweenMax.set(".cardBack", { rotationX:-180 });
      
      var tl_hover = new TimelineMax({paused:true, repeat: 0});
          tl_hover
          .to(".cardFront", 0.3, {rotationX: 180, transformOrigin: "50% 50%" })
          .to(".cardBack", 0.3,{rotationX: 0, transformOrigin: "50% 50%" }, 0)
          .to(".cardCont", { z: 50 }, 0)
          .to(".cardCont", { z: 0 }, 0.5);
  


  clicktag.addEventListener('mouseenter', function (e) {
      a.enter();
  });

  clicktag.addEventListener('mouseleave', function (e) {
      a.leave();
  });


  var a = {
    enter: function () {
      console.log('enter');
      tl_hover.restart();

    },
    leave: function () {
      console.log('leave');
      tl_hover.reverse();

    },
  };

}

//console.clear();


