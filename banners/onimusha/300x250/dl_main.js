//PRELOAD DE IMG
window.addEventListener("DOMContentLoaded", preloadImages);

var loadedImages = 0;
//ACA HAY QUE CARGAR LAS IMAGENES QUE SE USEN
var imageArray = [
  "images/bg1.jpg",
  "images/txt-1-1.png",
  "images/txt-2-1.png",
  "images/txt-3-1.png",
  "images/brushes.png",
  "images/bg2.jpg",
  "images/character1.png",
  "images/cape.png",
  "images/gradient.png",
  "images/logo.png",
  "images/cta.png",
  "images/light.jpg",
  "images/legal.png"
];

function preloadImages() {
  for (var i = 0; i < imageArray.length; i++) {
    var tempImage = new Image();
    tempImage.addEventListener("load", trackProgress, true);
    tempImage.addEventListener("error", trackProgress, true);
    tempImage.src = imageArray[i];
  }
}

function trackProgress() {
  loadedImages++;
  if (loadedImages === imageArray.length) {
    imagesLoaded();
  }
}

function imagesLoaded() {
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("banner_content").style.display = "block";

  initHandlers();
  initAnimations();
}

// VARIABLES GLOBALES
var BANNER_DURATION = 15;
var multitimeline = gsap.timeline({ paused: true });

/* Mascara organica reutilizable para la apertura y los cambios de frame. */
var OrganicWipe = (function () {
  var WIDTH = 300;
  var HEIGHT = 250;
  var SEGMENTS = 60;
  var edgeProfile = [
    -0.42, 0.18, 0.72, -0.08, -0.66, 0.35, 0.86, 0.12,
    -0.54, -0.15, 0.61, 0.28, -0.81, 0.05, 0.74, -0.32,
    -0.58, 0.46, 0.93, -0.11, -0.76, 0.22, 0.57, -0.47,
    -0.19, 0.82, 0.14, -0.69, 0.39, 0.68, -0.37
  ];

  function sampleProfile(position) {
    var scaled = position * (edgeProfile.length - 1);
    var index = Math.floor(scaled);
    var nextIndex = Math.min(index + 1, edgeProfile.length - 1);
    var fraction = scaled - index;
    fraction = fraction * fraction * (3 - 2 * fraction);
    return edgeProfile[index] + (edgeProfile[nextIndex] - edgeProfile[index]) * fraction;
  }

  function buildClip(progress, phase, slope) {
    var amplitude = 34 + Math.sin(progress * Math.PI) * 10;
    var travel = -105 + progress * (WIDTH + slope * HEIGHT + 210);
    var points = ["0px 0px"];

    for (var i = 0; i <= SEGMENTS; i++) {
      var y = HEIGHT * i / SEGMENTS;
      var normalizedY = i / SEGMENTS;
      var organic = Math.sin(normalizedY * 17.2 + phase * 2.1) * 0.44;
      organic += Math.sin(normalizedY * 41.0 - phase * 1.35) * 0.21;
      organic += sampleProfile(normalizedY) * 0.42;

      // Algunos dientes mas largos producen la silueta de tinta/sombra de la referencia.
      var lobe = Math.sin(normalizedY * 7.0 * Math.PI + 0.8) * 9;
      var edgeX = travel - slope * y + organic * amplitude + lobe;
      points.push(edgeX.toFixed(2) + "px " + y.toFixed(2) + "px");
    }

    points.push("0px " + HEIGHT + "px");
    return "polygon(" + points.join(",") + ")";
  }

  function apply(target, state, slope) {
    var shape = buildClip(state.progress, state.phase, slope);
    gsap.set(target, {
      clipPath: shape,
      webkitClipPath: shape
    });
  }

  function reveal(target, options) {
    options = options || {};
    var duration = typeof options.duration === "number" ? options.duration : 1;
    var slope = typeof options.slope === "number" ? options.slope : 0;
    var state = { progress: 0, phase: 0 };
    var tl = gsap.timeline();

    apply(target, state, slope);

    tl
      .set(target, {
        autoAlpha: 1,
        filter: slope > 0.15
          ? "drop-shadow(10px 10px 12px rgba(0,0,0,0.78))"
          : "drop-shadow(13px 0 11px rgba(0,0,0,0.82))"
      }, 0)
      .to(state, {
        progress: 1,
        phase: 1.65,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: function () {
          apply(target, state, slope);
        }
      }, 0)
      .set(target, {
        clipPath: "none",
        webkitClipPath: "none",
        filter: "none"
      });

    return tl;
  }

  return {
    reveal: reveal
  };
}());

function introReveal(angleDegrees) {
  var angle = typeof angleDegrees === "number" ? angleDegrees : 35;
  var slope = Math.tan(angle * Math.PI / 180);  
  return OrganicWipe.reveal("#fr1", {
    duration: 0.6,
    slope: slope
  });
}

function frameReveal(angleDegrees) {
  var angle = typeof angleDegrees === "number" ? angleDegrees : 35;
  var slope = Math.tan(angle * Math.PI / 180);

  return OrganicWipe.reveal("#fr2", {
    duration: 0.8,
    slope: slope
  });
}

function ctaReveal() {
  var tl = gsap.timeline();

  gsap.set("#cta", {
    clipPath: "inset(0 100% 0 0)",
    webkitClipPath: "inset(0 100% 0 0)"
  });
  gsap.set("#light", { x: 0, autoAlpha: 0 });

  tl
    .set("#light", { autoAlpha: 1, x: -100, scale: 2 }, 0)
    .to("#light", { x: 500, scale: 0.5, duration: 0.9, ease: "power3.out" }, 0)
    .to("#cta", { clipPath: "inset(0 0% 0 0)", webkitClipPath: "inset(0 0% 0 0)", duration: 0.78, ease: "power3.out" }, 0.05)
    .to("#light", { autoAlpha: 0, duration: 0.22, ease: "power1.out" }, 0.82);

  return tl;
}

