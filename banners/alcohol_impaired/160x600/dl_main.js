
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array(
  'images/bg.jpg'
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
var multitimeline = new TimelineMax();
    multitimeline.timeScale(1);
    multitimeline
    .add(fr1(), 0)
    
    ;




function fr1(){
  var tl_ = new TimelineMax();  
      tl_.timeScale(0.7);  
      tl_
      .from('#mask', 1, { y: 430,  ease: Power1.easeOut }, 0)
      .from('[id*="rip-"]', 1, { y: 200, scale: 0, transformOrigin: "50% 100%", ease: Power1.easeOut }, 0)
      .from('#car', 1, { y: 200,  ease: Power1.easeOut }, 0)          
      .add(animBlur('#txt1_1', '#txt1_1 img'), 0.5)
      .add(animBlur('#txt1_2', '#txt1_2 img'), 0.6)
      .add(animBlur('#txt1_3', '#txt1_3 img'), 0.7)
      .add(animBlur('#txt1_4', '#txt1_4 img'), 0.8)
      .from('#cta', 0.75, { scale: 1.2, autoAlpha: 0,  ease: Power3.easeOut }, 1.5)    
      .fromTo("#light", 0.35, {css:{"filter": "saturate(1)"}},{css:{"filter": "saturate(1.5)"}, repeat: -1, yoyo: true, ease: Power1.easeInOut}, 0)

return tl_  
}


function animBlur (elem, elemImg){
  var tl_ = new TimelineMax();  
  tl_
  .from(elem, 0.75, { x: -100, autoAlpha: 0, scale: 1.25, ease: Power3.easeOut }, 0)
  .fromTo(elemImg, 0.75, {css:{"filter": "blur(10px)"}},{css:{"filter": "blur(0px)"}, ease: Power3.easeOut}, 0)   ;
  
  return tl_;

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


  


  clicktag.addEventListener('mouseenter', function (e) {
      a.enter();
  });

  clicktag.addEventListener('mouseleave', function (e) {
      a.leave();
  });


  var a = {
    enter: function () {
      console.log('enter');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta", 0.2, {scale: 1.03, rotation: 0, ease:Power3.easeOut}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta", 0.2, {scale: 1, rotation: 0.01, ease:Power3.easeOut}, 0)

    },
  };

}

