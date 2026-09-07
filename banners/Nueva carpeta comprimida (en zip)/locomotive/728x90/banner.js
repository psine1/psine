FORGE.init = function() {
  var width = FORGE.utils.getAdSizeFromMeta().width;
  var height = FORGE.utils.getAdSizeFromMeta().height;
  var banner = FORGE.createElement({id: "forge-banner", backgroundColor: "#333", width: width, height: height, cursor: "pointer", overflow: "hidden", parent: document.body});
  var ctaActive = false;

  var images = [
    "photo_1_bg.jpg",
    "photo_2_bg.jpg",
    "photo_2_rails.jpg",
    "photo_2_wheel.png",
    "photo_2_axle.png",
    "photo_2_gradient.png",
    "separator_1_1.png",
    "separator_1_2.png",
    "txt_1_1_txt.png",
    "txt_2_1_base.png",
    "txt_2_2_base.png",
    "txt_3_1_base.png",
    "txt_3_2_base.png",
    "logo_locomotive_base.png",
    "logo_locomotive_outlines.png",
    "separator_1_1.png",
    "separator_1_2.png",
    "separator_1_3.png",
    "txt_4_1_base.png",
    "txt_4_2_base.png",
    "cta_right_base.png",
    "cta_right_txt.png",
    "cta_right_light.png",
    "cta_left_base.png",
    "cta_left_txt.png",
    "foil_lights.png",
    "particle_dust.png",
    "particle_gold.png",
    "particle_blur.png",
    "photo_3_bg.jpg",



  ];

  FORGE.preloadImages(images, true, function() {

    /* Create elements
    ================================================= */
    var bg = FORGE.createElement({backgroundColor: "#333333", width: 728, height: 90, parent: banner});
    var photo_1 = FORGE.createElement({width: 728, height: 90, parent: banner});
      var photo_1_bg = FORGE.createElement({backgroundImage: "photo_1_bg.jpg", parent: photo_1});
    var stamp_locomotive = FORGE.createElement({width: 394, height: 351, left: 450, top: 30, parent: banner});
    var photo_2 = FORGE.createElement({width: 728, height: 90, parent: banner});
      var photo_2_bg = FORGE.createElement({backgroundImage: "photo_2_bg.jpg", parent: photo_2});
      var photo_2_rails = FORGE.createElement({backgroundImage: "photo_2_rails.jpg", top: 236, parent: photo_2});
      var photo_2_wheel = FORGE.createElement({backgroundImage: "photo_2_wheel.png", width: 220, height: 220, left: 213, top: -65, parent: photo_2});
      var photo_2_axle = FORGE.createElement({backgroundImage: "photo_2_axle.png", top: 213, width: 180, height: 100, parent: photo_2});
      var photo_2_gradient = FORGE.createElement({backgroundImage: "photo_2_gradient.png", top: 0, left: 250, width: 728, height: 300, parent: photo_2});
    var separator_1 = FORGE.createElement({width: 90, height: 7, left: 312, top: 76, parent: banner});
      var separator_1_1 = FORGE.createElement({backgroundImage: "separator_1_1.png", top: 0, retina: true, parent: separator_1});
      //var separator_1_2 = FORGE.createElement({backgroundImage: "separator_1_2.png", left: 57, retina: true, parent: separator_1});
    var txt_1 = FORGE.createElement({width: 120, height: 28, left: 13, top: 11, parent: banner});
      var txt_1_1 = FORGE.createElement({width: 120, height: 28, parent: txt_1});
        var txt_1_1_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 120, height: 28, opacity: 0, parent: txt_1_1});
        var txt_1_1_txt = FORGE.createElement({backgroundImage: "txt_1_1_txt.png", width: 120, height: 28, left: 0, top: 0, retina: true, parent: txt_1_1});

    var txt_2 = FORGE.createElement({width: 253, height: 46, left: 300, top: 15, parent: banner});

      var txt_2_1 = FORGE.createElement({width: 240, height: 28, parent: txt_2});
        var txt_2_1_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 240, height: 28, opacity: 0, parent: txt_2_1});
        var txt_2_1_base = FORGE.createElement({backgroundImage: "txt_2_1_base.png", left: 5, top: 0, retina: true, parent: txt_2_1});

      var txt_2_2 = FORGE.createElement({width: 240, height: 28, top: 29, parent: txt_2});
        var txt_2_2_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 240, height: 28, opacity: 0, parent: txt_2_2});
        var txt_2_2_base = FORGE.createElement({backgroundImage: "txt_2_2_base.png", left: 5, top: 0, retina: true, parent: txt_2_2});



    var txt_3 = FORGE.createElement({width: 253, height: 46, left: 312, top: 20, parent: banner});
      var txt_3_1 = FORGE.createElement({width: 253, height: 46, parent: txt_3});
        var txt_3_1_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 253, height: 46, opacity: 0, parent: txt_3_1});
        var txt_3_1_base = FORGE.createElement({backgroundImage: "txt_3_1_base.png", left: 0, top: 0, retina: true, parent: txt_3_1});

      var txt_3_2 = FORGE.createElement({width: 253, height: 46, top: 29, parent: txt_3});
        var txt_3_2_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 253, height: 46, opacity: 0, parent: txt_3_2});
        var txt_3_2_base = FORGE.createElement({backgroundImage: "txt_3_2_base.png", left: 0, top: 0, retina: true, parent: txt_3_2});



    var panel = FORGE.createElement({width: 728, height: 90, left: 0, top: 0, parent: banner});
    var photo_3_bg = FORGE.createElement({backgroundImage: "photo_3_bg.jpg", width: 728, height: 90, left: 0, top: 0, parent: panel});

      var panel_base = FORGE.createElement({backgroundColor: "#333333", width: 719, height: 81, left: 4, top: 5, opacity: 0.9, parent: panel});
      var logo_locomotive = FORGE.createElement({width: 126, height: 112, left: 301, top: -11, parent: panel});
       // var logo_locomotive_base = FORGE.createElement({backgroundImage: "logo_locomotive_base.png", width: 223, height: 198, left: 39, top: 186, retina: true, parent: panel});
        var logo_locomotive_outlines = FORGE.createElement({backgroundImage: "logo_locomotive_outlines.png", width: 126, height: 112, left: 1, retina: true, parent: logo_locomotive});

      var separator_2 = FORGE.createElement({width: 119, height: 9, left: 110, top: 68, parent: panel});
        var separator_1_3 = FORGE.createElement({backgroundImage: "separator_1_3.png", width: 119, height: 9, left: 0, top: 2, retina: true, parent: separator_2});

      var txt_4 = FORGE.createElement({width: 138, height: 43, left: 104, top: 19, parent: panel});
        var txt_4_1 = FORGE.createElement({width: 110, height: 25, left: 29, parent: txt_4});
          var txt_4_1_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 79, height: 18, opacity: 0, parent: txt_4_1});
          var txt_4_1_base = FORGE.createElement({backgroundImage: "txt_4_1_base.png", width: 79, height: 18, left: 0, top: 0, retina: true, parent: txt_4_1});

        var txt_4_2 = FORGE.createElement({width: 138, height: 23, top: 26, left: 0, parent: txt_4});
          var txt_4_2_mask = FORGE.createElement({backgroundColor: "#00ffff", width: 138, height: 23, opacity: 0, parent: txt_4_2});
          var txt_4_2_base = FORGE.createElement({backgroundImage: "txt_4_2_base.png", width: 138, height: 23, left: 0, top: 0, retina: true, parent: txt_4_2});
 
      var cta = FORGE.createElement({width: 132, height: 34, left: 502, top: 28, parent: panel});
        var cta_right = FORGE.createElement({width: 132, height: 34, left: 0, parent: cta});
          var cta_right_base = FORGE.createElement({backgroundImage: "cta_right_base.png", left: 33, width: 132, height: 34, retina: true, parent: cta_right});
          var cta_right_reflection = FORGE.createElement({backgroundColor: "#ffffff", width: 3, height: 43, left: 33, top: 0, parent: cta_right});
          var cta_right_txt = FORGE.createElement({backgroundImage: "cta_right_txt.png",  width: 70, height: 18, left: 46, top: 8, retina: true, parent: cta_right});
          var cta_right_light = FORGE.createElement({backgroundImage: "cta_right_light.png", left: 33, width: 132, height: 34, opacity: 0, retina: true, parent: cta_right});

        var cta_left = FORGE.createElement({width: 32, height: 34, parent: cta});
          var cta_left_base = FORGE.createElement({backgroundImage: "cta_left_base.png", width: 32, height: 34, retina: true, parent: cta_left});
          var cta_left_txt = FORGE.createElement({backgroundImage: "cta_left_txt.png", width: 11, height: 17, left: 12, top: 8, width: 70, height: 18, retina: true, parent: cta_left});

    /* Create additional elements
    ============================================ */
    var stamp_locomotive_outlines = FORGE.createElement({backgroundImage: "logo_locomotive_outlines.png", retina: true, parent: stamp_locomotive});
    var border = FORGE.createElement({border: "solid 1px #000", boxSizing: "border-box", width: width, height: height, parent: banner});

    var foil_logo_locomotive = createLogoFoil(logo_locomotive, logo_locomotive_outlines, 1);
    var foil_stamp_locomotive = createLogoFoil(stamp_locomotive, stamp_locomotive_outlines, 0.85);

    /* Variables
    ============================================ */
    var txt_4_center = ((width / 2) - (panel.get("left") + txt_4.get("left"))) - (txt_4_1.get("width") / 2);

    /* Element adjustments
    ============================================ */
    TweenMax.set(txt_1.childNodes, {overflow: "hidden"});
    TweenMax.set(txt_2.childNodes, {overflow: "hidden"});
    TweenMax.set(txt_3.childNodes, {overflow: "hidden"});
    TweenMax.set(txt_4.childNodes, {overflow: "hidden"});
    stamp_locomotive.set({scale: 1.65, transformOrigin: "0% 0%"});
    photo_1.set({clip: "rect(0px " + photo_1.get("width") + "0px 0px"});
    photo_2.set({clip: "rect(0px " + photo_2.get("width") + "0px 0px"});
    panel.set({clip: "rect(0px 0px " + panel.get("height") + "0px"});
    cta.set({overflow: "hidden"});

    FORGE.fix.elementJitter([photo_1, photo_2_axle]);

    /* Particles
    ============================================ */
    var particles_dust_1 = new FORGE.Particles({
      images: [
        "particle_dust.png",
      ],
      preCalc: false,
      autoStart: false,
      lifespan: 4,
      gravity: -0.016,
      wind: -0.026,
      turbulence: 0.08,
      friction: 0.97,
      maxParticles: 90,
      emitter: {x: 0, y: 0, width: width, height: height},
      parent: photo_2,

      onEmitParticle: function(p) {
        p.scale = FORGE.math.random(0.5, 1);
      },

      onUpdateParticle: function(p) {
        p.opacity = FORGE.math.map(p.getLifeCurve(), 0, 1, 0, 1);
        p.rotation = p.getHeading() - Math.PI * 0.5;
      }
    });

    var particles_dust_2 = new FORGE.Particles({
      images: [
        "particle_gold.png",
      ],
      preCalc: true,
      autoStart: true,
      lifespan: 5,
      particlesPerSecond: 3,
      gravity: -0.016,
      wind: 0.016,
      turbulence: 0.08,
      friction: 0.97,
      emitter: {x: 0, y: 0, width: width, height: height},
      parent: banner,

      onEmitParticle: function(p) {
        p.scale = FORGE.math.random(0.6, 1);
      },

      onUpdateParticle: function(p) {
        p.opacity = FORGE.math.map(p.getLifeCurve(), 0, 1, 0, 1);
      }
    });

    var particles_blur = new FORGE.Particles({
      images: [
        "particle_blur.png",
      ],
      preCalc: true,
      autoStart: true,
      lifespan: 3,
      particlesPerSecond: 1,
      gravity: -0.004,
      wind: -0.012,
      turbulence: 0.04,
      friction: 0.97,
      emitter: {x: 0, y: 0, width: width, height: height},
      parent: banner,

      onEmitParticle: function(p) {
        p.scale = FORGE.math.random(0.1, 0.5);
      },

      onUpdateParticle: function(p) {
        p.opacity = FORGE.math.map(p.getLifeCurve(), 0, 1, 0, 0.5);
        p.rotation = p.getHeading() - Math.PI * 0.5;
      }
    });


    /* Animations
    ============================================ */
    var separatorIn = function(obj) {
      return new FORGE.Timeline()
        .from(obj, 0.65, {y: 15, opacity: 0, ease: Power2.easeOut});
    }

    var separatorOut = function(obj) {
      return new FORGE.Timeline()
        .to(obj, 0.55, {y: 15, opacity: 0, ease: Power2.easeIn});
    }

    var txtMaskIn = function(obj, direction) {
      var timeline = new FORGE.Timeline();
      var nodes = obj.childNodes;

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var mask = node.childNodes[0];
        var txt = node.childNodes[1];
        var time = 0.65;

        if (direction === "bottom") {
          timeline.from(node, time, {y: mask.get("height") * 0.5, ease: Power2.easeOut});
          timeline.from(txt, time, {y: mask.get("height") * 1.5, ease: Power2.easeOut});
        }

        if (direction === "left") {
          timeline.from(txt, time, {x: -mask.get("width") * 1.5, ease: Power2.easeOut});
        }

        if (i < nodes.length - 1) {
          timeline.offset(0.1)
        }
      }

      return timeline;
    }

    var txtMaskOut = function(obj, direction) {
      var timeline = new FORGE.Timeline();
      var nodes = obj.childNodes;

      for (var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];
        var mask = node.childNodes[0];
        var txt = node.childNodes[1];
        var time = 0.55;

        if (direction === "bottom") {
          timeline.to(node, time, {y: mask.get("height") * 0.5, ease: Power2.easeIn});
          timeline.to(txt, time, {y: mask.get("height") * 1.5, ease: Power2.easeIn});
        }

        if (direction === "left") {
          timeline.to(txt, time, {x: -mask.get("width") * 1.5, ease: Power2.easeIn});
        }

        if (i >= 0) {
          timeline.offset(0.14)
        }
      }

      return timeline;
    }

    var rectMaskIn = function(obj) {
      return new FORGE.Timeline()
        .to(obj, 0.55, {clip: "rect(0px " + obj.get("width") + "px " + obj.get("height") + "px 0px", ease: Power2.easeIn});
    }

    var ctaOver = function() {
      if (!ctaActive) {
        ctaActive = true;
        cta_right_reflection.set({x: 0, opacity: 0.4});

        return new FORGE.Timeline()
          .to(cta, 0.16, {x: 2, ease: Power2.easeOut})
          .to(cta_left_txt, 0.16, {x: 2, ease: Power2.easeOut})
          .to(cta_right_txt, 0.16, {x: 1, ease: Power2.easeOut})
          .to(cta_right_light, 0.4, {opacity: 0.5, ease: Power1.easeOut})
          .offset(0.08)
          .to(cta_right_light, 0.4, {opacity: 0, ease: Power2.easeIn})
          .to(cta_right_reflection, 0.5, {x: 100, opacity: 0, ease: Power2.easeOut}, -0.5)
          .offset(0.16)
          .to(cta, 0.8, {x: 0, ease: Power2.easeInOut})
          .to(cta_left_txt, 0.8, {x: 0, ease: Power2.easeInOut})
          .to(cta_right_txt, 0.8, {x: 0, ease: Power2.easeInOut})
          .chain()
          .add(function() {
            ctaActive = false;
          });
      } 
    }

    photo_1.in = new FORGE.Timeline()
      .add(rectMaskIn(photo_1))
      .from(photo_1_bg, 3, {scale: 1.1, ease: Sine.easeOut})

    photo_2.in = new FORGE.Timeline()
      .add(rectMaskIn(photo_2))
      .from(photo_2_wheel, 5, {rotation: -60, ease: Power1.easeOut})
      .to(photo_2_rails, 5, {x: -70, ease: Power1.easeOut})
      .from(photo_2_axle, 4.55, {y: 70, ease: Power1.easeOut})
      .from(photo_2_axle, 5, {x: -20, ease: Sine.easeInOut})
      .add(function() {
        particles_dust_1.start();
      })
      .chain(2.1)
      .add(function() {
        particles_dust_1.stop();
        particles_dust_2.stop();
        particles_blur.stop();
      })

    stamp_locomotive.in = new FORGE.Timeline()
      .add(foil_stamp_locomotive.foil)
      .from(stamp_locomotive, 1, {opacity: 0, ease: Power2.easeOut})


    logo_locomotive.in = new FORGE.Timeline()
      .add(foil_logo_locomotive.foil)
      .from(logo_locomotive, 0.9, {y: 20, ease: Power2.easeOut});

    txt_4.in = new FORGE.Timeline()
      .from(txt_4_1, 0.65, {y: txt_4_1_mask.get("height") * 0.5, ease: Power2.easeOut})
      .from(txt_4_1_base, 0.65, {y: txt_4_1_mask.get("height") * 1.5, ease: Power2.easeOut})
      .chain(0.2)
      //.from(txt_4, 0.65, {x: txt_4_center, ease: Power2.easeInOut})
      .from(txt_4_2_base, 0.65, {y: -txt_4_1_mask.get("height") * 1.5, ease: Power2.easeOut});

    cta.in = new FORGE.Timeline()
      .from(cta, 0.2, {opacity: 0, ease: Power2.easeOut})
      .fromTo(cta, 0.3, {x: -100}, {x: 2, ease: Power1.easeOut})
      .chain()
      .add(ctaOver);

    /* Timeline
    ============================================ */
    var main_tl = new FORGE.Timeline()
      .offset(0.25)

      .add(photo_1.in)
      .offset(0.3)
      .add(txtMaskIn(txt_1, "left"))
      .offset(0.35)
      .add(stamp_locomotive.in)
      .add(txtMaskIn(txt_2, "bottom"))
      .offset(0.5)
      .add(separatorIn(separator_1))
      .chain(3)
      .add(separatorOut(separator_1))
      .add(txtMaskOut(txt_2, "bottom"))
      .offset(0.4)

      .add(photo_2.in)
      .offset(0.6)
      .add(txtMaskIn(txt_3, "bottom"))
      .chain(3.5)
      .add(txtMaskOut(txt_3, "bottom"))
      .offset(0.3)
      .add(txtMaskOut(txt_1, "left"))
      .offset(0.6)

      .add(rectMaskIn(panel))
      .offset(0.12)
      .add(logo_locomotive.in)
      .offset(0.26)
      .add(txt_4.in)
      .offset(0.5)
      .add(separatorIn(separator_2))
      .chain(1.5)
      //.add(separatorOut(separator_2))
      //.add(txtMaskOut(txt_4, "bottom"))
      .chain()
      .add(cta.in);

    /* Interactions
    ============================================ */
    banner.onmouseenter = function() {
      ctaOver();
    }

    banner.onclick = function() {
      window.open(window.clickTag, "_blank");
    }

    /* Helpers
    ============================================ */
    function createLogoFoil(obj, outlines, speed) {
      var canvasWidth = obj.get("width");
      var canvasHeight = obj.get("height");

      var canvas = FORGE.createElement({type: "canvas", width: canvasWidth * 2, height: canvasHeight * 2, parent: obj});
      var ctx = canvas.getContext("2d");

      // Retina settings
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
      ctx.scale(2, 2);

      // Create foil outline
      var outlines_img = FORGE.imageCache[FORGE.utils.basename(outlines.get("backgroundImage"))];

      // Create foil light
      var light = FORGE.createElement({width: width, height: height, parent: banner});
      var light_img = FORGE.imageCache["foil_lights.png"];
      light.posX = 0;
      light.posY = 0;
      light.rotation = 0;
      light.opacity = 0;

      canvas.start = function() {
        canvas.renderInterval = setInterval(canvas.render, 30);
      };

      canvas.stop = function() {
        clearInterval(canvas.renderInterval);
      };

      canvas.render = function() {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(outlines_img, outlines.get("left"), outlines.get("top"), outlines.get("width"), outlines.get("height"));
        ctx.globalCompositeOperation = "source-in";

        ctx.save();
        ctx.globalAlpha = light.opacity;
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(light.rotation);
        ctx.drawImage(light_img, -(canvasWidth / 2) + light.posX, -(canvasHeight / 2) + light.posY, light.get("width"), light.get("height"));
        ctx.restore();
        ctx.globalCompositeOperation = "source-over";
      }

      canvas.foil = new FORGE.Timeline()
        .add(function() { canvas.start(); })
        .to(light, 2, {opacity: 1, ease: Sine.easeOut})
        .to(light, 7 * speed, {rotation: -8, posX: -35, posY: -35, ease: Sine.easeIn})
        .chain()
        .to(light, 7 * speed, {rotation: -16, posX: 0, posY: 0, ease: Sine.easeOut})
        .chain(-2)
        .to(light, 2, {opacity: 0, ease: Sine.easeIn})
        .chain()
        .add(function() { canvas.stop(); });

      return canvas;
    }
  });
};