function fr1() {


  gsap.set("[id*='txt-1-']", { autoAlpha: 0, y: 0, scale: 2, transformOrigin: "50% 20%" });
  gsap.set("[id*='txt-2-']", { autoAlpha: 0, y: 0, scale: 2, transformOrigin: "50% 50%" });
  gsap.set("[id*='txt-3-']", { autoAlpha: 0, y: 0, scale: 2, transformOrigin: "50% 70%" });
  gsap.set("#fr1, #fr2", { autoAlpha: 1 });

  const tl_ = gsap.timeline();

  tl_
    .add(introReveal(35), 0)
    .from("#transitionCanvas", { duration: 2, scale: 1.2, x: 20, ease: "power2.out" }, "<+0.35")
    .to("[id*='txt-1-']", { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: { each: 0.04,  from: "random",  }, ease: "power3.out" }, "<")
    .add(watercolorAnimation(), "<")
    .add(characterAnimation(), 0)
    .to("[id*='txt-2-']", { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: { each: 0.04,  from: "random",  }, ease: "power3.out" }, "<+0.5")
    .to("[id*='txt-3-']", { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: { each: 0.04,  from: "random",  }, ease: "power3.out" }, "<+0.15")
    .to("#brushes", { clipPath: "circle(75% at 50% 50%)", webkitClipPath: "circle(75% at 50% 50%)", duration: 1.2, ease: "power3.out" }, "<")    

    // ">+0.5" = medio segundo despues de terminar la animacion anterior.
    // Si queres superponerla, podes usar por ejemplo "<+0.2".
    // Primer valor: angulo en grados. 0 = vertical; 35 = similar a la referencia.
    .add(frameReveal(35), "<+1.8")
    .set("#fr1", { autoAlpha: 0 }, ">")
    .from("#wrapCharacter", { duration: 10, scale: 1.2, x: 30, ease: "power2.out" }, "<-1")
    .from("#character2", { duration: 10, scale: 1.2, x: -30, ease: "power2.out" }, "<")

    .from("#sword, #swordShine", { duration: 5, rotation: -10, transformOrigin: "80% 50%", ease: "none" }, "<")
    .from("#swordShine", { duration: 1, autoAlpha: 0, yoyo: true, repeat: -1, transformOrigin: "80% 50%", ease: "none" }, "<")

    .from("#bg2", { duration: 10, scale: 1.2, x: -20, ease: "power2.out" }, "<-1")
    .from("#logo", { duration: 0.35, scale: 1.5, autoAlpha: 0, ease: "power2.out" }, "<+1.65")
    .add(ctaReveal(), "<+0.35")

  return tl_;
}

function characterAnimation() {
  var tl = gsap.timeline();
  var characterEffect = window.CharacterMotionGL;
  var capeEffect = window.CapeWindGL;
  var hairEffect = window.HairWindGL;

  tl
    // Movimiento base compartido: mantiene character y cape registrados.
    .set("#character, #cape, #hair", { transformOrigin: "60% 50%" }, 0)
    .to("#character, #cape, #hair", {
      keyframes: [
        { y: -1.2, scale: 1.0020, duration: 2.7, ease: "sine.out" },
        { y: -0.35, scale: 1.0008, duration: 1.9, ease: "sine.inOut" },
        { y: -1.55, scale: 1.0030, duration: 3.4, ease: "sine.inOut" },
        { y: -0.70, scale: 1.0012, duration: 2.2, ease: "sine.inOut" },
        { y: -1.25, scale: 1.0024, duration: 3.1, ease: "sine.inOut" },
        { y: -0.20, scale: 1.0005, duration: 2.6, ease: "sine.inOut" },
        { y: -1.40, scale: 1.0027, duration: 2.5, ease: "sine.inOut" },
        { y: 0, scale: 1, duration: 1.6, ease: "sine.in" }
      ]
    }, 0);

  if (characterEffect) {
    tl
      .call(characterEffect.reset, null, 0)
      .to(characterEffect.state, { time: 20, duration: 20, ease: "none" }, 0)
      .to(characterEffect.state, { amount: 1, duration: 0.9, ease: "sine.out" }, 0)
      .to(characterEffect.state, { amount: 0, duration: 0.9, ease: "sine.inOut" }, 19.1);
  }

  if (capeEffect) {
    tl
      .call(capeEffect.reset, null, 0)
      // GSAP controla el reloj del shader de tela.
      .to(capeEffect.state, { time: 20, duration: 20, ease: "none" }, 0)
      .to(capeEffect.state, { amount: 1, duration: 0.8, ease: "sine.out" }, 0)
      .to(capeEffect.state, { amount: 0, duration: 0.8, ease: "sine.inOut" }, 19.2);
  }

  if (hairEffect) {
    tl
      .call(hairEffect.reset, null, 0)
      .to(hairEffect.state, { time: 20, duration: 20, ease: "none" }, 0)
      .to(hairEffect.state, { amount: 1, duration: 0.65, ease: "sine.out" }, 0)
      .to(hairEffect.state, { amount: 0, duration: 0.65, ease: "sine.inOut" }, 19.35);
  }

  return tl;
}

function watercolorAnimation() {
  var effect = window.WatercolorPixelShift;
  var state = effect.state;
  var tl = gsap.timeline();

  tl
    .call(effect.reset, null, 0)
    // Este tween es el reloj del shader: al pausar GSAP, el agua tambien se pausa.
    .to(state, { time: 15, duration: 20, ease: "none" }, 0)
    // Entrada, permanencia y salida del efecto dentro de los 15 segundos.
    .to(state, { amount: 1, duration: 0.1, ease: "power2.inOut" }, 0)
    .to(state, { amount: 0, duration: 5, ease: "power2.inOut" }, 11.7);

  return tl;
}

function initAnimations() {
  var effectsReady = [];

  if (window.WatercolorPixelShift) {
    effectsReady.push(window.WatercolorPixelShift.start());
  }

  if (window.CharacterMotionGL) {
    effectsReady.push(window.CharacterMotionGL.start());
  }

  if (window.CapeWindGL) {
    effectsReady.push(window.CapeWindGL.start());
  }

  if (window.HairWindGL) {
    effectsReady.push(window.HairWindGL.start());
  }

  Promise.all(effectsReady).then(function () {
    multitimeline.clear();
    multitimeline.add(fr1(), 0);
    multitimeline.addPause(BANNER_DURATION, function () {
      if (window.FireParticles) {
        window.FireParticles.stop();
      }
    });

    if (window.FireParticles) {
      window.FireParticles.reset();
      window.FireParticles.start();
    }

    multitimeline.play(0);
  });
}

