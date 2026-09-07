
//PRELOAD DE IMG
this.addEventListener("DOMContentLoaded", preloadImages, true);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = new Array("images/city-1.png");

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
    .add(fr2(), 5)
    .add(fr3(), 9)
    .add(fr4(), 13);

TweenMax.set("[id*='cta-hover']", {autoAlpha:0});

function fr1(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_

.to("[id*='city-1'], [id*='city-6'], [id*='city-2']", 18, {ease:Power1.easeInOut, x: -938}, 0)
.to("[id*='gradient']", 18, {ease:Power1.easeInOut, x: -938}, 0)
.fromTo("[id*='city-3']", 18, {x: -40}, {ease:Power1.easeInOut, x: -938}, 0)
.fromTo("[id*='city-4'], [id*='city-8']", 18, {x: -50}, {ease:Power1.easeInOut, x: -800}, 0)
.fromTo("[id*='city-5']", 18, {x: -50}, {ease:Power1.easeInOut, rotation: -7.3, y: -7.8, x: -750}, 0)

.to("[id*='city-6'], [id*='city-7']", 18, {ease:Power1.easeInOut, x: -938}, 0)
.to("[id*='wind-']", 18, {ease:Power1.easeInOut, x: -938}, 0)

.from("[id*='wind-']", 1, {ease:Power1.easeInOut, autoAlpha: 0}, 1.8)


.to("[id*='city-6']", 1, {ease:Power1.easeInOut, rotation: 7, repeat: -1, yoyo: true}, 3.7)
.to("[id*='city-7']", 1, {ease:Power1.easeInOut, rotation: 7, repeat: -1, yoyo: true}, 3.8)

.from("[id*='gradient'] img", 2, {ease:Power1.easeInOut, autoAlpha: 0}, 4.3)
.to("[id*='gradient'] img", 2, {ease:Power1.easeInOut, autoAlpha: 0}, 12.5)



;
return tl_  
}

var tl_wind = new TimelineMax({repeat: -1});  
tl_wind.timeScale( 1.7 );  
tl_wind
.staggerFrom("[id*='line-']", 2, {x: -50, autoAlpha: 0, ease:Power1.easeInOut},0.2 , 0)
.staggerTo("[id*='line-']", 2, {x: 50, autoAlpha: 0, ease:Power1.easeInOut},0.2 , 2);


var tl_storm = new TimelineMax({});  
tl_storm.timeScale( 1 );  
tl_storm
.to("#trunk-1-small", 2, {morphSVG:"#trunk-2-small", ease:Power1.easeInOut}, 3.7)
.to("#tree-small", 2, {rotation: 45, ease:Power1.easeInOut}, 3.7)
.to("#trunk-1-big", 2, {morphSVG:"#trunk-2-big", ease:Power1.easeInOut}, 3.8)
.to("#tree-big", 2, {rotation: 45, x: 10, ease:Power1.easeInOut}, 3.8)
.from("[id*='city-8-ray'] img", 0.7, { scale: 0, opacity: 0.5, y: -20}, 7)
.to("[id*='city-8-ray'] img", 0.7, { scale: 1.3, y: -5, opacity: 0}, "-=0.2")

.to("[id*='gradient'] img", 0.35, {  opacity: 0.75, repeat: 3, yoyo: true }, 6.8)


;
//TweenMax.staggerFromTo("[id*='city-8-ray'] img", 2, {scale: 0},{ scale: 1.75, opacity: 0,  repeat: 2, delay: 4}, 0.2, 0);










function fr2(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_
.to("[id*='txt-1']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0)
.from("[id*='txt-2']", 1, {ease:Power2.easeOut, autoAlpha:0, x: 20}, 0.5)
;
return tl_  
}


function fr3(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_
.to("[id*='txt-2']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0)
.from("[id*='txt-3']", 1, {ease:Power2.easeOut, autoAlpha:0, x: 20}, 0.5)
;
return tl_  
}

function fr4(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_
.to("[id*='txt-3']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0)

.from("[id*='txt-4']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0.5)

.from("[id*='logo']", 1, {ease:Power2.easeOut, autoAlpha:0}, 0.5)

.from("[id*='btn']", 1, {ease:Power2.easeOut, y: 150, autoAlpha: 0}, 0.7)
;
return tl_  
}


function fr_moves(){

var tl_ = new TimelineMax();  
tl_.timeScale( 1 );  
tl_
.to("[id*='tree-1']", 0.8, {ease:Linear.easeNone, rotation: 3, repeat: -1, yoyo: true}, 0)
.to("[id*='bush-1']", 0.7, {ease:Linear.easeNone, scaleY: 0.9, repeat: -1, yoyo: true}, 0)
.to("[id*='tree-2']", 0.9, {ease:Linear.easeNone, scaleY: 1.05, repeat: -1, yoyo: true}, 0)
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

