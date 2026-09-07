
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/logo-init.png"

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
    .add(fr3(), 2)

    ;

//TweenMax.set("#img-2", {autoAlpha: 0});



function fr1(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_

//      .from('[id*="cookie"]', 1, {scale: 1.2, ease:Power3.easeOut}, 0.05, 1)
   //   .to('[id*="cookie"]', 1, {y: 5, repeat: -1, yoyo: true, ease:Linear.easeNone}, 0)
      .to('[id*="nuevo"]', 0.5, {scale: 1.1, rotation: 0.5, repeat: 1, yoyo: true, ease:Power3.easeOut}, 0.5 )
      .from('[id*="img-1"]', 1, { x: 5, ease:Power3.easeOut}, 0)
      .from('[id*="img-2"]', 1, { x: -5, ease:Power3.easeOut}, 0)
      .staggerFromTo('[id*="particle-"]', 1.3, {repeat: 0, scale: 0, y: 10, ease:Power3.easeOut}, {scale: 5, x: 70, y: 65}, 0, 0)
      .to('[id*="particle-"]', 1, {autoAlpha: 0, ease:Power3.easeOut}, 0.8)

;
return tl_  
}


function fr2(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_

      .from('[id*="logo-m"]', 0.5, {autoAlpha: 0, ease:Power3.easeOut}, 0)


    ;
    return tl_  
    }


function fr3(){

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
      .to('[id*="cookie"]', 0.5, {autoAlpha: 0, ease:Power3.easeOut}, 0)
      .to('[id*="logo-init"]', 0.5, {autoAlpha: 0, ease:Power3.easeOut}, 0)
      .to('[id*="nuevo"]', 0.5, {autoAlpha: 0, ease:Power3.easeOut}, 0)


      .from('[id*="txt-4"]', 0.7, {autoAlpha: 0, y: 10, ease:Power3.easeOut}, 0.5)
      .from('[id*="cta"]', 0.7, {autoAlpha: 0, scale: 0, ease:Power3.easeOut}, 0.7)

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
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#fff06b", ease:Power2.easeOut}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#f9e853", ease:Power2.easeOut}, 0)

    },
  };

}