//HANDLERS
function initHandlers() {
  var clicktag = document.getElementById("clickTag");

  clicktag.addEventListener("mouseup", function (event) {
    window.open(window.clickTag, "_blank");
  });

  clicktag.addEventListener("mouseenter", function (e) {
    a.enter();
  });

  clicktag.addEventListener("mouseleave", function (e) {
    a.leave();
  });

  var a = {
    enter: function () {
      gsap.killTweensOf("#cta", "scale,rotation");
      gsap.killTweensOf("#ctaGlow");
      gsap.to("#cta", {
        duration: 0.25,
        scale: 1.08,
        rotation: 0,
        transformOrigin: "50% 50%",
        ease: "power3.out"
      });
      gsap.to("#ctaGlow", {
        duration: 0.25,
        autoAlpha: 1,
        ease: "power2.out"
      });
    },
    leave: function () {
      gsap.killTweensOf("#cta", "scale,rotation");
      gsap.killTweensOf("#ctaGlow");
      gsap.to("#cta", {
        duration: 0.3,
        scale: 1,
        rotation: 0.01,
        ease: "power2.out"
      });
      gsap.to("#ctaGlow", {
        duration: 0.45,
        autoAlpha: 0,
        ease: "power2.out"
      });
    }
  };
}

var WebGLUtils = (function () {
  function loadImage(source) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.onload = function () { resolve(image); };
      image.onerror = function () {
        reject(new Error("No se pudo cargar " + source));
      };
      image.src = source;
    });
  }

  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  function createProgram(gl, vertexSource, fragmentSource) {
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return null;

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  return {
    loadImage: loadImage,
    createProgram: createProgram,
    clamp: clamp
  };
}());





/*
 * Efecto WebGL independiente.
 * Una sola imagen se realimenta entre cuadros para simular pigmento humedo.
 */
