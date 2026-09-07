
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/people.png"

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
    .add(divider(), 2)
    .add(fr2(), 3.1)
    .add(divider(), 5)
    .add(fr3(), 6.1)
    .add(fr4(), 9)
    
    ;

//TweenMax.set("#img-2", {autoAlpha: 0});



function fr1(){ 

        var tl_ = new TimelineMax({repeat: 0});  
        tl_.timeScale( 1 );  
        tl_
        .to('#road', 8, {x: -63, y: -33, scale: 1.35, ease:Power3.easeOut}, 0)
        .fromTo('#maskroad', 8, {x: 10, y: -3}, {x: -63, y: -30, scale: 1.35, ease:Power3.easeOut}, 0)

        .to('#cloud-1', 20, {x: -80, y: -13, ease:Power3.easeOut}, 0)
        .staggerFrom('[id*="txt-1-"]', 2, {y: 250, autoAlpha: 0, ease:Power3.easeOut}, 0.2, 0)
        ;

        var tl_car = new TimelineMax({repeat: -1});  
        tl_car.timeScale( 1 );  
        tl_car
        .to('#car, #mirror', 0.6, {x: 2, y: 3, ease:Linear.easeNone}, 0 )
        .to('#car, #mirror', 1.5, {x: 0, y: 0, ease:Linear.easeNone});

      return tl_  
}

function fr2(){ 

    var tl_ = new TimelineMax({repeat: 0});  
    tl_.timeScale( 1 );  
    tl_
          .from('#scene2', 0.01, {autoAlpha: 0, ease:Power3.easeOut}, 0)
          .staggerFrom('[id*="txt-2-"]', 2, {y: 250, autoAlpha: 0, ease:Power3.easeOut}, 0.2, 0)
          .from('#bg-fr2', 8, {scale: 1.3, y: -50, ease:Power3.easeOut}, 0)
          .from('#mountain-fr2', 8, {scale: 1.3, x: -20, y: -80, ease:Power3.easeOut}, 0)

        .from('#cloud-2', 20, {x: -50, y: -90, ease:Power3.easeOut}, 0)


          ;
    return tl_  
}

function fr3(){ 

    var tl_ = new TimelineMax({repeat: 0});  
    tl_.timeScale( 1 );  
    tl_
          .from('#scene3', 0.01, {autoAlpha: 0, ease:Power3.easeOut}, 0)
          .staggerFrom('[id*="txt-3-"]', 2, {y: 250, autoAlpha: 0, ease:Power3.easeOut}, 0.2, 0)
          .from('#bg-fr3', 8, {scale: 1.2, x: -60, ease:Power3.easeOut}, 0)
          .from('#people', 8, {scale: 1.25, x: -70, y: 20, ease:Power3.easeOut}, 0)

          .from('#cloud-3', 20, {x: 100, y: -90, ease:Power3.easeOut}, 0)

          ;
    return tl_  
}


function fr4(){ 

    var tl_ = new TimelineMax({repeat: 0});  
    tl_.timeScale( 1 );  
    tl_
          .fromTo('#line-1', 2.2, {x: 700, y: 1250}, {x: 0, y: 0, ease:Power3.easeInOut}, 0)
          .fromTo('#line-2', 2.2, {x: 700, y: 1250}, {x: 0, y: 0, ease:Power3.easeInOut}, 0.2)
          .fromTo('#line-3', 2.2, {x: 700, y: 1250}, {x: 0, y: 0, ease:Power3.easeInOut}, 0.25)
          .fromTo('#line-4', 2.2, {x: 700, y: 1250}, {x: 0, y: 0, ease:Power3.easeInOut}, 0.35)
          .from('#logo-end', 1.5, {scale: 1.25, autoAlpha: 0, ease:Power3.easeOut}, 2)
          .from('[id*="txt-4-"]', 2, {scale: 1.25, autoAlpha: 0, ease:Power3.easeOut}, 2.5)

          .from('#cta', 1.5, {scale: 1.25, autoAlpha: 0, ease:Back.easeOut.config(0.5)}, 3)
          .from('#txt-5', 1.5, { autoAlpha: 0, ease:Power3.easeOut}, 3.2)

          .from('#anim', 1.5, { autoAlpha: 0, transformOrigin: "50% 50%", ease:Power3.easeOut}, 3.2)


          ;
    return tl_  
}



function divider(){ 

var tl_ = new TimelineMax({repeat: 0});  
tl_.timeScale( 1 );  
tl_
      .fromTo('#color-1', 2.2, {x: 0, y: 0}, {x: -700, y: -1250, ease:Power3.easeInOut}, 0)
      .fromTo('#color-2', 1.95, {x: 0, y: 0}, {x: -700, y: -1250, ease:Power3.easeInOut}, 0.2)
      .fromTo('#color-3', 1.85, {x: 0, y: 0}, {x: -700, y: -1250, ease:Power3.easeInOut}, 0.25)
      .fromTo('#color-4', 1.65, {x: 0, y: 0}, {x: -700, y: -1250, ease:Power3.easeInOut}, 0.35)      
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
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#fdb913", ease:Power2.easeOut}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta img", 0.3, {scale: 1, backgroundColor: "#ffffff", ease:Power2.easeOut}, 0)

    },
  };

}

