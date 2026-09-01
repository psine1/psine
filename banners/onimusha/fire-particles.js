(function (window, document) {
  "use strict";

  var canvas = document.querySelector("#fireCanvas");
  var ctx = canvas ? canvas.getContext("2d") : null;
  var particles = [];
  var animationFrame = null;
  var running = false;
  var lastFrameTime = 0;
  var emissionCarry = 0;
  var emissionRate = 24;
  var visualScale = 1;

  if (!canvas || !ctx) return;

  if (window.FireParticles && typeof window.FireParticles.stop === "function") {
    window.FireParticles.stop();
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function resizeCanvas() {
    var bounds = canvas.getBoundingClientRect();
    var width = Math.max(1, Math.round(bounds.width || window.innerWidth));
    var height = Math.max(1, Math.round(bounds.height || window.innerHeight));

    if (canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    emissionRate = clamp(width / 13, 18, 52);
    visualScale = clamp(Math.min(width, height) / 250, 0.48, 1);
    particles.length = 0;
    emissionCarry = 0;
  }

  function Spark() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * Math.min(10, canvas.height * 0.04);
    this.size = (0.9 + Math.random() * 2.7) * visualScale;
    this.speedX = canvas.width * (0.42 + Math.random() * 0.48);
    this.speedY = -canvas.height * (0.45 + Math.random() * 1.35);
    this.shrink = (0.8 + Math.random() * 1.4) * visualScale;
    this.alpha = 0.58 + Math.random() * 0.42;
  }

  Spark.prototype.update = function (delta) {
    this.x += this.speedX * delta;
    this.y += this.speedY * delta;
    this.size -= this.shrink * delta;
  };

  Spark.prototype.draw = function () {
    var trailTime = 0.016;
    var radius = Math.max(0.35, this.size * 0.46);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = clamp(this.alpha * this.size, 0, 1);
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(0.55, radius * 0.72);
    ctx.strokeStyle = "rgb(255, 50, 0)";
    ctx.shadowColor = "rgba(255, 50, 0, 0.9)";
    ctx.shadowBlur = 5 * visualScale;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.speedX * trailTime, this.y - this.speedY * trailTime);
    ctx.stroke();

    ctx.fillStyle = "rgb(255, 50, 0)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function updateParticles(delta) {
    emissionCarry += delta * emissionRate;

    var emitCount = Math.min(4, Math.floor(emissionCarry));
    emissionCarry -= emitCount;

    while (emitCount > 0) {
      particles.push(new Spark());
      emitCount--;
    }

    for (var i = particles.length - 1; i >= 0; i--) {
      var particle = particles[i];
      particle.update(delta);

      if (
        particle.size <= 0.12 ||
        particle.y < -20 ||
        particle.x > canvas.width + 20
      ) {
        particles.splice(i, 1);
        continue;
      }

      particle.draw();
    }
  }

  function animate(timestamp) {
    if (!running) return;

    var delta = lastFrameTime
      ? clamp((timestamp - lastFrameTime) / 1000, 0.001, 0.04)
      : 1 / 60;

    lastFrameTime = timestamp;
    clearCanvas();
    updateParticles(delta);
    animationFrame = window.requestAnimationFrame(animate);
  }

  function reset() {
    particles.length = 0;
    emissionCarry = 1;
    lastFrameTime = 0;
    clearCanvas();
  }

  function start() {
    if (running) return;

    resizeCanvas();
    running = true;
    lastFrameTime = 0;
    animationFrame = window.requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    lastFrameTime = 0;

    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas, { passive: true });

  window.FireParticles = {
    reset: reset,
    start: start,
    stop: stop
  };
}(window, document));