(function (window, document) {
  "use strict";

  var WIDTH = 300;
  var HEIGHT = 250;
  var IMAGE_SOURCE = "images/bg1.jpg";
  var settings = window.WATERCOLOR_SETTINGS || {};

  // 0 = pigmento nitido / 1 = estelas mas difusas.
  if (typeof settings.blur !== "number") settings.blur = 0.35;
  window.WATERCOLOR_SETTINGS = settings;

  var canvas = document.getElementById("transitionCanvas");
  var animationFrame = 0;
  var resumeDrawing = null;
  var readyPromise = null;
  var resetRequested = true;
  var state = {
    amount: 0,
    time: 0
  };

  function start() {
    if (readyPromise) return readyPromise;
    if (!canvas) return Promise.resolve();

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      canvas.style.display = "none";
      readyPromise = Promise.resolve();
      return readyPromise;
    }

    readyPromise = WebGLUtils.loadImage(IMAGE_SOURCE)
      .then(startWebGL)
      .catch(function (error) {
        console.error(error);
        canvas.style.display = "none";
      });

    return readyPromise;
  }

  function reset() {
    state.amount = 0;
    state.time = 0;
    resetRequested = true;
    if (resumeDrawing) resumeDrawing();
  }

  function startWebGL(image) {
    var gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power"
    });

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    var vertexSource = [
      "attribute vec2 a_position;",
      "varying vec2 v_uv;",
      "void main() {",
      "  v_uv = a_position * 0.5 + 0.5;",
      "  gl_Position = vec4(a_position, 0.0, 1.0);",
      "}"
    ].join("\n");

    var copyFragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_source;",
      "varying vec2 v_uv;",
      "void main() {",
      "  gl_FragColor = texture2D(u_source, v_uv);",
      "}"
    ].join("\n");

    var feedbackFragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_previous;",
      "uniform sampler2D u_source;",
      "uniform float u_amount;",
      "uniform float u_blur;",
      "uniform float u_time;",
      "uniform float u_delta;",
      "varying vec2 v_uv;",
      "float hash(vec2 p) {",
      "  p = fract(p * vec2(123.34, 345.45));",
      "  p += dot(p, p + 34.345);",
      "  return fract(p.x * p.y);",
      "}",
      "float noise(vec2 p) {",
      "  vec2 i = floor(p);",
      "  vec2 f = fract(p);",
      "  f = f * f * (3.0 - 2.0 * f);",
      "  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),",
      "             mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);",
      "}",
      "float fbm(vec2 p) {",
      "  float value = 0.0;",
      "  float amplitude = 0.5;",
      "  for (int i = 0; i < 5; i++) {",
      "    value += noise(p) * amplitude;",
      "    p = p * 2.03 + vec2(13.7, 8.3);",
      "    amplitude *= 0.5;",
      "  }",
      "  return value;",
      "}",
      "void main() {",
      "  vec2 uv = v_uv;",
      "  vec2 fieldUv = vec2(uv.x * 1.7, uv.y * 3.4);",
      "  float drift = u_time * 0.14;",
      "  vec2 domain = vec2(",
      "    fbm(fieldUv * 0.7 + vec2(drift, -drift * 0.38)),",
      "    fbm(fieldUv * 0.7 + vec2(7.4 - drift * 0.3, 4.1 + drift))",
      "  );",
      "  vec2 warped = fieldUv + (domain - 0.5) * 1.28",
      "              + vec2(-drift * 0.42, drift * 0.64);",
      "  float field = fbm(warped);",
      "  float fieldX = fbm(warped + vec2(0.045, 0.0));",
      "  float fieldY = fbm(warped + vec2(0.0, 0.045));",
      "  vec2 gradient = vec2(fieldX - field, fieldY - field) / 0.045;",
      "  vec2 curl = vec2(gradient.y, -gradient.x);",
      "  vec2 current = curl * 0.78 + (domain - 0.5) * 0.88 + vec2(-0.26, 0.44);",
      "  vec2 direction = normalize(current + vec2(0.001));",
      "  vec3 sourceColor = texture2D(u_source, uv).rgb;",
      "  float darkness = 1.0 - dot(sourceColor, vec3(0.2126, 0.7152, 0.0722));",
      "  float streaks = fbm(vec2(warped.x * 0.72 + warped.y * 0.2, warped.y * 1.48)",
      "                    - vec2(drift * 0.22, drift));",
      "  float speed = (0.02 + streaks * 0.038) * mix(0.84, 1.24, darkness);",
      "  vec2 travel = direction * speed * u_delta * u_amount;",
      "  vec2 previousUv = clamp(uv - travel, 0.002, 0.998);",
      "  vec2 tangent = vec2(-direction.y, direction.x);",
      "  float strokeLength = (0.001 + streaks * 0.0032) * u_amount * u_blur;",
      "  vec3 pigment = texture2D(u_previous, previousUv).rgb;",
      "  vec3 pigmentAhead = texture2D(u_previous, clamp(previousUv + tangent * strokeLength, 0.002, 0.998)).rgb;",
      "  vec3 pigmentBehind = texture2D(u_previous, clamp(previousUv - direction * strokeLength * 1.45, 0.002, 0.998)).rgb;",
      "  float drag = smoothstep(0.34, 0.78, streaks);",
      "  vec3 smearedPigment = mix(pigmentAhead, pigmentBehind, 0.58);",
      "  float blurAmount = u_blur * (0.045 + drag * 0.018);",
      "  vec3 liquid = mix(pigment, smearedPigment, blurAmount);",
      "  float wetRecovery = mix(0.004, 0.0015, u_blur);",
      "  float recovery = mix(0.022, wetRecovery, u_amount);",
      "  liquid = mix(liquid, sourceColor, recovery);",
      "  gl_FragColor = vec4(liquid, 1.0);",
      "}"
    ].join("\n");

    var displayFragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_source;",
      "uniform sampler2D u_liquid;",
      "uniform float u_amount;",
      "varying vec2 v_uv;",
      "void main() {",
      "  vec3 sourceColor = texture2D(u_source, v_uv).rgb;",
      "  vec3 liquidColor = texture2D(u_liquid, v_uv).rgb;",
      "  float luma = dot(liquidColor, vec3(0.2126, 0.7152, 0.0722));",
      "  liquidColor = mix(vec3(luma), liquidColor, 1.035);",
      "  float blend = smoothstep(0.0, 1.0, u_amount);",
      "  gl_FragColor = vec4(mix(sourceColor, liquidColor, blend), 1.0);",
      "}"
    ].join("\n");

    var copyProgram = WebGLUtils.createProgram(gl, vertexSource, copyFragmentSource);
    var feedbackProgram = WebGLUtils.createProgram(gl, vertexSource, feedbackFragmentSource);
    var displayProgram = WebGLUtils.createProgram(gl, vertexSource, displayFragmentSource);

    if (!copyProgram || !feedbackProgram || !displayProgram) {
      canvas.style.display = "none";
      return;
    }

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    var sourceTexture = createImageTexture(gl, image);
    var targets = [
      createRenderTarget(gl, WIDTH, HEIGHT),
      createRenderTarget(gl, WIDTH, HEIGHT)
    ];

    if (!targets[0] || !targets[1]) {
      canvas.style.display = "none";
      return;
    }

    var copySourceLocation = gl.getUniformLocation(copyProgram, "u_source");
    var previousLocation = gl.getUniformLocation(feedbackProgram, "u_previous");
    var feedbackSourceLocation = gl.getUniformLocation(feedbackProgram, "u_source");
    var feedbackAmountLocation = gl.getUniformLocation(feedbackProgram, "u_amount");
    var blurLocation = gl.getUniformLocation(feedbackProgram, "u_blur");
    var timeLocation = gl.getUniformLocation(feedbackProgram, "u_time");
    var deltaLocation = gl.getUniformLocation(feedbackProgram, "u_delta");
    var displaySourceLocation = gl.getUniformLocation(displayProgram, "u_source");
    var liquidLocation = gl.getUniformLocation(displayProgram, "u_liquid");
    var displayAmountLocation = gl.getUniformLocation(displayProgram, "u_amount");

    function fillTarget(target) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.viewport(0, 0, WIDTH, HEIGHT);
      gl.useProgram(copyProgram);
      bindPosition(gl, copyProgram, positionBuffer);
      bindTexture(gl, sourceTexture, 0);
      gl.uniform1i(copySourceLocation, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function resetPigment() {
      fillTarget(targets[0]);
      fillTarget(targets[1]);
    }

    resetPigment();
    resetRequested = false;

    var readIndex = 0;
    var previousEffectTime = state.time;

    function draw() {
      animationFrame = 0;
      var amount = WebGLUtils.clamp(state.amount, 0, 1);
      var effectTime = Math.max(0, state.time);
      var delta = effectTime - previousEffectTime;
      var writeIndex = 1 - readIndex;

      if (resetRequested || delta < 0) {
        resetPigment();
        resetRequested = false;
        readIndex = 0;
        writeIndex = 1;
        delta = 0;
      }

      if (delta > 0 && amount > 0) {
        delta = Math.min(0.05, delta);

        gl.bindFramebuffer(gl.FRAMEBUFFER, targets[writeIndex].framebuffer);
        gl.viewport(0, 0, WIDTH, HEIGHT);
        gl.useProgram(feedbackProgram);
        bindPosition(gl, feedbackProgram, positionBuffer);
        bindTexture(gl, sourceTexture, 0);
        bindTexture(gl, targets[readIndex].texture, 1);
        gl.uniform1i(feedbackSourceLocation, 0);
        gl.uniform1i(previousLocation, 1);
        gl.uniform1f(feedbackAmountLocation, amount);
        gl.uniform1f(blurLocation, WebGLUtils.clamp(settings.blur, 0, 1));
        gl.uniform1f(timeLocation, effectTime);
        gl.uniform1f(deltaLocation, delta);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        readIndex = writeIndex;
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(displayProgram);
      bindPosition(gl, displayProgram, positionBuffer);
      bindTexture(gl, sourceTexture, 0);
      bindTexture(gl, targets[readIndex].texture, 1);
      gl.uniform1i(displaySourceLocation, 0);
      gl.uniform1i(liquidLocation, 1);
      gl.uniform1f(displayAmountLocation, amount);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      previousEffectTime = effectTime;
      if (effectTime >= 15 && amount <= 0.001) return;
      animationFrame = requestAnimationFrame(draw);
    }

    resumeDrawing = function () {
      if (!animationFrame) animationFrame = requestAnimationFrame(draw);
    };

    canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resumeDrawing = null;
      canvas.style.display = "none";
    }, false);

    resumeDrawing();
  }

  function bindPosition(gl, program, buffer) {
    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  }

  function bindTexture(gl, texture, unit) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  }

  function setTextureParameters(gl) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  }

  function createImageTexture(gl, image) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    setTextureParameters(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return texture;
  }

  function createRenderTarget(gl, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    setTextureParameters(gl);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    var framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );

    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
      return null;
    }

    return {
      texture: texture,
      framebuffer: framebuffer
    };
  }

  window.WatercolorPixelShift = {
    start: start,
    reset: reset,
    state: state
  };
}(window, document));

