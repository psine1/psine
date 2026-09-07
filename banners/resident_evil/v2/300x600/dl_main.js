// =========================
// 1) PRELOAD (AUTOMÁTICO)
// =========================
window.addEventListener("DOMContentLoaded", () => {
  preloadAllImgsInBanner();
});

function preloadAllImgsInBanner() {
  const banner = document.getElementById("banner_content");
  const imgs = Array.from(banner.querySelectorAll("img"));

  let loaded = 0;
  const total = imgs.length;

  if (!total) {
    imagesLoaded();
    return;
  }

  imgs.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src) {
      loaded++;
      if (loaded === total) imagesLoaded();
      return;
    }

    const tmp = new Image();
    tmp.onload = tmp.onerror = () => {
      loaded++;
      if (loaded === total) imagesLoaded();
    };
    tmp.src = src;
  });
}

function imagesLoaded() {
  const loader = document.getElementById("loader-container");
  const content = document.getElementById("banner_content");
  if (loader) loader.style.display = "none";
  if (content) content.style.display = "block";

  initHandlers();
  initAnimations();

  // Inicializar glitch cuando el banner ya está visible
  setupGlitchForFrames();

  // Set frame activo inicial (por clase is-active)
  const idx = frames.findIndex((f) => f.classList.contains("is-active"));
  activeFrameIndex = idx >= 0 ? idx : 0;

  // Arranca glitch base
  startBaseGlitch(50);

  // Autoplay de frames 
  
  playFramesSequence();
}

// =========================
// 2) DETECCIONES DE NAVEGADOR
// =========================
var is_Mac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (is_Mac || iOS) {}

if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {}

// =========================
// 3) TIMELINES 
// =========================

gsap.registerPlugin(SplitText) 

/*
  const txt_1_1 = new SplitText("#txt-1-1", { type: "chars", charsClass: "char" });
  const txt_1_2 = new SplitText("#txt-1-2", { type: "chars", charsClass: "char" });
  const txt_1_3 = new SplitText("#txt-1-3", { type: "chars", charsClass: "char" });
  const txt_1_4 = new SplitText("#txt-1-4", { type: "chars", charsClass: "char" });
  const txt_1_5 = new SplitText("#txt-1-5", { type: "chars", charsClass: "char" });
  const txt_1_6 = new SplitText("#txt-1-6", { type: "chars", charsClass: "char" });

*/
  gsap.set("#txt-1, #txt-2, #txt-3, #txt-4, #txt-5, #txt-6", { autoAlpha: 0, scale: 1.6 })

  

var multitimeline = gsap.timeline();
multitimeline.timeScale(1);

const tl_All = gsap.timeline({});
tl_All.timeScale(1);


tl_All
  .to("txt-1-1", { duration: 0.3, autoAlpha: 0, ease: "power2.inOut" }, "<")
  

// =========================
// 4) FRAMES (todos PNG layers)
// =========================
const frames = Array.from(document.querySelectorAll("#scene .frame"));

// init: solo el primero visible
frames.forEach((f, i) => {
  gsap.set(f, { autoAlpha: i === 0 ? 1 : 0 });
  if (i === 0) f.classList.add("is-active");
  else f.classList.remove("is-active");
});

// transición
function transitionFrame(fromIdx, toIdx) {
  const from = frames[fromIdx];
  const to = frames[toIdx];

  // marca active
  from.classList.remove("is-active");
  to.classList.add("is-active");

  gsap.to(from, { autoAlpha: 0, duration: 0.25, ease: "power2.inOut" });
  gsap.to(to, { autoAlpha: 1, duration: 0.25, ease: "power2.inOut" });
}

