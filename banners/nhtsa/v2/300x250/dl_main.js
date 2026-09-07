
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array(
  'images/street.png'
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
var multitimeline = gsap.timeline();
    multitimeline.timeScale(1);
    multitimeline
    
    ;


    
//    multitimeline.pause(9);

function pauseAllAnimations() {
  timelines.forEach(tl => tl.pause());
}

//tl_All.pause(5);


gsap.set(".wrapAnim", { scale: 0.65, y: -60, x: 40   })

  const tl_All = gsap.timeline({  });

  
      tl_All.timeScale(1);  
      tl_All

//      .to("[id*='car1'] img", { duration: 1.5, x: 3, repeat: -1, yoyo: true, ease: "none"  }, "<")
      .to("#car2 img, #wheel1, #wheel2", { duration: 2, x: 5, repeat: -1, yoyo: true, ease: "none"  }, "<")

      .to("#wrapCar2", { duration: 0.01, scale: 0.9, ease: "none"  }, "<")
      .from("#wrapCar2", { duration: 2, x: 60, y: 15, ease: "slow(0.9,0.7,false)"  }, "<")


      .from("[id*='mountain']", { duration: 3.7, x: -334, repeat: -1, ease: "none"  }, "<")
      .to(".wrapMountain", { duration: 0.01, rotation: 5, ease: "none"  }, "<")
      
      .to("#wheel1 img, #wheel2 img", { duration: 0.7, rotation: -360, repeat: -1, ease: "none"  }, "<")
      .to("#wheel1-car1 img, #wheel2-car1 img", { duration: 0.5, rotation: 360, repeat: -1, ease: "none"  }, "<")

 

            .from("#wrapElipse", { duration: 0.5, scale: 0, ease: "power2.inOut"  }, "<+0.5")


      .fromTo("[class*='wrapAd']", {scale: 1.4, transformOrigin: "85% 65%"}, { duration: 1, scale: 1, transformOrigin: "85% 65%", ease: "power2.out"  }, "<+0.2")
      .from("#wrapCar1", { duration: 2, autoAlpha: 0, ease: "slow(0.9,0.7,false)"  }, "<")

      
      .from("#txt-1-1", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<")
      .from("#txt-1-2", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")       
      
            
      .from("#wrapCar1", { duration: 7.5, x: -140, y: -20, scale: 0.75, ease: "power3.out"  }, "<")

       .to("#wrapElipse", { duration: 0.5, scale: 4.5, ease: "power2.inOut"  }, "<+0.5")
      .from("#warning img", { duration: 0.25, scale: 1.25, repeat: -1, yoyo: true , ease: "none"  }, "<")
      .from("#warning ", { duration: 0.5, autoAlpha: 0,  ease: "power3.out"  }, "<")

      .to("[id*='txt-1-']", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<")

      
      .to("#light-car2-high ", { duration: 0.5, autoAlpha: 0,  ease: "power3.out"  }, "<")
      .from("#light-car2 ", { duration: 0.5, autoAlpha: 0,  ease: "power3.out"  }, "<")

     // .to("[class*='wrapAd']", { duration: 1.5, scale: 1.4, transformOrigin: "81% 50%", ease: "power2.out"  }, "<")

      .to("#wrapElipse", { duration: 0.5, scale: 0, ease: "power2.inOut"  }, "<+0.8")
      .to("#warning ", { duration: 0.5, autoAlpha: 0,  ease: "power3.out"  }, "<")

      .to("#wrapCar1", { duration: 0.01, zIndex: 999, ease: "none"  }, "<")      

      .to("#wrapCar2", { duration: 12, x: -70, y: 20, scale: 0.75, ease: "none"  }, "<")


      .from("#txt-2-1", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")
      .from("#txt-2-2", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")      
      .from("#txt-2-3", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")   
      


//      .to("[class*='wrapAd']", { duration: 1.5, scale: 1, transformOrigin: "81% 50%", ease: "power2.out"  }, "<+0.5")

      .to("[id*='txt-2-']", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<+1")



      .from("#txt-3-1", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.5")
      .from("#txt-3-2", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")      
      .from("#txt-3-3", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")      
      .from("#txt-3-4", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")   
      
      


      //.to("#bg", { duration: 4, scale: 2.5, transformOrigin: "66px 382px", ease: "none"  }, "<")


      .from("#logo", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<")      
      

  

      .from("#cta", { duration: 0.5, y: 300, autoAlpha: 0, ease: "power3.out"  }, "<")      

      
      .add(function () {  pauseAllAnimations()  }, "<+1")
      .add(function () { tl_All.pause()  }, "<")
      




let tlCircle = gsap.timeline({});

    tlCircle
      .from("[id*='elipse1']", { duration: 0.5, scale: 0.9, repeat :-1, yoyo: true, transformOrigin: "50% 50%", ease:  "none"  }, "<")
      .from("[id*='elipse2']", { duration: 0.5, scale: 0.5, repeat :-1, yoyo: true, transformOrigin: "50% 50%", ease:  "none"  }, "<+0.5")
      .fromTo("[id*='elipse3']", {scale: 0.8, transformOrigin: "50% 50%"}, { duration: 0.5, scale: 1, repeat :-1, yoyo: true, transformOrigin: "50% 50%", ease:  "none"  }, "<+0.5")







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
      var tl_hover = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl_hover
        .to("#cta img", 0.2, {scale: 1.05, rotation: 0, ease: "power3.out"}, 0)

    },
    leave: function () {
      console.log('leave');
      var tl_hover = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl_hover
        .to("#cta img", 0.2, {scale: 1, rotation: 0.01, ease: "power3.out"}, 0)

    },
  };

}

