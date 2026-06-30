// GSAP timeline for the duck mascot
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.remove();

  const serviceCards = Array.from(document.querySelectorAll('[data-service-card]'));
  const serviceClouds = Array.from(document.querySelectorAll('[data-cloud-speed]'));
  const servicesSection = document.querySelector('.services-section');

  if (serviceCards.length && servicesSection) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const easeInOut = (value) => value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;
    let targetProgress = 0;
    let smoothProgress = 0;
    let ticking = false;
    let cloudsActive = false;
    let cloudsTicking = false;
    let cloudsLastTime = 0;
    const cloudScrollY = serviceClouds.map(() => 0);
    const cloudDriftY = serviceClouds.map(() => 0);

    const renderServiceClouds = () => {
      serviceClouds.forEach((cloud, index) => {
        cloud.style.setProperty('--cloud-y', `${cloudScrollY[index] + cloudDriftY[index]}px`);
      });
    };

    const wrapServiceClouds = () => {
      const rect = servicesSection.getBoundingClientRect();
      const viewportTop = -rect.top;
      const viewportBottom = viewportTop + window.innerHeight;
      const loopDistance = window.innerHeight * 1.45;

      serviceClouds.forEach((cloud, index) => {
        const cloudY = cloudScrollY[index] + cloudDriftY[index];
        const cloudTop = cloud.offsetTop + cloudY;
        const cloudBottom = cloudTop + cloud.offsetHeight;

        if (cloudBottom < viewportTop - 160) {
          cloudDriftY[index] += loopDistance + index * 18;
        } else if (cloudTop > viewportBottom + loopDistance) {
          cloudDriftY[index] -= loopDistance;
        }
      });
    };

    const animateServiceClouds = (time) => {
      if (!cloudsActive) {
        cloudsTicking = false;
        cloudsLastTime = 0;
        return;
      }

      if (!cloudsLastTime) cloudsLastTime = time;
      const delta = Math.min((time - cloudsLastTime) / 1000, 0.05);
      cloudsLastTime = time;

      serviceClouds.forEach((cloud, index) => {
        const speed = Number(cloud.dataset.cloudSpeed) || 0.25;
        cloudDriftY[index] -= (18 + speed * 58) * delta;
      });

      wrapServiceClouds();
      renderServiceClouds();
      requestAnimationFrame(animateServiceClouds);
    };

    const startServiceClouds = () => {
      cloudsActive = true;
      if (!cloudsTicking) {
        cloudsTicking = true;
        requestAnimationFrame(animateServiceClouds);
      }
    };

    const stopServiceClouds = () => {
      cloudsActive = false;
    };

    const readServiceProgress = () => {
      const rect = servicesSection.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      targetProgress = clamp(-rect.top / travel, 0, 1);
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateServiceCards);
      }
    };

    const updateServiceCards = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.22;
      if (Math.abs(targetProgress - smoothProgress) < 0.001) {
        smoothProgress = targetProgress;
      }

      const step = smoothProgress * (serviceCards.length - 1);
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;

      serviceCards.forEach((card, index) => {
        const exit = clamp(step - index, 0, 1);
        const easedExit = easeInOut(exit);
        let x = 0;
        let y = 0;
        let r = 0;
        let s = 1;
        let opacity = 1;

        if (exit > 0) {
          const direction = index % 2 === 0 ? -1 : 1;
          x = direction * (10 + index * 1.8) * vw * easedExit;
          y = -126 * vh * easedExit;
          r = direction * (16 - index * 1.8) * easedExit;
          s = 1 - 0.035 * easedExit;
          opacity = 1 - clamp((exit - 0.78) / 0.22, 0, 1);
        }

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--r', `${r}deg`);
        card.style.setProperty('--s', s);
        card.style.setProperty('--opacity', opacity);
        card.style.zIndex = exit >= 0.98 ? `${10 - index}` : `${100 - index}`;
      });

      serviceClouds.forEach((cloud, index) => {
        const speed = Number(cloud.dataset.cloudSpeed) || 0.25;
        cloudScrollY[index] = smoothProgress * -window.innerHeight * speed * 2.8;
      });
      wrapServiceClouds();
      renderServiceClouds();

      if (smoothProgress !== targetProgress) {
        requestAnimationFrame(updateServiceCards);
      } else {
        ticking = false;
      }
    };

    readServiceProgress();
    window.addEventListener('scroll', readServiceProgress, {passive: true});
    window.addEventListener('resize', readServiceProgress);

    if ('IntersectionObserver' in window && serviceClouds.length) {
      const cloudObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startServiceClouds();
        } else {
          stopServiceClouds();
        }
      }, {threshold: 0.05});

      cloudObserver.observe(servicesSection);
    } else if (serviceClouds.length) {
      startServiceClouds();
    }
  }

  if (typeof gsap === 'undefined') return;

  const servicesDuckWrap = document.querySelector('.services-duck');
  const servicesDuck = document.querySelector('.services-duck-inner');
  const servicesArmLeft = document.querySelector('.services-arm-left');
  const servicesArmRight = document.querySelector('.services-arm-right');
  const servicesLegLeft = document.querySelector('.services-leg-left');
  const servicesLegRight = document.querySelector('.services-leg-right');

  if (servicesDuckWrap && servicesSection) {
    const clampDuckEntry = (value, min, max) => Math.min(Math.max(value, min), max);
    const moveServicesDuck = gsap.quickTo(servicesDuckWrap, 'y', {duration: 1, ease: 'power3.out'});

    const updateServicesDuckEntry = () => {
      const rect = servicesSection.getBoundingClientRect();
      const entryDistance = window.innerHeight * 0.7;
      const progress = clampDuckEntry((window.innerHeight - rect.top) / entryDistance, 0, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      moveServicesDuck(-300 * (1 - easedProgress));
    };

    gsap.set(servicesDuckWrap, {y: 300});
    updateServicesDuckEntry();
    window.addEventListener('scroll', updateServicesDuckEntry, {passive: true});
    window.addEventListener('resize', updateServicesDuckEntry);
  }

  if (servicesDuck) {
    gsap.set(servicesDuck, {transformOrigin: '48% 72%', x: 0, y: 8, rotation: -2});
    gsap.to(servicesDuck, {
      y: -50,
      rotation: 5,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  if (servicesArmLeft) {
    gsap.set(servicesArmLeft, {transformOrigin: '35% 58%', rotation: -5});
    gsap.to(servicesArmLeft, {
      rotation: 8,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  if (servicesArmRight) {
    gsap.set(servicesArmRight, {transformOrigin: '61% 54%', rotation: 4});
    gsap.to(servicesArmRight, {
      rotation: -5,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  if (servicesLegLeft) {
    gsap.set(servicesLegLeft, {transformOrigin: '43% 68%', rotation: 2});
    gsap.to(servicesLegLeft, {
      rotation: -6,
      duration: 0.95,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  if (servicesLegRight) {
    gsap.set(servicesLegRight, {transformOrigin: '57% 68%', rotation: -2});
    gsap.to(servicesLegRight, {
      rotation: 6,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  const duckHop = document.querySelector('.duck-hop');
  const duck = document.querySelector('.duck-mascot');
  const armLeft = document.querySelector('.duck-arm-left');
  const armRight = document.querySelector('.duck-arm-right');
  const head = document.querySelector('.duck-head');
  const headNod = document.querySelector('.duck-head-nod');
  const headTrack = document.querySelector('.duck-head-track');
  const shadow = document.querySelector('.duck-shadow');

  const enter = gsap.timeline({defaults:{duration:0.8, ease:'power3.out'}});

  // entrance: fade + parts stagger
  enter.from(duck, {autoAlpha:0, y:40, scale:0.96, duration:0.9});
  //enter.from(['.duck-body','.duck-head','.duck-arm-left','.duck-arm-right','.duck-leg-left','.duck-leg-right'], {autoAlpha:0, y:18, stagger:0.08}, '-=0.5');

  
gsap.set(armLeft, {transformOrigin: '37.33% 61.49%'});
gsap.set(".duck-body", {transformOrigin: '49.87% 72.89%'});

  // quick playful movements on enter
  enter.to(armLeft, {rotation: 10,  duration:0.5, yoyo:true, repeat: -1, ease:'sine.inOut'}, '<');
  enter.to(armRight, {rotation: 3, transformOrigin:'50% 50%', duration:0.5, yoyo:true, repeat: -1, ease:'sine.inOut'}, '<');
  enter.to(duck, {y:-6, duration:0.6, yoyo:true, repeat:3, ease:'sine.inOut'}, '-=0.6');

  // idle loop: subtle bob and shadow squash
    gsap.to('.duck-mascot', {y: -150, scaleX: 0.93, duration: 0.6, ease:'power2.inOut', yoyo:true, repeat:-1});
    gsap.to('.duck-leg-left', {rotation: -4, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1});
    gsap.to('.duck-leg-right', {rotation: 4, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1});
    gsap.to('.duck-body', {y: 10, rotation: 5, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 0.6});
    gsap.to('.duck-head', {y: 5, x: 15, rotation: 3, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 0.6});
    gsap.to('.duck-mascot', {scaleY: 0.98, transformOrigin:' 50% 100%', duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 0.6});


  gsap.to('.duck-shadow', {scaleX:0.75, autoAlpha: 0.6, duration: 0.6, yoyo:true, repeat:-1, transformOrigin:'center'});

  // small head float / look
  gsap.to('.duck-head', {rotation: -4, duration:3, ease:'sine.inOut', yoyo:true, repeat:-1, transformOrigin:'51.58% 39.70%'});


  /*
  if (duckHop && window.matchMedia('(hover: hover)').matches) {
    let hopTimeline = null;

    const hopYes = () => {
      if (hopTimeline) hopTimeline.kill();

      gsap.set(duckHop, {scale: 1});

      hopTimeline = gsap.timeline({
        defaults: {ease: 'power2.out'},
        onComplete: () => gsap.set(duckHop, {scale: 1})
      });

      hopTimeline
        .to(duckHop, {scale: 1.2, duration: 0.22})
        .to(duckHop, {scale: 1, duration: 0.22, ease: 'back.out(2)'});
    };

    document
      .querySelectorAll('.btn-talk, .btn-menu, .start-link, .scroll-down')
      .forEach((el) => el.addEventListener('pointerenter', hopYes));
  }

  */

  if (headTrack && window.matchMedia('(hover: hover)').matches) {
    gsap.set(headTrack, {transformOrigin: '50.5% 38.5%', transformPerspective: 700, force3D: true});

    const moveHeadX = gsap.quickTo(headTrack, 'x', {duration: 0.65, ease: 'power3.out'});
    const moveHeadY = gsap.quickTo(headTrack, 'y', {duration: 0.65, ease: 'power3.out'});
    const rotateHead = gsap.quickTo(headTrack, 'rotation', {duration: 0.65, ease: 'power3.out'});
    const tiltHeadX = gsap.quickTo(headTrack, 'rotationX', {duration: 0.65, ease: 'power3.out'});
    const tiltHeadY = gsap.quickTo(headTrack, 'rotationY', {duration: 0.65, ease: 'power3.out'});

    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      moveHeadX(x * 9);
      moveHeadY(y * 6);
      rotateHead(x * 2.8);
      tiltHeadX(y * -3);
      tiltHeadY(x * 4);
    });

    window.addEventListener('pointerleave', () => {
      moveHeadX(0);
      moveHeadY(0);
      rotateHead(0);
      tiltHeadX(0);
      tiltHeadY(0);
    });
  }
});