// secuencia autoplay simple
async function playFramesSequence() {
  // timing
  const hold = 0;

  // frame 1 hold
 // await sleep(hold);

function enableHover() {
  hoverEnabled = true;
  console.log("hiover")
}

  const tl_All = gsap.timeline({ onComplete: enableHover });
  tl_All.timeScale(1);

  gsap.set("#lines", {scale: 1.2})

  const linesTween = gsap.from("#lines", { duration: 0.2, y: 5, repeat: -1, yoyo: true, ease: "none" });

  tl_All
  .from("#bg1", { duration: 2.4 , scale: 1.1, ease: "power3.out" }, "<")  
  .add( function(){startBaseGlitch(50);}, "<" )


  .to("#txt-1", { duration: 0.15, scale: 1, autoAlpha: 1, ease: "power2.inOut" }, "<")
  .to("#txt-2", { duration: 0.15, scale: 1, autoAlpha: 1, ease: "power2.inOut" }, "<")
  .to("#txt-3", { duration: 0.15, scale: 1, autoAlpha: 1, ease: "power2.inOut" }, "<")
  .to("#txt-4", { duration: 0.15, scale: 1, autoAlpha: 1, ease: "power2.inOut" }, "<")
  .to("#txt-5", { duration: 0.15, scale: 1, autoAlpha: 1, ease: "power2.inOut" }, "<")
  .to("#txt-6", { duration: 0.15, scale: 1, autoAlpha: 1, ease: "power2.inOut" }, "<")  


  /*
  .from("[id*='txt-1-']", { y: () => gsap.utils.random(-50, 50), x: () => gsap.utils.random(-20, 20), autoAlpha: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, "<+0.3")
  .to("#txt-1", { duration: 0.3, autoAlpha: 1, ease: "power2.inOut" }, "<")

  .from("[id*='txt-2-']", { y: () => gsap.utils.random(-50, 50), x: () => gsap.utils.random(-20, 20), autoAlpha: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, "<+0.05")
  .to("#txt-2", { duration: 0.3, autoAlpha: 1, ease: "power2.inOut" }, "<")

  .from("[id*='txt-3-']", { y: () => gsap.utils.random(-50, 50), x: () => gsap.utils.random(-20, 20), autoAlpha: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, "<+0.05")
  .to("#txt-3", { duration: 0.3, autoAlpha: 1, ease: "power2.inOut" }, "<")

  .from("[id*='txt-4-']", { y: () => gsap.utils.random(-50, 50), x: () => gsap.utils.random(-20, 20), autoAlpha: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, "<+0.05")
  .to("#txt-4", { duration: 0.3, autoAlpha: 1, ease: "power2.inOut" }, "<")

  .from("[id*='txt-5-']", { y: () => gsap.utils.random(-50, 50), x: () => gsap.utils.random(-20, 20), autoAlpha: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, "<+0.05")
  .to("#txt-5", { duration: 0.3, autoAlpha: 1, ease: "power2.inOut" }, "<")
  
  .from("[id*='txt-6-']", { y: () => gsap.utils.random(-50, 50), x: () => gsap.utils.random(-20, 20), autoAlpha: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }, "<+0.05")
  .to("#txt-6", { duration: 0.3, autoAlpha: 1, ease: "power2.inOut" }, "<")  


  */

  .to("[id*='txt-1-']", { y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-0, 20), autoAlpha: 0, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<+2.5")
  .to("[id*='txt-1']", { duration: 0.3, scale: 1.5, x: -30, y: -100, color: "#fd5858", ease: "power2.inOut" }, "<")

  .to("[id*='txt-2-']", { y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-0, 20), autoAlpha: 0, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<")
  .to("[id*='txt-2']", { duration: 0.3, scale: 1.5, x: 100, y: -100, color: "#fd5858", ease: "power2.inOut" }, "<")

  .to("[id*='txt-3-']", { y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-0, 20), autoAlpha: 0, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<")
  .to("[id*='txt-3']", { duration: 0.3, scale: 1.5, x: 100, y: -30, color: "#fd5858", ease: "power2.inOut" }, "<")

  .to("[id*='txt-4-']", { y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-0, 20), autoAlpha: 0, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<")
  .to("[id*='txt-4']", { duration: 0.3, scale: 1.5, x: -50, y: 30, color: "#fd5858", ease: "power2.inOut" }, "<")

  .to("[id*='txt-5-']", { y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-0, 20), autoAlpha: 0, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<")
  .to("[id*='txt-5']", { duration: 0.3, scale: 1.8, x: 30, y: 70, color: "#fd5858", ease: "power2.inOut" }, "<")

  .to("[id*='txt-6-']", { y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-0, 20), autoAlpha: 0, scale: 1, duration: 1, stagger: 0.02, ease: "power3.out" }, "<")
  .to("[id*='txt-6']", { duration: 0.3, scale: 2, x: 100, y: 60, color: "#fd5858", ease:"power2.inOut" }, "<")  

  //.to("#bg1", { duration: 0.2, scale: 1.7, transformOrigin: "50% 0%", ease: "power3.out" }, "<")
  
  .to("[id*='txt-']", { duration: 0.3, autoAlpha: 0, ease: "power2.inOut" }, "<+0.5")
  
  .add( function(){spikeTransitionTo(1);}, "<" )
  .to("[id*='bg2a']", { duration: 0.5, autoAlpha: 0, ease: "power2.inOut" }, "<+0.4")
  .add( function(){startBaseGlitch(30);}, "<" )

  .fromTo("#logo, #slogan", { scale: 1.2 /*mixBlendMode: "overlay"*/ }, { scale: 1, /*mixBlendMode: "normal",*/ duration: 1, ease: "power3.out" }, "<+0.5" )
  .add( function(){stopBaseGlitch(1);}, "<" )
  .add( function(){linesTween.pause();}, "<" )
  .to("[id*='lines']", { duration: 0.3, autoAlpha: 0, ease: "power2.inOut" }, "<")

  .from("#logo, #slogan", { duration: 0.2, autoAlpha: 0, ease: "power2.inOut" }, "<")    

  .from("#cta", { duration: 0.5, autoAlpha: 0, scale: 1.3, transformOrigin: "50% 60%", ease: "power2.inOut" }, "<+0.5")    
  


  

}

function sleep(sec) {
  return gsap.to({}, { duration: sec });
}

// transición con spikes + cambio de frame activo del glitch
async function spikeTransitionTo(nextIndex) {
  // spike en frame actual
  spikeGlitch();

  // cambio frame
  const prev = activeFrameIndex;
  transitionFrame(prev, nextIndex);

  // set frame activo glitch
  setActiveFrameGlitch(nextIndex);

  // esperar 1-2 RAF para que el nuevo frame “asiente”
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  // spike en frame nuevo
  spikeGlitch();
}

// =========================
// 5) GLITCH DOM POR ELEMENTO (IMG)
// =========================
const GLITCH_CFG = {
  slicesPerElement: 5,
  baseMinDelay: 0.10,
  baseMaxDelay: 0.7,
  baseStrength: 0.55,
  spikeStrength: 1.35
};

function rand(min, max) { return Math.random() * (max - min) + min; }
function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

let glitchItems = [];
let baseTicker = null;
let activeFrameIndex = 0;

function setupElementGlitch(hostEl, slicesCount = 5) {
  hostEl.classList.add("glitch-host");

  const cs = getComputedStyle(hostEl);
  if (cs.position === "static") hostEl.style.position = "relative";

  // 👇 base = contenido real (img o texto wrapper)
  const base = hostEl.querySelector("img") || hostEl.firstElementChild || hostEl;

  function makeClone(cls) {
    const clone = base.cloneNode(true);

    //  quitar IDs en todo el subtree del clon
    if (clone.id) clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach(n => n.removeAttribute("id"));

    clone.classList.add(cls);
    return clone;
  }

  const r = makeClone("glitch-r");
  const c = makeClone("glitch-c");

  const slices = [];
  for (let i = 0; i < slicesCount; i++) {
    slices.push(makeClone("glitch-slice"));
  }

  hostEl.appendChild(r);
  hostEl.appendChild(c);
  slices.forEach(s => hostEl.appendChild(s));

  [r, c, ...slices].forEach(n => {
    n.style.position = "absolute";
    n.style.inset = "0";
    n.style.opacity = "0";
    n.style.pointerEvents = "none";
    n.style.zIndex = "2";
  });

  return { hostEl, r, c, slices };
}

function glitchOne(item, strength = 1) {
  const { r, c, slices } = item;
  const tl = gsap.timeline({ defaults: { ease: "steps(1)" } });

  tl.set([r, c], { opacity: 1 }, 0)
    .to(r, { x: rand(-10, -2) * strength, y: rand(-4, 4) * strength, duration: 0.08 }, 0)
    .to(c, { x: rand( 2, 10) * strength, y: rand(-4, 4) * strength, duration: 0.08 }, 0)
    .to([r, c], { opacity: 0, duration: 0.06, ease: "power2.out" }, 0.10);

  slices.forEach((s, i) => {
    const top = rand(5, 85);
    const h = rand(3, 18);
    const xShift = rand(-60, 60) * strength;

    tl.set(s, {
      opacity: rand(0.25, 0.7),
      clipPath: `inset(${top}% 0 ${Math.max(0, 100 - (top + h))}% 0)`
    }, 0.01 + i * 0.01)
      .to(s, { x: xShift, duration: 0.09 }, 0.01 + i * 0.01)
      .to(s, { opacity: 0, duration: 0.06, ease: "power2.out" }, 0.12 + i * 0.005);
  });

  return tl;
}

function setupGlitchForFrames() {
  glitchItems = [];

  frames.forEach((frame, fi) => {
    const layers = Array.from(frame.querySelectorAll(".positionAb"));

    layers.forEach((layer) => {
      //  salteá bg
    //  if (layer.id && layer.id.toLowerCase().startsWith("bg")) return;

      // solo si tiene img, o si querés permitir texto también
      const hasImg = layer.querySelector("img");
      const hasText = layer.textContent.trim().length > 0;

      if (!hasImg && !hasText) return;

      const item = setupElementGlitch(layer, GLITCH_CFG.slicesPerElement);
      item.frameIndex = fi;
      glitchItems.push(item);
    });
  });
}

function getActiveItems() {
  return glitchItems.filter((it) => it.frameIndex === activeFrameIndex);
}

function startBaseGlitch(amount) {
  stopBaseGlitch();

  const tick = () => {
    const items = getActiveItems();

    if (items.length) {
      // 1-3 elementos al azar por tick
      const count = Math.min(items.length, (Math.random() * amount + 1) | 0);
      for (let i = 0; i < count; i++) {
        glitchOne(pick(items), GLITCH_CFG.baseStrength);
      }
    }

    baseTicker = gsap.delayedCall(rand(GLITCH_CFG.baseMinDelay, GLITCH_CFG.baseMaxDelay), tick);
  };

  tick();
}



function stopBaseGlitch() {
  if (baseTicker) baseTicker.kill();
  baseTicker = null;
}

function spikeGlitch() {
  const items = getActiveItems();
  // spike sobre varios (si quweremos solo 3-5, lo recortamos)
  items.forEach((it) => glitchOne(it, GLITCH_CFG.spikeStrength));
}

function setActiveFrameGlitch(frameIndex) {
  activeFrameIndex = frameIndex;
}

// =========================
// 6) INIT ANIMATIONS / HANDLERS 
// =========================
function initAnimations() {
  multitimeline.timeScale(1);
}

let hoverEnabled = false;

function initHandlers() {
  const clicktag = document.getElementById("clickTag");
  if (!clicktag) return;

  clicktag.addEventListener("mouseup", function () {
    window.open(window.clickTag, "_blank");
  });

  clicktag.addEventListener("mouseenter", function () {
    if (!hoverEnabled) return;
    startBaseGlitch(3);
  });

  clicktag.addEventListener("mouseleave", function () {
    if (!hoverEnabled) return;
    stopBaseGlitch();
  });
}