/* Respiracion y brazo del personaje, controlados por characterAnimation(). */
(function (window, document) {
  "use strict";

  var IMAGE_SOURCE = "images/character1.png";
  var settings = window.CHARACTER_MOTION_SETTINGS || {};
  if (typeof settings.breath !== "number") settings.breath = 0.75;
  if (typeof settings.arm !== "number") settings.arm = 0.45;
  if (typeof settings.speed !== "number") settings.speed = 1;
  window.CHARACTER_MOTION_SETTINGS = settings;

  var canvas = document.getElementById("characterCanvas");
  var fallback = document.getElementById("characterFallback");
  var animationFrame = 0;
  var resumeDrawing = null;
  var readyPromise = null;
  var state = {
    amount: 0,
    time: 0
  };

  function start() {
    if (readyPromise) return readyPromise;
    if (!canvas) return Promise.resolve();

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      canvas.style.display = "none";
      readyPromise = Promise.resolve();
      return readyPromise;
    }

    readyPromise = WebGLUtils.loadImage(IMAGE_SOURCE)
      .then(startWebGL)
      .catch(function (error) {
        console.error(error);
        canvas.style.display = "none";
        if (fallback) fallback.style.visibility = "visible";
      });

    return readyPromise;
  }

  function reset() {
    state.amount = 0;
    state.time = 0;
    if (resumeDrawing) resumeDrawing();
  }

  function startWebGL(image) {
    var gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power"
    });

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    var vertexSource = [
      "attribute vec2 a_position;",
      "varying vec2 v_uv;",
      "void main() {",
      "  v_uv = a_position * 0.5 + 0.5;",
      "  gl_Position = vec4(a_position, 0.0, 1.0);",
      "}"
    ].join("\n");

    var fragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_character;",
      "uniform float u_time;",
      "uniform float u_amount;",
      "uniform float u_breath;",
      "uniform float u_arm;",
      "varying vec2 v_uv;",
      "float hash1(float value) {",
      "  return fract(sin(value * 127.1) * 43758.5453);",
      "}",
      "float noise1(float value) {",
      "  float base = floor(value);",
      "  float fraction = fract(value);",
      "  fraction = fraction * fraction * (3.0 - 2.0 * fraction);",
      "  return mix(hash1(base), hash1(base + 1.0), fraction);",
      "}",
      "float ellipseMask(vec2 point, vec2 center, vec2 radius) {",
      "  float d = length((point - center) / radius);",
      "  return 1.0 - smoothstep(0.68, 1.12, d);",
      "}",
      "float capsuleMask(vec2 point, vec2 startPoint, vec2 endPoint, float radius) {",
      "  vec2 segment = endPoint - startPoint;",
      "  vec2 relative = point - startPoint;",
      "  float along = clamp(dot(relative, segment) / dot(segment, segment), 0.0, 1.0);",
      "  float d = length(relative - segment * along);",
      "  return 1.0 - smoothstep(radius * 0.68, radius, d);",
      "}",
      "void main() {",
      "  vec2 uv = v_uv;",
      "  float slowVariation = noise1(u_time * 0.16 + 11.3);",
      "  float breathWave = sin(u_time * (0.98 + slowVariation * 0.22));",
      "  breathWave += sin(u_time * 0.47 + 1.7) * 0.16;",
      "  breathWave += sin(u_time * 2.15 + slowVariation * 3.1) * 0.10;",
      "  breathWave *= 0.78;",
      "  vec2 chestCenter = vec2(0.54, 0.47);",
      "  float chestMask = ellipseMask(uv, chestCenter, vec2(0.17, 0.235));",
      "  chestMask *= smoothstep(0.23, 0.34, uv.y);",
      "  chestMask *= 1.0 - smoothstep(0.67, 0.73, uv.y);",
      "  float chestAmount = breathWave * 0.014 * u_breath * u_amount;",
      "  vec2 chestUv = uv;",
      "  chestUv.x = chestCenter.x + (uv.x - chestCenter.x) / (1.0 + chestAmount);",
      "  chestUv.y -= breathWave * 0.0034 * u_breath * u_amount;",
      "  vec2 sampleUv = mix(uv, chestUv, chestMask);",
      // El brazo rota apenas desde el codo; las mascaras suaves esconden la union.
      "  vec2 elbow = vec2(0.515, 0.455);",
      "  float upperArm = capsuleMask(uv, vec2(0.49, 0.62), elbow, 0.105);",
      "  float forearm = capsuleMask(uv, elbow, vec2(0.80, 0.57), 0.112);",
      "  float armMask = max(upperArm * 0.42, forearm);",
      "  float armVariation = noise1(u_time * 0.38 + 28.6) - 0.5;",
      "  float armMicroMove = noise1(u_time * 0.91 + 43.2) - 0.5;",
      "  float armAngle = (breathWave * 0.68 + armVariation * 0.55 + armMicroMove * 0.16)",
      "                   * 0.016 * u_arm * u_amount;",
      "  float cosine = cos(-armAngle);",
      "  float sine = sin(-armAngle);",
      "  vec2 armRelative = uv - elbow;",
      "  vec2 armUv = elbow + vec2(",
      "    cosine * armRelative.x - sine * armRelative.y,",
      "    sine * armRelative.x + cosine * armRelative.y",
      "  );",
      "  armUv.y -= breathWave * 0.0026 * upperArm * u_breath * u_amount;",
      "  sampleUv = mix(sampleUv, armUv, armMask);",
      // La espada acompana la flexion como una pieza rigida, con menor angulo que el brazo.
      "  float bladeMask = capsuleMask(uv, vec2(0.105, 0.915), vec2(0.79, 0.565), 0.035);",
      "  float gripMask = capsuleMask(uv, vec2(0.79, 0.565), vec2(0.995, 0.455), 0.052);",
      "  float swordMask = max(bladeMask, gripMask);",
      "  float swordAngle = armAngle * 0.86;",
      "  float swordCosine = cos(-swordAngle);",
      "  float swordSine = sin(-swordAngle);",
      "  vec2 swordRelative = uv - elbow;",
      "  vec2 swordUv = elbow + vec2(",
      "    swordCosine * swordRelative.x - swordSine * swordRelative.y,",
      "    swordSine * swordRelative.x + swordCosine * swordRelative.y",
      "  );",
      "  sampleUv = mix(sampleUv, swordUv, swordMask);",
      "  sampleUv = clamp(sampleUv, 0.001, 0.999);",
      "  gl_FragColor = texture2D(u_character, sampleUv);",
      "}"
    ].join("\n");

    var program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
    if (!program) {
      canvas.style.display = "none";
      return;
    }

    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    var characterLocation = gl.getUniformLocation(program, "u_character");
    var timeLocation = gl.getUniformLocation(program, "u_time");
    var amountLocation = gl.getUniformLocation(program, "u_amount");
    var breathLocation = gl.getUniformLocation(program, "u_breath");
    var armLocation = gl.getUniformLocation(program, "u_arm");
    gl.uniform1i(characterLocation, 0);

    canvas.style.display = "block";
    if (fallback) fallback.style.visibility = "hidden";

    function draw() {
      animationFrame = 0;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, Math.max(0, state.time) * WebGLUtils.clamp(settings.speed, 0.1, 3));
      gl.uniform1f(amountLocation, WebGLUtils.clamp(state.amount, 0, 1));
      gl.uniform1f(breathLocation, WebGLUtils.clamp(settings.breath, 0, 1.5));
      gl.uniform1f(armLocation, WebGLUtils.clamp(settings.arm, 0, 1.5));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (state.time >= 20 && state.amount <= 0.001) return;
      animationFrame = requestAnimationFrame(draw);
    }

    resumeDrawing = function () {
      if (!animationFrame) animationFrame = requestAnimationFrame(draw);
    };

    canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resumeDrawing = null;
      canvas.style.display = "none";
      if (fallback) fallback.style.visibility = "visible";
    }, false);

    resumeDrawing();
  }

  window.CharacterMotionGL = {
    start: start,
    reset: reset,
    state: state
  };
}(window, document));

