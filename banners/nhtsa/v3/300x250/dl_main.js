
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array(
  'images/bg.svg'
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

const timelines = [];
const count = 6;
const duration = 3;
const wrap = document.getElementById("wrapWay");
const path = "#pathWay";

for (let i = 0; i < count; i++) {
  const mark = document.createElement("div");
  mark.classList.add("line-mark");
  wrap.appendChild(mark);

  const tl = gsap.timeline({ repeat: -1 });

  tl.fromTo(mark,
    { scale: 1.2 },
    {
      duration: duration,
      scale: 0.4,
      ease: "none",
      motionPath: {
        path: path,
        align: path,
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      }
    }
  );

  // Posicionamos cada marca a lo largo del timeline con progress
  tl.progress(i / count);

  timelines.push(tl);
}

function pauseAllAnimations() {
  timelines.forEach(tl => tl.pause());
}



gsap.set(".wrapAnim", {scale: 0.7, x: -37, y: -170})


  const tl_All = gsap.timeline({  });

      tl_All.timeScale(1);  
      tl_All
      .to("[id*='barandas'] img", { duration: 0.5, x: -3, scale: 0.83, y: 3, repeat: -1, yoyo: false, ease: "none"  }, "<")


      .to("[id*='car1'] img", { duration: 1.5, x: 3, repeat: -1, yoyo: true, ease: "none"  }, "<")
      .from("[id*='car1'] img", { duration: 2, scale: 0.8, transformOrigin: "50% 30%", ease: "power3.out"  }, "<")

      .to("#car2 img, #wheel1, #wheel2", { duration: 2, x: 5, repeat: -1, yoyo: true, ease: "none"  }, "<")

      
      .to("#wheel1 img, #wheel2 img", { duration: 0.3, rotation: -360, repeat: -1, ease: "none"  }, "<")

            .fromTo("#wrapElipse", {scale: 0}, { duration: 0.5, scale: 0.4, ease: "power2.inOut"  }, "<")


      .from("#txt-1-1", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.35")
      .from("#txt-1-2", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")  

      .to("[id*='car1']", { duration: 3, x: -40, y: -5, ease: "power2.inOut"  }, "<")
      .from("[id*='car1-lightR']", { duration: 0.35, autoAlpha: 0, repeat: 7, yoyo: true, ease: "none"  }, "<")

      .fromTo("#wrapCar2", {x: 400, y: 70, scale: 0.2}, { duration: 5, x: 75, y: 10, scale: 0.85, ease: "power2.inOut"  }, "<-0.3")

      .to(".wrapAd", { duration: 3, scale: 1.3, transformOrigin: "30% 80%", ease: "power3.out"  }, "<+1.2")


      
        
      .to("#fr2inner", { duration: 1, scale: 1.05, x: 5, y: 5, ease: "power2.out"  }, "<+1")
      .from("#fr2inner", { duration: 0.25, autoAlpha: 0, ease: "power2.out"  }, "<")

      .from("#lights img", { duration: 0.25, autoAlpha: 0, repeat: -1,  repeatDelay: 0, ease: "power3.out"  }, "<")
      
      .to("#wrapElipse", { duration: 0.5, scale: 1.08, y: -7, ease: "power2.inOut"  }, "<")

      .from("#warning img", { duration: 0.25, scale: 1.25, repeat: -1, yoyo: true , ease: "none"  }, "<")
      .from("#warning ", { duration: 0.5, autoAlpha: 0,  ease: "power3.out"  }, "<")

      .to("[id*='txt-1-']", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<")

      .from("#txt-2-1", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.5")
      .from("#txt-2-2", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")      


      .to("[id*='car1']", { duration: 2, x: 0, y: 0, ease: "power2.out"  }, "<+1.5")

            .to("#wrapCar2", { duration: 3, x: 0, y: 0, scale: 1, ease: "power2.inOut"  }, "<-0.2")

            .to(".wrapAd", { duration: 2, scale: 1, transformOrigin: "30% 80%", ease: "power3.out"  }, "<")
      .to("[id*='wrapElipse']", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<")

      .to("#fr2", { duration: 0.25, autoAlpha: 0 , ease: "power2.out"  }, "<")


      .to("[id*='txt-2-']", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<+0.5")




      //.to("#bg", { duration: 4, scale: 2.5, transformOrigin: "66px 382px", ease: "none"  }, "<")


      .from("#logo", { duration: 0.5, autoAlpha: 0, ease: "power3.out"  }, "<")      
      

      .from("#txt-3-1", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.5")
      .from("#txt-3-2", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")      
      .from("#txt-3-3", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")      
      .from("#txt-3-4", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")    
      .from("#txt-3-5", { duration: 0.5, y: 20, autoAlpha: 0, ease: "power3.out"  }, "<+0.2")    

      .from("#cta", { duration: 0.5, y: 300, autoAlpha: 0, ease: "power3.out"  }, "<")      

      
      .add(function () {  pauseAllAnimations()  }, "<+3")
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

