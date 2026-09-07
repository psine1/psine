
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/img-1-a.png");

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
  
}


// VARIABLES GLOBALES
var multitimeline = new TimelineMax({paused:false});
    multitimeline.addPause(18);
    multitimeline
    .add(fr1(), 0)
    .add(fr_moves(),0)
    .add(fr2(), 4)
    .add(fr3(), 9)
    .add(fr4(), 13);

TweenMax.set("[id*='cta-hover']", {autoAlpha:0});

function fr1(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_

.from("[id*='txt-1']", 1, {ease:Power2.easeOut, autoAlpha:0, x: 20}, 0.5)

.from("[id*='img-1-a']", 1.5, {y: 80,ease:Power2.easeInOut}, 0)
.from("[id*='img-1-b']", 1.5, {y: 80,ease:Power2.easeInOut}, 0.2)
.from("[id*='img-1-c']", 1.5, {y: 80,ease:Power2.easeInOut}, 0.4)




;
return tl_  
}

var tl_wind = new TimelineMax({repeat: -1});  
tl_wind.timeScale( 1.7 );  
tl_wind
.staggerFrom("[id*='line-']", 2, {x: -50, autoAlpha: 0, ease:Power1.easeInOut},0.2 , 0)
.staggerTo("[id*='line-']", 2, {x: 50, autoAlpha: 0, ease:Power1.easeInOut},0.2 , 2);










function fr2(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_

.from("[id*='wind-']", 1, {ease:Power1.easeInOut, autoAlpha: 0}, 1.3)

.to("[id*='img-1-a']", 1, {y: 100,ease:Power2.easeInOut}, 0.4)
.to("[id*='img-1-b']", 1, {y: 100,ease:Power2.easeInOut}, 0.2)
.to("[id*='img-1-c']", 1, {y: 100,ease:Power2.easeInOut}, 0)


.from("[id*='img-2-a']", 1, {y: 100,ease:Power2.easeInOut}, 0.6)
.from("[id*='img-2-b']", 1, {y: 100,ease:Power2.easeInOut}, 0.8)
.from("[id*='img-2-c']", 1, {y: 100,ease:Power2.easeInOut}, 1)
.from("[id*='img-2-d']", 1, {y: 100,ease:Power2.easeInOut}, 1.2)


.to("[id*='txt-1']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0.5)
.from("[id*='txt-2']", 1, {ease:Power2.easeOut, autoAlpha:0, x: 20}, 1)



.from("[id*='img-2-a-ray'] img", 0.7, { scale: 0, opacity: 0.5, y: -20}, 3.5)
.to("[id*='img-2-a-ray'] img", 0.7, { scale: 1.3, y: -5, opacity: 0}, "-=0.2")

.from("[id*='gradient'] img", 2, {  opacity: 0}, 3)
.to("[id*='gradient'] img", 0.35, {  opacity: 0.9, repeat: 3, yoyo: true }, 3.4)
.to("[id*='gradient'] img", 0.35, {  opacity: 1}, 4.5)



;
return tl_  
}


function fr3(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_

.to("[id*='wind-']", 1, {ease:Power1.easeInOut, autoAlpha: 0}, 0)

.to("[id*='img-2-a']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.6)
.to("[id*='img-2-b']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.4)
.to("[id*='img-2-c']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.2)
.to("[id*='img-2-d']", 1.5, {y: 200,ease:Power2.easeInOut}, 0)

.from("[id*='img-3-a']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.6)
.from("[id*='img-3-b']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.8)
.from("[id*='img-3-c']", 1.5, {y: 200,ease:Power2.easeInOut}, 1)

.to("[id*='txt-2']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0.5)
.from("[id*='txt-3']", 1, {ease:Power2.easeOut, autoAlpha:0, x: 20}, 1)
;
return tl_  
}

function fr4(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_
.to("[id*='gradient']", 2, {  opacity: 0}, 0)
.to("[id*='img-3-a']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.4)
.to("[id*='img-3-b']", 1.5, {y: 200,ease:Power2.easeInOut}, 0.2)
.to("[id*='img-3-c']", 1.5, {y: 200,ease:Power2.easeInOut}, 0)

.to("[id*='txt-3']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0.5)

.from("[id*='txt-4']", 1, {ease:Power2.easeOut, autoAlpha:0}, 1)

.from("[id*='logo']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0.5)

.from("[id*='btn']", 1, {ease:Power2.easeOut, y: 150, autoAlpha: 0}, 0.7)
;
return tl_  
}


function fr_moves(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_
.to("[id*='-tree1']", 0.8, {ease:Linear.easeNone, rotation: 3, repeat: -1, yoyo: true}, 0)
.to("[id*='bush-1']", 0.7, {ease:Linear.easeNone, scaleY: 0.9, repeat: -1, yoyo: true}, 0)
.to("[id*='-tree-2']", 0.9, {ease:Linear.easeNone, scaleY: 1.05, repeat: -1, yoyo: true}, 0)
.to("[id*='panel-1']", 1, {ease:Power2.easeOut, rotation: 3, repeat: -1, yoyo: true}, 0)
.to("[id*='panel-2']", 1, {ease:Power2.easeOut, rotation: 3, repeat: -1, yoyo: true}, 0)
.to("[id*='tree-3']", 0.8, {ease:Linear.easeNone, rotation: 3, repeat: -1, yoyo: true}, 0)

;
return tl_  
}


var tl_line = new TimelineMax();
tl_line.add(TweenMax );


function initAnimations(){
    multitimeline.timeScale(1); 
}


//HANDLERS
function initHandlers() {

var clicktag = document.getElementById('clickTag');
    clicktag.addEventListener('mouseup', function(event) {
        window.open(window.clickTag,'_blank');
        
    })


    clicktag.addEventListener('mouseover', function(event) {
    TweenMax.to("[id*='cta-hover']", 0.3, {ease:Power2.easeInOut, autoAlpha: 1})
    TweenMax.to("[id*='cta-out']", 0.3, {ease:Power2.easeInOut, autoAlpha: 0})
    TweenMax.to("[id*='btn']", 0.3, {ease:Power2.easeInOut, backgroundColor: "white"})

    })

    clicktag.addEventListener('mouseout', function(event) {
    TweenMax.to("[id*='cta-hover']", 0.3, {ease:Power2.easeInOut, autoAlpha: 0})
    TweenMax.to("[id*='cta-out']", 0.3, {ease:Power2.easeInOut, autoAlpha: 1})
    TweenMax.to("[id*='btn']", 0.3, {ease:Power2.easeInOut, backgroundColor: "transparent"})

    })

}