/* Pelo WebGL, controlado por characterAnimation(). */
(function (window, document) {
  "use strict";

  var IMAGE_SOURCE = "images/hair.png";
  var settings = window.HAIR_WIND_SETTINGS || {};
  if (typeof settings.strength !== "number") settings.strength = 0.65;
  if (typeof settings.speed !== "number") settings.speed = 1;
  if (typeof settings.frontStrength !== "number") settings.frontStrength = 2.4;
  if (typeof settings.backStrength !== "number") settings.backStrength = 2.4;
  if (typeof settings.topStrength !== "number") settings.topStrength = 1.65;
  if (typeof settings.edgeStrength !== "number") settings.edgeStrength = 1.9;
  window.HAIR_WIND_SETTINGS = settings;

  var canvas = document.getElementById("hairCanvas");
  var fallback = document.getElementById("hairFallback");
  var animationFrame = 0;
  var resumeDrawing = null;
  var readyPromise = null;
  var state = {
    amount: 0,
    time: 0
  };

  function start() {
    if (readyPromise) return readyPromise;
    if (!canvas) return Promise.resolve();

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      canvas.style.display = "none";
      readyPromise = Promise.resolve();
      return readyPromise;
    }

    readyPromise = WebGLUtils.loadImage(IMAGE_SOURCE)
      .then(startWebGL)
      .catch(function (error) {
        console.error(error);
        canvas.style.display = "none";
        if (fallback) fallback.style.visibility = "visible";
      });

    return readyPromise;
  }

  function reset() {
    state.amount = 0;
    state.time = 0;
    if (resumeDrawing) resumeDrawing();
  }

  function startWebGL(image) {
    var gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power"
    });

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    var vertexSource = [
      "attribute vec2 a_position;",
      "varying vec2 v_uv;",
      "void main() {",
      "  v_uv = a_position * 0.5 + 0.5;",
      "  gl_Position = vec4(a_position, 0.0, 1.0);",
      "}"
    ].join("\n");

    var fragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_hair;",
      "uniform float u_time;",
      "uniform float u_amount;",
      "uniform float u_strength;",
      "uniform float u_front_strength;",
      "uniform float u_back_strength;",
      "uniform float u_top_strength;",
      "uniform float u_edge_strength;",
      "varying vec2 v_uv;",
      "float hash1(float value) {",
      "  return fract(sin(value * 127.1) * 43758.5453);",
      "}",
      "float noise1(float value) {",
      "  float base = floor(value);",
      "  float fraction = fract(value);",
      "  fraction = fraction * fraction * (3.0 - 2.0 * fraction);",
      "  return mix(hash1(base), hash1(base + 1.0), fraction);",
      "}",
      "float ellipseMask(vec2 point, vec2 center, vec2 radius) {",
      "  float distanceToCenter = length((point - center) / radius);",
      "  return 1.0 - smoothstep(0.78, 1.18, distanceToCenter);",
      "}",
      "void main() {",
      "  vec2 uv = v_uv;",
      // hair2.png contiene solo las piezas moviles: cada una tiene su propia raiz.
      "  vec2 anchor = vec2(0.64, 0.88);",
      "  vec2 fromAnchor = uv - anchor;",
      "  float rearRelease = smoothstep(0.018, 0.17, distance(uv, vec2(0.60, 0.95)));",
      "  float topRelease = smoothstep(0.025, 0.115, uv.y - 0.865);",
      "  float frontRelease = smoothstep(0.015, 0.125, distance(uv, vec2(0.655, 0.89)));",
      "  float edgeRelease = smoothstep(0.015, 0.115, distance(uv, vec2(0.735, 0.89)));",
      "  float sweptHair = ellipseMask(uv, vec2(0.55, 0.885), vec2(0.105, 0.14)) * rearRelease;",
      "  float sideLock = ellipseMask(uv, vec2(0.49, 0.815), vec2(0.06, 0.075)) * rearRelease;",
      "  float crownTuft = ellipseMask(uv, vec2(0.68, 0.925), vec2(0.105, 0.075)) * topRelease;",
      "  float frontLock = ellipseMask(uv, vec2(0.655, 0.835), vec2(0.05, 0.08)) * frontRelease;",
      "  float rightEdge = ellipseMask(uv, vec2(0.748, 0.825), vec2(0.038, 0.08)) * edgeRelease;",
      "  float rearStrands = max(sweptHair, sideLock);",
      "  float frontStrands = frontLock;",
      // Doble liberacion: la base queda pegada y el movimiento crece hacia las puntas.
      "  float topStrands = crownTuft * topRelease;",
      "  float edgeStrands = rightEdge;",
      "  float animatedZones = max(rearStrands, max(topStrands, max(frontStrands, edgeStrands)));",
      "  float reach = max(rearRelease, max(topRelease, max(frontRelease, edgeRelease)));",
      "  float influence = animatedZones * (0.34 + reach * 0.86) * u_amount * u_strength;",
      "  float zoneBoost = 1.0",
      "                  + rearStrands * (u_back_strength - 1.0)",
      "                  + frontStrands * (u_front_strength - 1.0)",
      "                  + topStrands * (u_top_strength - 1.0)",
      "                  + edgeStrands * (u_edge_strength - 1.0);",
      "  zoneBoost = min(zoneBoost, 2.3);",
      "  float slowWind = noise1(u_time * 0.18 + 2.4);",
      "  float quickWind = noise1(u_time * 0.67 + 18.2);",
      "  float gustEnvelope = smoothstep(0.43, 0.82, slowWind);",
      // Mismo campo de viento que CapeWindGL: misma rafaga y ondas espaciales.
      "  float capeGust = sin(u_time * 0.58) * 0.5 + sin(u_time * 1.13 + 1.7) * 0.25;",
      "  float capeWaveA = sin(uv.y * 12.0 + uv.x * 4.5 - u_time * 1.35);",
      "  float capeWaveB = sin(uv.y * 23.0 - uv.x * 8.0 + u_time * 0.82);",
      "  float capeFold = sin((uv.x + uv.y) * 19.0 - u_time * 1.7);",
      // Turbulencia interpolada: evita el regreso simetrico propio de una senoide.
      "  float rearFlutter = noise1(u_time * 0.48 + uv.y * 5.7 - uv.x * 2.3 + 32.8) * 2.0 - 1.0;",
      "  float frontFlutter = noise1(u_time * 0.73 + uv.y * 7.1 + uv.x * 3.4 + 71.6) * 2.0 - 1.0;",
      "  float topFlutter = noise1(u_time * 0.61 + uv.x * 7.2 + uv.y * 2.1 + 54.7) * 2.0 - 1.0;",
      "  float edgeFlutter = noise1(u_time * 0.56 + uv.y * 8.3 - uv.x * 2.0 + 91.4) * 2.0 - 1.0;",
      "  float tailFlutter = noise1(u_time * 0.69 + uv.y * 6.6 + uv.x * 2.8 + 116.2) * 2.0 - 1.0;",
      "  vec2 offset = vec2(0.0);",
      "  offset.x = capeWaveA * 0.006 + capeWaveB * 0.0035 + capeGust * 0.006;",
      "  offset.y = capeWaveA * 0.0026 + capeFold * 0.0018 + capeWaveB * 0.0028;",
      "  offset += vec2(-fromAnchor.y, fromAnchor.x) * capeGust * 0.020;",
      "  offset += fromAnchor * capeWaveB * 0.007 * reach;",
      "  offset *= influence * max(zoneBoost, 0.15);",
      // Las puntas reciben una segunda oscilacion; la raiz sigue sujeta al cuero cabelludo.
      "  float strandRelease = reach;",
      "  float rearPulse = 0.35 + slowWind * 0.65 + rearFlutter * 0.22;",
      "  float frontPulse = 0.30 + quickWind * 0.55 + frontFlutter * 0.28;",
      "  float topPulse = 0.28 + slowWind * 0.68 + topFlutter * 0.24;",
      "  float edgePulse = 0.30 + slowWind * 0.58 + edgeFlutter * 0.25;",
      "  float tailPulse = 0.32 + slowWind * 0.68 + tailFlutter * 0.26;",
      "  vec2 regionalFlutter = vec2(",
      // Frente avanza; masa y colita traseras viajan en el sentido opuesto.
      "    frontStrands * frontPulse * 0.0070 * u_front_strength",
      "      - sweptHair * rearPulse * 0.0040 * u_back_strength",
      "      - sideLock * tailPulse * 0.0065 * u_back_strength",
      "      + topStrands * (topPulse * 0.0024 + topFlutter * 0.0011) * u_top_strength",
      "      + edgeStrands * edgePulse * 0.0045 * u_edge_strength,",
      // La corona tiene una elevacion sostenida y los mechones agregan turbulencia vertical.
      "    topStrands * (0.0005 + (topPulse - 0.45) * 0.0030 + topFlutter * 0.0013) * u_top_strength",
      "      + frontStrands * (frontPulse * 0.0018 + frontFlutter * 0.0018) * u_front_strength",
      "      + sideLock * (tailPulse * 0.0015 + tailFlutter * 0.0020) * u_back_strength",
      "      + sweptHair * rearFlutter * 0.0014 * u_back_strength",
      "      + edgeStrands * edgeFlutter * 0.0018 * u_edge_strength",
      "  );",
      "  offset += regionalFlutter * strandRelease * u_amount * u_strength",
      "            * (0.6 + gustEnvelope * 0.75);",
      "  vec2 sampleUv = clamp(uv - offset, 0.001, 0.999);",
      "  gl_FragColor = texture2D(u_hair, sampleUv);",
      "}"
    ].join("\n");

    var program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
    if (!program) {
      canvas.style.display = "none";
      return;
    }

    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    var hairLocation = gl.getUniformLocation(program, "u_hair");
    var timeLocation = gl.getUniformLocation(program, "u_time");
    var amountLocation = gl.getUniformLocation(program, "u_amount");
    var strengthLocation = gl.getUniformLocation(program, "u_strength");
    var frontStrengthLocation = gl.getUniformLocation(program, "u_front_strength");
    var backStrengthLocation = gl.getUniformLocation(program, "u_back_strength");
    var topStrengthLocation = gl.getUniformLocation(program, "u_top_strength");
    var edgeStrengthLocation = gl.getUniformLocation(program, "u_edge_strength");
    gl.uniform1i(hairLocation, 0);

    canvas.style.display = "block";
    if (fallback) fallback.style.visibility = "hidden";

    function draw() {
      animationFrame = 0;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, Math.max(0, state.time) * WebGLUtils.clamp(settings.speed, 0.1, 3));
      gl.uniform1f(amountLocation, WebGLUtils.clamp(state.amount, 0, 1));
      gl.uniform1f(strengthLocation, WebGLUtils.clamp(settings.strength, 0, 1.5));
      gl.uniform1f(frontStrengthLocation, WebGLUtils.clamp(settings.frontStrength, 0.5, 2.4));
      gl.uniform1f(backStrengthLocation, WebGLUtils.clamp(settings.backStrength, 0.5, 2.4));
      gl.uniform1f(topStrengthLocation, WebGLUtils.clamp(settings.topStrength, 0.5, 2.4));
      gl.uniform1f(edgeStrengthLocation, WebGLUtils.clamp(settings.edgeStrength, 0.5, 2.4));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (state.time >= 20 && state.amount <= 0.001) return;
      animationFrame = requestAnimationFrame(draw);
    }

    resumeDrawing = function () {
      if (!animationFrame) animationFrame = requestAnimationFrame(draw);
    };

    canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resumeDrawing = null;
      canvas.style.display = "none";
      if (fallback) fallback.style.visibility = "visible";
    }, false);

    resumeDrawing();
  }

  window.HairWindGL = {
    start: start,
    reset: reset,
    state: state
  };
}(window, document));

