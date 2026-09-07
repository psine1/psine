
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


.to('#point', 0.75, { scale: 1.5, transformOrigin: "center center", repeat: -1, yoyo: true, ease: "power3.out" }, "<")
.to('#middle1', 0.75, { rotation: 360, transformOrigin: "left center", repeat: -1, ease: "none" }, "<")
.to('#middle2', 0.75, { rotation: -360, transformOrigin: "right center", repeat: -1, ease: "none" }, "<")
.to('#line1', 0.65, { scale: 1.1, transformOrigin: "center center", repeat: -1, yoyo: true, ease: "power3.out" }, "<")
.to('#line2', 1, { scale: 1.1, transformOrigin: "center center", repeat: -1, yoyo: true, ease: "power3.out" }, "<")



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
      



      .from('#footer1', 0.5, { y: 100, ease: "power3.out" }, "<")

      .from('#img1', 5, { scale: 1.15, ease: "power3.out" }, "<")    

      .from('#footer2', 0.5, { y: 100, ease: "power3.out" }, "<+0.05")
      
      .from('#logo', 1, { autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#cta', 0.75, { autoAlpha: 0, scale: 0.85, ease: "power3.out" }, "<+0.5")

      .from('#txt-1-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<-0.5")
      .from('#txt-1-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-1-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-1-4', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")


      .to('[id*="txt-1-"]', 0.75, {autoAlpha: 0, ease: "power3.out" }, "<+2")

      .from('#img2', 5, { scale: 1.15, ease: "power3.out" }, "<")    
      .from('#img2', 0.35, { autoAlpha: 0, ease: "power3.out" }, "<")    


      .from('#txt-2-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-2-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-4', 0.7, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-2-5', 0.7, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")

      .from('#radar', 0.75, { scale: 0, autoAlpha: 0, ease: "power3.out" }, "<-0.5")

      .to('#radar, #containerInsects', 0.01, { x: -140, y: 210, ease: "power3.out" }, "<")


      .to('#pointEnd', 0.75, { scale: 5, transformOrigin: "center center", ease: "power3.out" }, "<+1.5")
      .fromTo('#containerInsects', 0.75, {scale: 0}, { scale: 0.25, transformOrigin: "50% 50%", ease: "power3.out" }, "<")


      .to('#pointEnd', 0.75, { scale: 1, transformOrigin: "center center", ease: "power3.out" }, "<+1.5")
      .to('#containerInsects', 0.75, { scale: 0, transformOrigin: "50% 50%", ease: "power3.out" }, "<")  
      
      .to('#radar, #containerInsects', 0.75, { scale: 0, autoAlpha: 0, ease: "power3.out" }, "<+0.75")



      .to('[id*="txt-2-"]', 0.75, {autoAlpha: 0, ease: "power3.out" }, "<")

      .from('#img3', 5, { scale: 1.15, ease: "power3.out" }, "<")    
      .from('#img3', 0.35, { autoAlpha: 0, ease: "power3.out" }, "<")    

      .from('#txt-3-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-3-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-3-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")

    
      .to('#radar', 0.75, { scale: 1, autoAlpha: 1, ease: "power3.out" }, "<-0.5")
      .to('#radar, #containerInsects', 0.01, { x: -140, y: 80, ease: "power3.out" }, "<")

      .to('#pointEnd', 0.75, { scale: 5, transformOrigin: "center center", ease: "power3.out" }, "<+1.5")
      .to('#containerInsects', 0.75, { scale: 0.25, autoAlpha: 1, transformOrigin: "50% 50%", ease: "power3.out" }, "<")


      .to('#pointEnd', 0.75, { scale: 1, transformOrigin: "center center", ease: "power3.out" }, "<+1.5")
      .to('#containerInsects', 0.75, { scale: 0, transformOrigin: "50% 50%", ease: "power3.out" }, "<")  
      
      .to('#radar, #containerInsects', 0.75, { scale: 0, autoAlpha: 0, ease: "power3.out" }, "<+0.75")     
      
      
      .to('[id*="txt-3-"]', 0.75, {autoAlpha: 0, ease: "power3.out" }, "<")

      .from('#img4', 5, { scale: 1.15, ease: "power3.out" }, "<")    
      .from('#img4', 0.35, { autoAlpha: 0, ease: "power3.out" }, "<")    

      .from('#txt-4-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-4-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-4-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-4-4', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-4-5', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")

    
      .to('#radar', 0.75, { scale: 1, autoAlpha: 1, ease: "power3.out" }, "<-0.5")
      .to('#radar, #containerInsects', 0.01, { x: -170, y: 230, ease: "power3.out" }, "<")

      .to('#pointEnd', 0.75, { scale: 5, transformOrigin: "center center", ease: "power3.out" }, "<+1.5")
      .to('#containerInsects', 0.75, { scale: 0.25, autoAlpha: 1, transformOrigin: "50% 50%", ease: "power3.out" }, "<")


      .to('#pointEnd', 0.75, { scale: 1, transformOrigin: "center center", ease: "power3.out" }, "<+1.5")
      .to('#containerInsects', 0.75, { scale: 0, transformOrigin: "50% 50%", ease: "power3.out" }, "<")  
      
      .to('#radar, #containerInsects', 0.75, { scale: 0, autoAlpha: 0, ease: "power3.out" }, "<+0.75")        
      
      
      .to('[id*="txt-4-"]', 0.75, {autoAlpha: 0, ease: "power3.out" }, "<")

      .from('#img5', 15, { scale: 1.15, ease: "power3.out" }, "<")    
      .from('#img5', 0.35, { autoAlpha: 0, ease: "power3.out" }, "<")    

      .from('#txt-5-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-5-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-5-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")   
      .from('#txt-5-4', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")   
      
      .from('#seal', 0.75, { rotation: -90, autoAlpha: 0, ease: "power3.out" }, "<+0.2")      
      

      .to('[id*="txt-5-"]', 0.75, {autoAlpha: 0, ease: "power3.out" }, "<+2.5")

      .from('#txt-6-1', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.5")
      .from('#txt-6-2', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")
      .from('#txt-6-3', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")  
      .from('#txt-6-4', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+0.2")        

      .from('#null', 0.75, { y: 20, autoAlpha: 0, ease: "power3.out" }, "<+3")        





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

