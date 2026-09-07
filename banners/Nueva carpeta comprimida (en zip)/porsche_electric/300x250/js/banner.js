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
    document.getElementById('wrapper').style.display = 'block';
    

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
    .add(fr1(), 0)
    
    ;
    
//   multitimeline.pause(4);

function fr1(){
  var tl_ = gsap.timeline();
      tl_.timeScale(1);  
      tl_


    .from(".st0", {duration:1, drawSVG: 0}, "<")

    .to("#svgRay, #lighten", {duration: 0.35, autoAlpha: 0}, ">")
    .to("#svgMask", {duration: 0.5, scale: 8}, ">-0.2")
    .to("#overlay", {duration: 0.01, autoAlpha: 0}, "<")


	  .from('#bg', 18, {scale: 1.56, rotation: 0.05, transformOrigin: "50% 10%", ease: "power3.out"}, "<")
      
	  .from('#logo', 1.5, { opacity: 0, ease: Power4.easeOut}, "<")			
	  .from('[id*="txt-1-"]', 1, {autoAlpha: 0, y: 20, stagger: 0.15, ease: "power3.out"}, "<+0.65")

	  .to('[id*="txt-1-"]', 0.65, {autoAlpha: 0, y: 0, ease: "power3.out"}, "<+2.2")

	  .from('[id*="txt-2-"]', 1, {autoAlpha: 0, y: 20, stagger: 0.15, ease: "power3.out"}, "<+0.5")

//    .to('[id*="txt-2"]', 0.65, {autoAlpha: 0, ease: "power3.out"}, "<+2.2")


	  .fromTo('#btn', 1, {opacity: 0}, {opacity: 1, ease: "power3.out"}, "<+0.5")




return tl_  
}



const bolt = document.getElementById("bolt");

// Parse original points
const basePoints = bolt.getAttribute("points")
  .trim()
  .split(" ")
  .map(p => p.split(",").map(Number));

const subdivisions = 15; // Aumentá para más detalle
const amplitude = 10;    // Variación eléctrica

function interpolatePoints(points) {
  const newPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];

    newPoints.push([x1, y1]);

    for (let j = 1; j < subdivisions; j++) {
      const t = j / subdivisions;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;

      // Agregar electricidad con ruido
      const dx = (Math.random() - 0.5) * amplitude;
      const dy = (Math.random() - 0.5) * amplitude;

      newPoints.push([x + dx, y + dy]);
    }
  }

  newPoints.push(points[points.length - 1]); // último punto
  return newPoints;
}

function draw(points) {
  bolt.setAttribute("points", points.map(p => p.join(",")).join(" "));
}

function animateBolt() {
  const jittered = interpolatePoints(basePoints);
  draw(jittered);

  gsap.fromTo(bolt, { opacity: 1 }, {
    opacity: 1,
    duration: 0.03,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      setTimeout(animateBolt, 10 + Math.random() * 1);
    }
  });
}

animateBolt();




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
	  var tl = new TimelineMax({
		defaults: { duration: 0.5, ease: 'easeInOut' },
	  });
	  tl
		.to("#btn-text img", 0.2, {x: 0, background: "#FFFFFF1A", ease:Power2.easeOut}, 0)

	},
	leave: function () {
	  var tl = new TimelineMax({
		defaults: { duration: 0.5, ease: 'easeInOut' },
	  });
	  tl
		.to("#btn-text img", 0.2, {x: 0, background: "transparent", ease:Power2.easeOut}, 0)

	},
  };

}