/* Capa de tela WebGL, controlada por characterAnimation(). */
(function (window, document) {
  "use strict";

  var IMAGE_SOURCE = "images/cape.png";
  var settings = window.CAPE_WIND_SETTINGS || {};
  if (typeof settings.strength !== "number") settings.strength = 1.5;
  if (typeof settings.speed !== "number") settings.speed = 3;
  window.CAPE_WIND_SETTINGS = settings;

  var canvas = document.getElementById("capeCanvas");
  var fallback = document.getElementById("capeFallback");
  var animationFrame = 0;
  var resumeDrawing = null;
  var readyPromise = null;
  var state = {
    amount: 0,
    time: 0
  };

  function start() {
    if (readyPromise) return readyPromise;
    if (!canvas) return Promise.resolve();

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      canvas.style.display = "none";
      readyPromise = Promise.resolve();
      return readyPromise;
    }

    readyPromise = WebGLUtils.loadImage(IMAGE_SOURCE)
      .then(startWebGL)
      .catch(function (error) {
        console.error(error);
        canvas.style.display = "none";
        if (fallback) fallback.style.visibility = "visible";
      });

    return readyPromise;
  }

  function reset() {
    state.amount = 0;
    state.time = 0;
    if (resumeDrawing) resumeDrawing();
  }

  function startWebGL(image) {
    var gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power"
    });

    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    var vertexSource = [
      "attribute vec2 a_position;",
      "varying vec2 v_uv;",
      "void main() {",
      "  v_uv = a_position * 0.5 + 0.5;",
      "  gl_Position = vec4(a_position, 0.0, 1.0);",
      "}"
    ].join("\n");

    var fragmentSource = [
      "precision mediump float;",
      "uniform sampler2D u_cape;",
      "uniform float u_time;",
      "uniform float u_amount;",
      "uniform float u_strength;",
      "varying vec2 v_uv;",
      "void main() {",
      "  vec2 uv = v_uv;",
      // En coordenadas WebGL, 34% desde arriba equivale a 66% desde abajo.
      "  vec2 anchor = vec2(0.41, 0.66);",
      "  vec2 fromAnchor = uv - anchor;",
      "  float distanceFromAnchor = length(fromAnchor * vec2(0.86, 0.72));",
      "  float pin = smoothstep(0.003, 0.09, distanceFromAnchor);",
      "  float reach = smoothstep(0.02, 0.55, distanceFromAnchor);",
      "  float influence = pin * (0.45 + reach * 0.75) * u_amount * u_strength;",
      "  float gust = sin(u_time * 0.58) * 0.5 + sin(u_time * 1.13 + 1.7) * 0.25;",
      "  float waveA = sin(uv.y * 12.0 + uv.x * 4.5 - u_time * 1.35);",
      "  float waveB = sin(uv.y * 23.0 - uv.x * 8.0 + u_time * 0.82);",
      "  float fold = sin((uv.x + uv.y) * 19.0 - u_time * 1.7);",
      "  vec2 offset = vec2(0.0);",
      "  offset.x = waveA * 0.01 + waveB * 0.006 + gust * 0.008;",
      "  offset.y = waveA * 0.0048 + fold * 0.0035 + waveB * 0.005;",
      "  offset += vec2(-fromAnchor.y, fromAnchor.x) * gust * 0.032;",
      "  offset += fromAnchor * waveB * 0.012 * reach;",
      "  offset *= influence;",
      "  vec2 sampleUv = clamp(uv - offset, 0.001, 0.999);",
      "  gl_FragColor = texture2D(u_cape, sampleUv);",
      "}"
    ].join("\n");

    var program = WebGLUtils.createProgram(gl, vertexSource, fragmentSource);
    if (!program) {
      canvas.style.display = "none";
      return;
    }

    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.useProgram(program);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    var capeLocation = gl.getUniformLocation(program, "u_cape");
    var timeLocation = gl.getUniformLocation(program, "u_time");
    var amountLocation = gl.getUniformLocation(program, "u_amount");
    var strengthLocation = gl.getUniformLocation(program, "u_strength");
    gl.uniform1i(capeLocation, 0);

    canvas.style.display = "block";
    if (fallback) fallback.style.visibility = "hidden";

    function draw() {
      animationFrame = 0;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLocation, Math.max(0, state.time) * WebGLUtils.clamp(settings.speed, 0.1, 3));
      gl.uniform1f(amountLocation, WebGLUtils.clamp(state.amount, 0, 1));
      gl.uniform1f(strengthLocation, WebGLUtils.clamp(settings.strength, 0, 1.5));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (state.time >= 20 && state.amount <= 0.001) return;
      animationFrame = requestAnimationFrame(draw);
    }

    resumeDrawing = function () {
      if (!animationFrame) animationFrame = requestAnimationFrame(draw);
    };

    canvas.addEventListener("webglcontextlost", function (event) {
      event.preventDefault();
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      resumeDrawing = null;
      canvas.style.display = "none";
      if (fallback) fallback.style.visibility = "visible";
    }, false);

    resumeDrawing();
  }

  window.CapeWindGL = {
    start: start,
    reset: reset,
    state: state
  };
}(window, document));



(function (window, document) {
  "use strict";

  var canvas = document.querySelector("#fireCanvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var particlesArray = [];
  var animationFrame = null;
  var running = false;

  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function Particle() {
    this.x = Math.random() * canvas.width - 300;
    this.y = canvas.height + 0;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 + 8;
    this.speedY = Math.random() * -10 - 1;
    this.color = "rgb(255,50,0)";
  }

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) {
      this.size -= 0.05;
    }
  };

  Particle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function handleParticles() {
    particlesArray.push(new Particle());

    for (var i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      if (particlesArray[i].size <= 0.2) {
        particlesArray.splice(i, 1);
        i--;
      }
    }
  }

  function animate() {
    if (!running) return;

    clearCanvas();
    handleParticles();
    animationFrame = window.requestAnimationFrame(animate);
  }

  function reset() {
    particlesArray.length = 0;
    clearCanvas();
  }

  function start() {
    if (running) return;

    running = true;
    animationFrame = window.requestAnimationFrame(animate);
  }

  function stop() {
    running = false;

    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  window.FireParticles = {
    reset: reset,
    start: start,
    stop: stop
  };
}(window, document));
