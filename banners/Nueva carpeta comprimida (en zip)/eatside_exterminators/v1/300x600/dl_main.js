
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array(
  'images/logo.png'
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
var multitimeline = gsap.timeline({repeat: 1});
    multitimeline.timeScale(1);
    multitimeline
    .add(fr1(), 0)
    
    ;

//    multitimeline.pause(9);


var insectAnim = gsap.timeline();
insectAnim.timeScale(1.5);  
insectAnim
.to('[id*="legs1"]', 0.15, { rotation: 30, repeat: -1,   transformOrigin: "center center",  yoyo: true, ease: "none" }, "<")
.to('[id*="legs2"]', 0.1, { rotation: -25, repeat: -1,   transformOrigin: "center center",  yoyo: true, ease: "none" }, "<")
.to('[id*="legs3"]', 0.1, { rotation: 25, repeat: -1,   transformOrigin: "center center",  yoyo: true, ease: "none" }, "<")

.to('[id*="legs4"]', 0.15, { rotation: 30, repeat: -1,   transformOrigin: "center center",  yoyo: true, ease: "none" }, "<")
.to('[id*="legs5"]', 0.1, { rotation: -25, repeat: -1,   transformOrigin: "center center",  yoyo: true, ease: "none" }, "<")


.to('[id*="body"]', 0.25, { rotation: -10, repeat: -1,   transformOrigin: "center center",  yoyo: true, ease: "none" }, "<")

.to("#cockroach", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path", align: "#path", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<")
.to("#spider", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path", align: "#path", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<+0.5")
.to("#cockroach2", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path2", align: "#path2", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<+0.5")
.to("#ants", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path2", align: "#path2", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<+0.5")
.to("#ants2", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path", align: "#path", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<+0.5")
.to("#cockroach3", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path2", align: "#path2", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<+0.5")
.to("#ants3", { duration: 4, repeat: -1, ease: "none", motionPath:{ path: "#path2", align: "#path2", autoRotate: true, alignOrigin: [0.5, 0.5]}}, "<+0.5")

insectAnim.play(3);


function fr1(){
  var tl_ = gsap.timeline();
      tl_.timeScale(1);  
      tl_
      .from('#footer1', 0.75, { y: 200, ease: "power3.out" }, "<")
      .from('#footer2', 0.75, { y: 200, ease: "power3.out" }, "<+0.05")
      .from('#logo', 1, { autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#cta', 0.75, { autoAlpha: 0, scale: 0.85, ease: "power3.out" }, "<+0.5")

      .from('#txt-1-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<")
      .from('#txt-1-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-1-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")


      .to('[id*="txt-1"]', 0.75, { autoAlpha: 0, ease: "power3.out" }, "<+3")



      .from('#txt-2-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-2-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-4', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-5', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-6', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")


      .fromTo('#smoke1', 6, {x: -350, scale: 0.5, y: -50}, { x: 500, scale: 6, y: -50, ease: "power3.out" }, "<+3.5")      
      .fromTo('#smoke2', 6, {x: -350, scale: 1.2, y: 50}, { x: 500, scale: 8, y: 50, ease: "power3.out" }, "<+0.4 ")     
      .fromTo('#smoke3', 6, {x: -350, scale: 1.2, y: 50}, { x: 500, scale: 8, y: 50, ease: "power3.out" }, "<+0.4 ")
      .fromTo('#smoke4', 6, {x: -350, scale: 1.7, y: 50}, { x: 500, scale: 10, y: 50, ease: "power3.out" }, "<+0.4 ")

      .to('[id*="txt-2"]', 0.75, { autoAlpha: 0, ease: "power3.out" }, "<")  

      .from('#bg2, #gradient', 2, {autoAlpha: 0, ease: "power3.out" }, "<+1 ") 
      .from('#bg2', 8, {scale: 1.25, ease: "power3.out" }, "< ")    
      .to('#smoke2, #smoke1, #smoke3, #smoke4', 2, {autoAlpha: 0, ease: "power3.out" }, "<+0.75")     
      .to('#wrap', 1, {autoAlpha: 0, ease: "power3.out" }, "<-1")     
      
      
      .from('#txt-3-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-3-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-3-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-3-4', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")

      
      .from('#seal', 0.75, { rotation: -180, scale: 0.5, autoAlpha: 0, ease: "power3.out" }, "<")

      .from('#null', 0.75, { rotation: -180, scale: 0.5, autoAlpha: 0, ease: "power3.out" }, "<+3")

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
        .to("#cta", 0.2, {backgroundColor: "#7f1519", ease: "power3.out"}, 0)
    },
    leave: function () {
      console.log('leave');
      var tl = new TimelineMax({
        defaults: { duration: 0.5, ease: 'easeInOut' },
      });
      tl
        .to("#cta", 0.2, {backgroundColor: "#dc1119", ease: "power3.out"}, 0)

    },
  };

}

