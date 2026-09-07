
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/dog.png");

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

var multitimeline = gsap.timeline({});
    multitimeline
    .add(fr1(), 0)

    ;


function fr1(){

var tl_ = gsap.timeline();
tl_.timeScale( 1 );  
tl_

.from("#img-1 img", 8, {scale: 1.25, ease:Power3.easeOut}, 0)
.from("#bg", 0.75, {scale: 0.2, transformOrigin: "1196px 1509px", ease:Power3.easeOut}, 0)

.to('[id*="broke"]', 0.65, { repeat: 0, x: -3200, ease: SteppedEase.config(4) }, 0)

.to("#dog", 0.01, {zIndex: 9, ease:Power3.easeInOut}, "<+0.5")
.from("#dog", 0.35, {scale: 0.95, x: 0, ease:Power3.easeOut}, "<")
.add(shakeCamera(), "<")

.fromTo('[id*="dog"]', 0.65, {rotation: -4}, { repeat: -1, yoyo: true, rotation: 4, ease: SteppedEase.config(2) }, 0)

.fromTo("[id*='logoFont']", 0.75, {clip:"rect(0px 0px 600px 0px)"}, {clip:"rect(0px 161px 600px 0px)", ease:Power3.easeOut}, "<")
.fromTo("[id*='logoIso']", 0.45, {x:-150, y: 32}, {x: 0, y: 32, ease:Power3.easeOut}, 0)
.to("[id*='logoIso']", 0.45, {x: 0, y: 0, ease:Power3.easeOut}, ">-0.2")

.from("[id*='txt1']", 0.35, {x: 500, scaleX: 0, ease:Power3.easeOut}, ">-0.2")
.to("[id*='txt1']", 0.25, {x: 20, scaleX: 0, transformOrigin: "100% 100%", ease:Power3.easeOut}, "<+2")
.from("[id*='txt2']", 0.35, {x: 500, scaleX: 0, ease:Power3.easeOut}, "<+0.25")

.from("[id*='background'], [id*='wrapPaper']", 0.01, {autoAlpha:0, ease:Power3.easeOut}, "<+1.5")
//.from('[id*="wrapPaper"]', 0.5, { x: 100, transformOrigin: "50% 50%", ease:Power3.easeOut }, ">")


.fromTo("[id*='background']", 0.41, {clip:"rect(0px 800px 600px 800px)"}, {clip:"rect(0px 800px 600px 0px)", ease:SteppedEase.config(4)}, "<")
.fromTo("[id*='endFrame']", 0.41, {clip:"rect(0px 800px 600px 800px)"}, {clip:"rect(0px 800px 600px 0px)", ease:SteppedEase.config(4)}, "<")


.fromTo("[id*='container']", 0.41, {clip:"rect(0px 800px 600px 0px)"}, {clip:"rect(0px 0px 600px 0px)", ease:SteppedEase.config(4)}, "<")
.to('[id*="paper"]', 0.5, { repeat: 0, x: -3200, ease: SteppedEase.config(4) }, "<")
.to('[id*="wrapPaper"]', 0.5, { scale: 1.5, transformOrigin: "50% 50%", ease:Power3.easeOut }, ">")




.fromTo("[id*='card1']", 0.75, {x: -95, y: 80}, {x: 0, y: 0, ease:Power3.easeOut}, "<")
.fromTo("[id*='card2']", 0.75, {x: 95, y: -80}, {x: 0, y: 0, ease:Power3.easeOut}, "<")

.fromTo("[id*='logo2Font']", 0.75, {clip:"rect(0px 0px 600px 0px)"}, {clip:"rect(0px 245px 600px 0px)", ease:Power3.easeOut}, "<0.5")
.fromTo("[id*='logo2Iso']", 0.01, {clip:"rect(0px 245px 600px 0px)"}, {clip:"rect(0px 245px 600px 0px)", ease:Power3.easeOut}, "<")

.fromTo("[id*='logo2Iso'] img", 0.45, {x:-245, y: 50}, {x: 0, y: 50, ease:Power3.easeOut}, "<")
.to("[id*='logo2Iso'] img", 0.45, {x: 0, y: 0, ease:Power3.easeOut}, ">-0.2")

.from("[id*='txt3']", 0.35, {y: 20, autoAlpha: 0, transformOrigin: "100% 100%", ease:Power3.easeOut}, "<-0.2")
.from("[id*='txt4']", 1, {autoAlpha: 0, ease:Power3.easeOut}, "<+0.5")


.from("#null", 0.75, {autoAlpha: 0, ease:Power3.easeOut}, "<+3")




;
return tl_  
}

var tl_ = gsap.timeline();
tl_.timeScale( 1.2 );  
tl_
.fromTo('[id*="trama"]', 0.45, {x: 30}, { repeat: -1, yoyo: true, x: -30, ease: SteppedEase.config(1) }, 0)
.fromTo('[id*="trama"]', 0.45, {y: 20}, { repeat: -1, yoyo: true, y: -20, ease: SteppedEase.config(1) }, "<+0.3")



//multitimeline.play(7);


function shakeCamera(settings) {
  var tl  = gsap.timeline();

  var settings = {
    speed: 0.08,
    shakes: 15,
    power: 5,
    multiplier: 0.6
  };

  for (var i = 0; i < settings.shakes; i++) {
    tl.add(TweenMax.to('#container', settings.speed, {y: (i % 2) ? -settings.power : settings.power, ease: "power1.Out"}))

    settings.speed *= settings.multiplier;
    settings.power *= settings.multiplier;
  }

  tl.add(TweenMax.to('#container', settings.speed * 2, {y: 0, ease: "power1.inOut"}));

  return tl;
}




function initAnimations(){
    multitimeline.timeScale(1); 
}


//HANDLERS
function initHandlers() {

var clicktag = document.getElementById('clicTr');
    clicktag.addEventListener('mouseup', function(event) {
        
         
    //    window.open(window.clickTag,'_blank');
        
          
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
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#A3082A", borderRadius: "30px", ease:Power2.easeOut}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#EB0029", borderRadius: "30px", ease:Power2.easeOut}, 0)

    },
  };

}

