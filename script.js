// GSAP timeline for the duck mascot
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderProgress = loader?.querySelector('[data-loader-progress]');
  const loaderPercent = loader?.querySelector('[data-loader-percent]');
  const shouldRunLoader = document.documentElement.classList.contains('loader-pending');

  if (loader && shouldRunLoader) {
    const loaderStartedAt = performance.now();
    const loaderImages = Array.from(document.images);
    const loaderTasks = [];
    let loaderCompleted = 0;
    let loaderDisplayedProgress = 0;
    let loaderTargetProgress = 4;
    let loaderReady = false;
    let loaderFinished = false;

    const updateLoaderTarget = () => {
      const total = Math.max(1, loaderTasks.length);
      loaderTargetProgress = Math.max(loaderTargetProgress, Math.min(96, (loaderCompleted / total) * 96));
    };

    const waitForImage = (image) => new Promise((resolve) => {
      const decodeImage = () => {
        if (typeof image.decode === 'function') {
          image.decode().catch(() => {}).finally(resolve);
        } else {
          resolve();
        }
      };

      if (image.complete) {
        decodeImage();
        return;
      }

      image.addEventListener('load', decodeImage, {once: true});
      image.addEventListener('error', resolve, {once: true});
    });

    loaderImages.forEach((image) => {
      const task = waitForImage(image).finally(() => {
        loaderCompleted += 1;
        updateLoaderTarget();
      });
      loaderTasks.push(task);
    });

    if (document.fonts?.ready) {
      const fontTask = document.fonts.ready.catch(() => {}).finally(() => {
        loaderCompleted += 1;
        updateLoaderTarget();
      });
      loaderTasks.push(fontTask);
    }

    const windowLoadTask = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, {once: true});
    }).finally(() => {
      loaderCompleted += 1;
      updateLoaderTarget();
    });
    loaderTasks.push(windowLoadTask);

    const finishLoader = () => {
      if (loaderFinished) return;
      loaderFinished = true;
      loaderTargetProgress = 100;
      loaderDisplayedProgress = 100;
      if (loaderProgress) loaderProgress.style.transform = 'scaleX(1)';
      if (loaderPercent) loaderPercent.textContent = '100%';
      try {
        localStorage.setItem('psine-loader-v1', 'complete');
      } catch (error) {
        // Storage can be unavailable in private browsing; the loader still exits normally.
      }
      document.documentElement.classList.remove('loader-pending');
      document.body.setAttribute('aria-busy', 'false');

      window.setTimeout(() => {
        loader.classList.add('is-leaving');
        window.setTimeout(() => loader.remove(), 560);
      }, 220);
    };

    const renderLoader = () => {
      const difference = loaderTargetProgress - loaderDisplayedProgress;
      loaderDisplayedProgress += difference * 0.09;
      if (Math.abs(difference) < 0.08) loaderDisplayedProgress = loaderTargetProgress;

      const roundedProgress = Math.min(100, Math.round(loaderDisplayedProgress));
      if (loaderProgress) loaderProgress.style.transform = `scaleX(${loaderDisplayedProgress / 100})`;
      if (loaderPercent) loaderPercent.textContent = `${String(roundedProgress).padStart(2, '0')}%`;

      const minimumTimePassed = performance.now() - loaderStartedAt >= 900;
      if (loaderReady && minimumTimePassed && loaderDisplayedProgress >= 94.5) {
        finishLoader();
        return;
      }

      if (!loaderFinished) window.requestAnimationFrame(renderLoader);
    };

    Promise.allSettled(loaderTasks).then(() => {
      loaderReady = true;
      loaderTargetProgress = 100;
    });

    window.setTimeout(() => {
      loaderReady = true;
      loaderTargetProgress = 100;
    }, 12000);

    window.requestAnimationFrame(renderLoader);
  } else {
    document.documentElement.classList.remove('loader-pending');
    document.body.setAttribute('aria-busy', 'false');
    if (loader) loader.remove();
  }

  const currentYear = document.querySelector('[data-current-year]');
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const contactSection = document.querySelector('[data-contact-section]');
  const contactButtonScene = document.querySelector('[data-contact-cta-scene]');
  const magneticButton = document.querySelector('[data-magnetic-button]');
  const contactCue = document.querySelector('.contact-cue');
  const contactSparks = Array.from(document.querySelectorAll('.contact-spark'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const contactTitle = document.querySelector('[data-contact-title]');
  const talkLabel = document.querySelector('[data-talk-label]');
  const contactDialog = document.querySelector('[data-contact-dialog]');
  const contactOverlay = document.querySelector('[data-contact-overlay]');
  const contactDialogShell = document.querySelector('[data-contact-dialog-shell]');
  const contactOpeners = Array.from(document.querySelectorAll('[data-contact-open]'));
  const contactForm = document.querySelector('[data-contact-form]');
  let contactTitleLetters = [];
  let contactTitleMorph = null;

  const splitTextIntoLetters = (element, letterClass) => {
    const text = element.textContent;
    element.textContent = '';

    return Array.from(text).map((character) => {
      const letter = document.createElement('span');
      const isSpace = character === ' ';
      letter.className = `${letterClass}${isSpace ? ' is-space' : ''}`;
      letter.textContent = isSpace ? '\u00a0' : character;
      letter.setAttribute('aria-hidden', 'true');
      element.appendChild(letter);
      return letter;
    });
  };

  const playLetterBounce = (letters, intensity = 1) => {
    if (!letters.length || reducedMotion || !window.gsap) return;
    gsap.killTweensOf(letters);
    gsap.timeline()
      .to(letters, {
        y: () => gsap.utils.random(-7, 4, 1) * intensity,
        rotation: () => gsap.utils.random(-9, 9, 1) * intensity,
        scaleX: () => gsap.utils.random(0.9, 1.08),
        scaleY: () => gsap.utils.random(0.82, 1.14),
        duration: 0.18,
        stagger: {each: 0.018, from: 'random'},
        ease: 'power2.out'
      })
      .to(letters, {
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.56,
        stagger: {each: 0.022, from: 'random'},
        ease: 'elastic.out(1, 0.35)'
      });
  };

  const setupWordMorph = ({trigger, lead, switcher, letterClass, defaultLabel, alternateLabel, bounceIntensity, startReady = true, bindHover = true}) => {
    if (!trigger || !lead || !switcher || reducedMotion || !window.gsap) return null;
    const defaultWord = switcher.querySelector('[data-word-default]');
    const alternateWord = switcher.querySelector('[data-word-alternate]');
    if (!defaultWord || !alternateWord) return null;

    const leadLetters = splitTextIntoLetters(lead, letterClass);
    const defaultLetters = splitTextIntoLetters(defaultWord, letterClass);
    const alternateLetters = splitTextIntoLetters(alternateWord, letterClass);
    let morphTimeline = null;
    let isReady = startReady;

    trigger.classList.add('has-gsap-word-morph');
    if (isReady) trigger.classList.add('is-word-morph-ready');
    gsap.set(alternateWord, {autoAlpha: 0});
    gsap.set(alternateLetters, {yPercent: 120, opacity: 0});

    const showAlternate = () => {
      if (morphTimeline) morphTimeline.kill();
      gsap.killTweensOf([...defaultLetters, ...alternateLetters]);
      trigger.setAttribute('aria-label', alternateLabel);
      gsap.set(defaultWord, {autoAlpha: 1});
      gsap.set(alternateWord, {autoAlpha: 1});
      playLetterBounce(leadLetters, bounceIntensity);

      morphTimeline = gsap.timeline({
        onComplete: () => gsap.set(defaultWord, {autoAlpha: 0})
      })
        .to(defaultLetters, {
          yPercent: -120,
          rotation: () => gsap.utils.random(-12, 12, 1),
          opacity: 0,
          duration: 0.28,
          stagger: {each: 0.026, from: 'random'},
          ease: 'power2.in'
        }, 0)
        .fromTo(alternateLetters, {
          yPercent: 120,
          rotation: () => gsap.utils.random(-13, 13, 1),
          scaleY: 0.62,
          opacity: 0
        }, {
          yPercent: 0,
          rotation: 0,
          scaleY: 1,
          opacity: 1,
          duration: 0.56,
          stagger: {each: 0.04, from: 'random'},
          ease: 'back.out(1.9)'
        }, 0.08);
    };

    const showDefault = () => {
      if (morphTimeline) morphTimeline.kill();
      gsap.killTweensOf([...defaultLetters, ...alternateLetters]);
      trigger.setAttribute('aria-label', defaultLabel);
      gsap.set(defaultWord, {autoAlpha: 1});
      gsap.set(alternateWord, {autoAlpha: 1});

      morphTimeline = gsap.timeline({
        onComplete: () => gsap.set(alternateWord, {autoAlpha: 0})
      })
        .to(alternateLetters, {
          yPercent: 120,
          rotation: () => gsap.utils.random(-10, 10, 1),
          opacity: 0,
          duration: 0.25,
          stagger: {each: 0.022, from: 'random'},
          ease: 'power2.in'
        }, 0)
        .fromTo(defaultLetters, {
          yPercent: -115,
          rotation: () => gsap.utils.random(-10, 10, 1),
          scaleY: 0.7,
          opacity: 0
        }, {
          yPercent: 0,
          rotation: 0,
          scaleY: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {each: 0.036, from: 'random'},
          ease: 'back.out(1.7)'
        }, 0.06);
    };

    const requestAlternate = () => {
      if (isReady) showAlternate();
    };
    const requestDefault = () => {
      if (isReady) showDefault();
    };

    if (bindHover) {
      trigger.addEventListener('pointerenter', requestAlternate);
      trigger.addEventListener('pointerleave', requestDefault);
    }

    return {
      leadLetters,
      defaultLetters,
      showAlternate: requestAlternate,
      showDefault: requestDefault,
      enable: () => {
        isReady = true;
        trigger.classList.add('is-word-morph-ready');
        gsap.set(defaultWord, {autoAlpha: 1});
        gsap.set(defaultLetters, {yPercent: 0, rotation: 0, scaleY: 1, opacity: 1});
        gsap.set(alternateWord, {autoAlpha: 0});
        if (bindHover && trigger.matches(':hover')) showAlternate();
      }
    };
  };

  if (!reducedMotion && window.gsap) {
    if (contactCue) gsap.set(contactCue, {'--cue-shift-x': '-16px', autoAlpha: 0});

    if (contactTitle) {
      contactTitleMorph = setupWordMorph({
        trigger: contactTitle,
        lead: contactTitle.querySelector('[data-contact-lead]'),
        switcher: contactTitle.querySelector('[data-contact-word-switch]'),
        letterClass: 'contact-title-letter',
        defaultLabel: "Let's Talk!",
        alternateLabel: "Let's Cuack!",
        bounceIntensity: 1,
        startReady: false,
        bindHover: false
      });

      if (contactTitleMorph) {
        contactTitleLetters = [...contactTitleMorph.leadLetters, ...contactTitleMorph.defaultLetters];
        gsap.set(contactTitleLetters, {
          yPercent: 125,
          rotation: () => gsap.utils.random(-12, 12, 1),
          skewX: () => gsap.utils.random(-10, 10, 1),
          scaleY: 0.58,
          opacity: 0
        });
      }
    }

    if (talkLabel) {
      setupWordMorph({
        trigger: talkLabel,
        lead: talkLabel.querySelector('[data-talk-lead]'),
        switcher: talkLabel.querySelector('[data-talk-word-switch]'),
        letterClass: 'talk-label-letter',
        defaultLabel: "Let's Talk!",
        alternateLabel: "Let's Cuack!",
        bounceIntensity: 0.72
      });
    }

    if (magneticButton) {
      magneticButton.addEventListener('pointerenter', () => contactTitleMorph?.showAlternate());
      magneticButton.addEventListener('pointerleave', () => contactTitleMorph?.showDefault());
      magneticButton.addEventListener('focus', () => contactTitleMorph?.showAlternate());
      magneticButton.addEventListener('blur', () => contactTitleMorph?.showDefault());
    }
  }

  if (contactSection) {
    contactSection.classList.add('is-ready');
    const contactObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        contactSection.classList.add('is-visible');
        if (contactCue && window.gsap && !reducedMotion) {
          gsap.to(contactCue, {
            '--cue-shift-x': '0px',
            autoAlpha: 1,
            duration: 0.72,
            ease: 'power2.out',
            clearProps: 'opacity,visibility'
          });
        }
        if (contactTitleLetters.length && window.gsap) {
          gsap.to(contactTitleLetters, {
            yPercent: 0,
            rotation: 0,
            skewX: 0,
            scaleY: 1,
            opacity: 1,
            duration: 0.82,
            stagger: {each: 0.052, from: 'random'},
            ease: 'back.out(1.8)',
            clearProps: 'transform,opacity',
            onComplete: () => {
              contactTitleMorph?.enable();
              if (magneticButton?.matches(':hover')) contactTitleMorph?.showAlternate();
            }
          });
        }
        observer.unobserve(contactSection);
      });
    }, {threshold: 0.22});
    contactObserver.observe(contactSection);
  }

  if (contactDialog && contactOpeners.length && typeof contactDialog.showModal === 'function') {
    let lastContactTrigger = null;
    let isDialogClosing = false;
    let contactDialogBackdropFrame = 0;
    let contactSubmitTimer = 0;
    const contactDialogParts = contactDialogShell
      ? Array.from(contactDialogShell.querySelectorAll('.contact-dialog-topline, .contact-dialog-heading, .contact-dialog-form'))
      : [];
    const contactFeedback = contactDialog.querySelector('[data-contact-feedback]');
    const contactSubmitButton = contactForm?.querySelector('.contact-dialog-submit');
    const contactSubmitLabel = contactForm?.querySelector('[data-contact-submit-label]');
    const contactMailLink = contactDialog.querySelector('[data-contact-mail-link]');
    const contactResetButton = contactDialog.querySelector('[data-contact-reset]');
    const contactControls = contactForm
      ? Array.from(contactForm.querySelectorAll('input, textarea'))
      : [];

    const resetContactExperience = () => {
      if (contactSubmitTimer) clearTimeout(contactSubmitTimer);
      contactSubmitTimer = 0;
      contactForm?.reset();
      contactForm?.classList.remove('is-submitting');
      if (contactForm) contactForm.hidden = false;
      if (contactFeedback) contactFeedback.hidden = true;
      if (contactSubmitButton) {
        contactSubmitButton.disabled = false;
        contactSubmitButton.removeAttribute('aria-busy');
      }
      if (contactSubmitLabel) contactSubmitLabel.textContent = 'SEND THE IDEA';
      contactControls.forEach((control) => {
        control.removeAttribute('aria-invalid');
        control.closest('label')?.classList.remove('has-error');
      });
    };

    const finishDialogClose = () => {
      if (contactDialogBackdropFrame) cancelAnimationFrame(contactDialogBackdropFrame);
      contactDialogBackdropFrame = 0;
      resetContactExperience();
      if (contactDialog.open) contactDialog.close();
      contactDialog.classList.remove('is-contact-dialog-visible');
      contactOverlay?.classList.remove('is-visible');
      document.body.classList.remove('is-contact-dialog-open');
      isDialogClosing = false;
      if (window.gsap) gsap.set([contactDialog, contactDialogShell, ...contactDialogParts].filter(Boolean), {clearProps: 'all'});
    };

    const closeContactDialog = () => {
      if (!contactDialog.open || isDialogClosing) return;
      isDialogClosing = true;
      if (contactSubmitTimer) clearTimeout(contactSubmitTimer);
      contactSubmitTimer = 0;
      if (contactDialogBackdropFrame) cancelAnimationFrame(contactDialogBackdropFrame);
      contactDialogBackdropFrame = 0;

      contactDialog.classList.remove('is-contact-dialog-visible');
      contactOverlay?.classList.remove('is-visible');

      if (!reducedMotion && window.gsap) {
        gsap.killTweensOf([contactDialog, ...contactDialogParts]);
        gsap.to(contactDialog, {
          y: 28,
          scale: 0.94,
          rotation: 0.8,
          autoAlpha: 0,
          duration: 0.28,
          ease: 'power3.in',
          onComplete: finishDialogClose
        });
      } else {
        finishDialogClose();
      }
    };

    const openContactDialog = (event) => {
      event.preventDefault();
      lastContactTrigger = event.currentTarget;
      if (!contactDialog.open) contactDialog.showModal();
      isDialogClosing = false;
      document.body.classList.add('is-contact-dialog-open');
      contactDialogBackdropFrame = requestAnimationFrame(() => {
        contactDialog.classList.add('is-contact-dialog-visible');
        contactOverlay?.classList.add('is-visible');
        contactDialogBackdropFrame = 0;
      });

      if (!reducedMotion && window.gsap) {
        gsap.killTweensOf([contactDialog, ...contactDialogParts]);
        gsap.fromTo(contactDialog, {
          y: 36,
          scale: 0.92,
          rotation: -1.2,
          autoAlpha: 0
        }, {
          y: 0,
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          duration: 0.52,
          ease: 'back.out(1.45)',
          clearProps: 'transform,opacity,visibility'
        });

        if (contactDialogParts.length) {
          gsap.fromTo(contactDialogParts, {
            y: 14,
            autoAlpha: 0
          }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.38,
            stagger: 0.055,
            delay: 0.08,
            ease: 'power2.out',
            clearProps: 'transform,opacity,visibility'
          });
        }
      }
    };

    contactOpeners.forEach((opener) => opener.addEventListener('click', openContactDialog));
    contactDialog.querySelectorAll('[data-contact-close]').forEach((button) => {
      button.addEventListener('click', closeContactDialog);
    });

    contactOverlay?.addEventListener('click', closeContactDialog);

    contactDialog.addEventListener('click', (event) => {
      if (event.target === contactDialog) closeContactDialog();
    });

    contactDialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeContactDialog();
    });

    contactDialog.addEventListener('close', () => {
      document.body.classList.remove('is-contact-dialog-open');
      if (lastContactTrigger?.isConnected) lastContactTrigger.focus({preventScroll: true});
    });

    contactControls.forEach((control) => {
      const field = control.closest('label');
      control.addEventListener('invalid', () => {
        control.setAttribute('aria-invalid', 'true');
        field?.classList.add('has-error');
      });
      control.addEventListener('input', () => {
        if (!control.validity.valid) return;
        control.removeAttribute('aria-invalid');
        field?.classList.remove('has-error');
      });
    });

    const showPreparedEmailState = (mailtoUrl) => {
      if (!contactForm || !contactFeedback) return;
      contactForm.classList.remove('is-submitting');
      contactForm.hidden = true;
      contactFeedback.hidden = false;
      if (contactSubmitButton) {
        contactSubmitButton.disabled = false;
        contactSubmitButton.removeAttribute('aria-busy');
      }
      if (contactSubmitLabel) contactSubmitLabel.textContent = 'SEND THE IDEA';
      if (contactMailLink) contactMailLink.href = mailtoUrl;

      if (!reducedMotion && window.gsap) {
        gsap.fromTo(contactFeedback, {
          y: 18,
          scale: 0.97,
          autoAlpha: 0
        }, {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.46,
          ease: 'back.out(1.5)',
          clearProps: 'transform,opacity,visibility'
        });
      }

      contactFeedback.focus({preventScroll: true});
    };

    contactResetButton?.addEventListener('click', () => {
      resetContactExperience();
      if (!reducedMotion && window.gsap && contactForm) {
        gsap.fromTo(contactForm, {y: 12, autoAlpha: 0}, {
          y: 0,
          autoAlpha: 1,
          duration: 0.35,
          ease: 'power2.out',
          clearProps: 'transform,opacity,visibility'
        });
      }
      requestAnimationFrame(() => contactControls[0]?.focus({preventScroll: true}));
    });

    contactForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const subject = `Project inquiry — ${name || 'PSINE website'}`;
      const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n');
      const mailtoUrl = `mailto:patricio.sine@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      contactForm.classList.add('is-submitting');
      if (contactSubmitButton) {
        contactSubmitButton.disabled = true;
        contactSubmitButton.setAttribute('aria-busy', 'true');
      }
      if (contactSubmitLabel) contactSubmitLabel.textContent = 'PREPARING EMAIL';

      contactSubmitTimer = window.setTimeout(() => {
        contactSubmitTimer = 0;
        showPreparedEmailState(mailtoUrl);
        window.location.href = mailtoUrl;
      }, reducedMotion ? 0 : 180);
    });
  }

  if (contactSection && contactButtonScene && magneticButton && !reducedMotion && window.matchMedia('(hover: hover)').matches) {
    const clampContactButton = (value, min, max) => Math.min(Math.max(value, min), max);
    let magneticFrame = 0;
    let targetX = 0;
    let targetY = 0;
    let targetRotate = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRotate = 0;

    const renderMagneticButton = () => {
      currentX += (targetX - currentX) * 0.11;
      currentY += (targetY - currentY) * 0.11;
      currentRotate += (targetRotate - currentRotate) * 0.1;
      magneticButton.style.setProperty('--button-x', `${currentX}px`);
      magneticButton.style.setProperty('--button-y', `${currentY}px`);
      magneticButton.style.setProperty('--button-rotate', `${currentRotate}deg`);

      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02 || Math.abs(targetRotate - currentRotate) > 0.02) {
        magneticFrame = requestAnimationFrame(renderMagneticButton);
      } else {
        magneticFrame = 0;
      }
    };

    const startMagneticRender = () => {
      if (!magneticFrame) magneticFrame = requestAnimationFrame(renderMagneticButton);
    };

    contactSection.addEventListener('pointermove', (event) => {
      const sceneRect = contactButtonScene.getBoundingClientRect();
      const pointerX = event.clientX - sceneRect.left - sceneRect.width / 2;
      const pointerY = event.clientY - sceneRect.top - sceneRect.height / 2;
      const normalizedX = clampContactButton(pointerX / (sceneRect.width / 2), -1, 1);
      const normalizedY = clampContactButton(pointerY / (sceneRect.height / 2), -1, 1);

      targetX = normalizedX * 20;
      targetY = normalizedY * 40;
      targetRotate = clampContactButton(normalizedX * 4.8 + normalizedY * 1.8, -6.5, 6.5);
      contactSection.classList.add('is-pointer-active');
      startMagneticRender();
    });

    contactSection.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      targetRotate = 0;
      contactSection.classList.remove('is-pointer-active');
      startMagneticRender();
    });
  }

  if (contactSparks.length && !reducedMotion && window.gsap) {
    const sparkTimelines = contactSparks.map((spark, index) => {
      const timeline = gsap.timeline({
        delay: index * 0.32,
        repeat: -1,
        repeatDelay: gsap.utils.random(0.14, 0.42),
        repeatRefresh: true
      });

      timeline
        .set(spark, {x: 0, y: 14, rotation: 0, scale: 0, opacity: 0})
        .to(spark, {
          x: () => gsap.utils.random(-100, 100, 1),
          y: () => gsap.utils.random(-100, -50, 1),
          rotation: () => gsap.utils.random(-34, 34, 1),
          scale: 1.14,
          opacity: 1,
          rotation: 180,
          duration: 0.8,
          ease: 'ease: "back.out(1.7)"'
        })

        .to(spark, {y: '-=2', scale: 1, duration: 0.14, ease: 'power1.out'})
        .to(spark, {y: '-=4', scale: 0, rotation: 200, duration: 0.3, ease: 'power1.in'});

      return timeline;
    });

    if (contactSection) {
      contactSection.addEventListener('pointerenter', () => {
        sparkTimelines.forEach((timeline) => timeline.timeScale(1.35));
      });
      contactSection.addEventListener('pointerleave', () => {
        sparkTimelines.forEach((timeline) => timeline.timeScale(1));
      });
    }
  }

  const workSection = document.querySelector('[data-work-section]');
  const workViewport = document.querySelector('[data-work-viewport]');
  const workRail = document.querySelector('[data-work-rail]');
  const workProgress = document.querySelector('[data-work-progress]');

  if (workSection && workViewport && workRail && typeof window.initPinnedHorizontalGallery === 'function') {
    window.initPinnedHorizontalGallery({
      section: workSection,
      sticky: workSection.querySelector('.work-sticky'),
      viewport: workViewport,
      progress: workProgress
    });
  }

  const serviceCards = Array.from(document.querySelectorAll('[data-service-card]'));
  const serviceClouds = Array.from(document.querySelectorAll('[data-cloud-speed]'));
  const servicesSection = document.querySelector('.services-section');
  const skillsSection = document.querySelector('.skills-section');

  if (serviceCards.length && servicesSection) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const easeInOut = (value) => value < 0.5
      ? 4 * value * value * value
      : 1 - Math.pow(-2 * value + 2, 3) / 2;
    let targetProgress = 0;
    let smoothProgress = 0;
    let ticking = false;
    const cloudScrollY = serviceClouds.map(() => 0);

    const renderServiceClouds = () => {
      serviceClouds.forEach((cloud, index) => {
        cloud.style.setProperty('--cloud-y', `${cloudScrollY[index]}px`);
      });
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
      const skillsRect = skillsSection ? skillsSection.getBoundingClientRect() : null;
      const skillsExit = skillsRect
        ? clamp((window.innerHeight * 0.5 - skillsRect.top) / (window.innerHeight * 0.25), 0, 1)
        : 0;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;

      serviceCards.forEach((card, index) => {
        const exit = index === serviceCards.length - 1
          ? skillsExit
          : clamp(step - index, 0, 1);
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
  }

  if (typeof gsap === 'undefined') return;

  const servicesDuckWrap = document.querySelector('.services-duck');
  const servicesDuck = document.querySelector('.services-duck-inner');

  const servicesArmLeft = document.querySelector('.services-arm-left');
  const servicesArmRight = document.querySelector('.services-arm-right');
  const servicesLegLeft = document.querySelector('.services-leg-left');
  const servicesLegRight = document.querySelector('.services-leg-right');
  const servicesBody = document.querySelector('.services-body');
  const servicesDuckParts = [
    servicesArmLeft,
    servicesArmRight,
    servicesLegLeft,
    servicesLegRight,
    servicesBody
  ].filter(Boolean);

  if (servicesDuckParts.length) {
    gsap.set(servicesDuckParts, {x: 0, y: 0});
  }

  if (servicesDuckWrap && servicesSection) {
    const clampDuckEntry = (value, min, max) => Math.min(Math.max(value, min), max);
    const moveServicesDuck = gsap.quickTo(servicesDuckWrap, 'y', {duration: 0.8, ease: 'power3.out'});

    const updateServicesDuckEntry = () => {
      const rect = servicesSection.getBoundingClientRect();
      const entryDistance = window.innerHeight * 0.7;
      const progress = clampDuckEntry((window.innerHeight - rect.top) / entryDistance, 0, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const skillsRect = skillsSection ? skillsSection.getBoundingClientRect() : null;
      const exitProgress = skillsRect
        ? clampDuckEntry((window.innerHeight * 0.5 - skillsRect.top) / (window.innerHeight * 0.25), 0, 1)
        : 0;
      const easedExit = exitProgress * exitProgress * (3 - 2 * exitProgress);
      const entryY = -1500 * (1 - easedProgress);
      const exitY = -window.innerHeight * 0.95 * easedExit;

      moveServicesDuck(entryY + exitY);
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

  const skillCards = [

    {
      id: 'front-end-development',
      label: 'DEV',
      title: 'FRONT-END DEVELOPMENT',
      color: 'yellow',
      capabilities: ['Responsive UI', 'Component Systems', 'Performance', 'Accessibility'],
      tools: ['React', 'Next.js', 'Astro', 'TypeScript', 'JavaScript', 'Tailwind', 'Material UI', 'SCSS', 'CSS Modules', 'Framer Motion', 'Vite', 'Git', 'Vercel', 'Firebase', 'Supabase']
    },
    {
      id: 'display-ads',
      label: 'ADS',
      title: 'DIGITAL ADVERTISING',
      color: 'blue',
      capabilities: ['Animated Banners', 'Display Campaigns', 'Responsive Creatives', 'Ad Optimization'],
      tools: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'SVG', 'Canvas', 'ClickTag', 'Polite Load', 'Google Ads', 'CM360', 'DV360', 'Yahoo', 'Sizmek', 'Media Specs', 'QA', 'File Weight']
    },    
    {
      id: 'playable-ads',
      label: 'ADS',
      title: 'PLAYABLE ADS',
      color: 'purple',
      capabilities: ['Mini Games', 'Game Logic', 'Rich Media', 'Interactive Ads'],
      tools: ['HTML5', 'JavaScript', 'Canvas', 'GSAP', 'Physics', 'Responsive', 'MRAID', 'ClickTag', 'Google Ads', 'DV360', 'Sizmek', 'Polite Load', 'Optimization', 'QA', 'Analytics', 'A/B Testing']
    },

    {
      id: 'email-development',
      label: 'EMAIL',
      title: 'EMAIL DEVELOPMENT',
      color: 'green',
      capabilities: ['Responsive Email', 'Cross-client', 'Dark Mode', 'Accessibility'],
      tools: ['HTML Email', 'CSS Inline', 'MJML', 'Litmus', 'Mailchimp', 'Brevo', 'Campaign Monitor', 'Outlook', 'Gmail', 'Apple Mail', 'Yahoo', 'Dark Mode', 'Preheader', 'QA', 'Testing']
    },    
    {
      id: 'creative-development',
      label: 'DEV',
      title: 'CREATIVE DEVELOPMENT',
      color: 'cyan',
      capabilities: ['Interactive Websites', 'Creative Coding', 'Motion Systems', 'AI Experiences'],
      tools: ['React', 'Next.js', 'GSAP', 'Three.js', 'Tailwind', 'TypeScript', 'Astro', 'Vite', 'HTML5', 'CSS3', 'SVG', 'WebGL', 'Git', 'Vercel', 'Cursor']
    },    
    {
      id: 'motion-systems',
      label: 'MOTION',
      title: 'MOTION SYSTEMS',
      color: 'red',
      capabilities: ['Scroll Animation', 'Microinteractions', 'UI Animation', 'Page Transitions'],
      tools: ['GSAP', 'ScrollTrigger', 'Lenis', 'Lottie', 'SVG', 'Canvas', 'Timeline', 'Easing', 'Parallax', 'Rive', 'Three.js', 'Splitting.js', 'EasePack', 'Motion Path', 'Observer', 'Flip']
    },
    {
      id: 'creative-suite',
      label: 'TOOLS',
      title: 'CREATIVE SUITE',
      color: 'violet',
      capabilities: ['Graphic Design', 'Motion Design', 'Video Editing', 'Brand Assets'],
      tools: ['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Adobe Animate', 'Lightroom', 'Figma', 'Rive', 'LottieFiles', 'Blender']
    },
    {
      id: 'ai-automation',
      label: 'AI',
      title: 'AI',
      color: 'pink',
      capabilities: ['AI Assistants', 'Workflow Automation', 'Internal Tools', 'AI Prototypes'],
      tools: ['OpenAI', 'Claude', 'MCP', 'Agents', 'Prompt Engineering', 'RAG', 'Make', 'n8n', 'Zapier', 'Webhooks', 'REST APIs', 'JSON', 'Cursor', 'Codex', 'GitHub Copilot', 'Notion']
    },    
    {
      id: 'languages',
      label: 'LANG',
      title: 'LANGUAGES',
      color: 'orange',
      capabilities: ['Spanish Native', 'English B2', 'Technical English', 'Client Communication'],
      tools: ['Spanish', 'English', 'Documentation', 'Technical Briefs', 'Client Emails', 'Presentations']
    }
  ];

  const skillsViewport = document.querySelector('[data-skill-viewport]');
  const skillsRail = document.querySelector('[data-skill-rail]');
  if (skillsRail) {
    const formatSkillTitle = (title) => {
      if (title === 'UI / UX DESIGN') return 'UI / UX<br>DESIGN';
      if (title.includes(' & ')) return title.replace(' & ', '<br>& ');
      const words = title.split(' ');
      if (words.length <= 2) return words.join('<br>');
      return `${words.slice(0, -1).join(' ')}<br>${words[words.length - 1]}`;
    };

    const cardsMarkup = skillCards.map((card, index) => {
      const number = String(index + 1).padStart(2, '0');
      const title = formatSkillTitle(card.title);
      const capabilities = card.capabilities.map((item) => `<li>${item}</li>`).join('');
      const tools = card.tools.map((tool) => `<li>${tool}</li>`).join('');

      return `
        <article class="skill-tag skill-tag-${card.color}" data-skill-id="${card.id}">
          <div class="skill-pin"><span></span></div>
          <p class="skill-label">${card.label}<span>${number}</span></p>
          <div class="skill-card-symbol" aria-hidden="true">${card.label.slice(0, 2)}</div>
          <h3>${title}</h3>
          <ul class="skill-capabilities">${capabilities}</ul>
          <ul class="skill-tools">${tools}</ul>
          <small>EST. 2020</small>
        </article>
      `;
    }).join('');

    skillsRail.innerHTML = cardsMarkup;
  }
  const skillsSegmentLayer = document.querySelector('[data-skill-segment-layer]');
  const skillTags = skillsRail ? Array.from(skillsRail.querySelectorAll('.skill-tag')) : [];

  if (skillsViewport && skillsRail && skillTags.length) {
    const skillsSticky = skillsViewport.closest('.skills-sticky');
    const skillSegments = skillsSegmentLayer
      ? skillTags.map(() => {
        const segment = document.createElement('span');
        segment.className = 'skill-rope-segment';
        skillsSegmentLayer.appendChild(segment);
        return segment;
      })
      : [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let minX = 0;
    let maxX = 0;
    let currentX = 0;
    let targetX = 0;
    let velocity = 0;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let scrollPreviewX = 0;
    let scrollHandoffActive = false;
    let scrollHandoffPending = false;
    let scrollHandoffProgress = 0;
    let scrollHandoffX = 0;
    const cardPhysics = skillTags.map((_, index) => ({
      angle: (index - (skillTags.length - 1) / 2) * 0.22,
      angularVelocity: 0,
      offset: (index - (skillTags.length - 1) / 2) * 0.22
    }));

    const clampSkillRail = (value, min, max) => Math.min(Math.max(value, min), max);

    const measureSkillsRail = () => {
      const viewportWidth = skillsViewport.clientWidth;
      const railWidth = skillsRail.scrollWidth;
      maxX = 0;
      minX = Math.min(viewportWidth - railWidth, 0);
      const railStyles = getComputedStyle(skillsRail);
      const cardGap = parseFloat(railStyles.columnGap || railStyles.gap) || 0;
      const cardStride = skillTags[0].offsetWidth + cardGap;
      scrollPreviewX = Math.max(minX, -cardStride * 1.25);
      targetX = clampSkillRail(targetX, minX, maxX);
      currentX = clampSkillRail(currentX, minX, maxX);
      gsap.set(skillsRail, {x: currentX});
      readSkillsScroll();
    };

    const readSkillsScroll = () => {
      if (isDragging || prefersReducedMotion) return;

      const section = skillsSection || skillsViewport;
      const rect = section.getBoundingClientRect();
      const pinnedHeight = skillsSticky?.offsetHeight || window.innerHeight;
      const travel = Math.max(1, rect.height - pinnedHeight);
      const progress = clampSkillRail(-rect.top / travel, 0, 1);
      const easedProgress = progress * progress * (3 - 2 * progress);

      if (easedProgress <= 0.001) {
        scrollHandoffActive = false;
        scrollHandoffPending = false;
      } else if (scrollHandoffPending) {
        scrollHandoffProgress = easedProgress;
        scrollHandoffX = currentX;
        scrollHandoffActive = true;
        scrollHandoffPending = false;
      }

      if (scrollHandoffActive) {
        if (easedProgress <= scrollHandoffProgress) {
          const returnProgress = scrollHandoffProgress > 0.001
            ? easedProgress / scrollHandoffProgress
            : 0;
          targetX = scrollHandoffX * returnProgress;
        } else {
          const forwardProgress = (easedProgress - scrollHandoffProgress)
            / Math.max(0.001, 1 - scrollHandoffProgress);
          targetX = scrollHandoffX + (scrollPreviewX - scrollHandoffX) * forwardProgress;
        }
      } else {
        targetX = scrollPreviewX * easedProgress;
      }
      velocity = 0;
    };

    const updateSkillSegments = () => {
      if (!skillSegments.length) return;

      const gap = parseFloat(getComputedStyle(skillsRail).columnGap || getComputedStyle(skillsRail).gap) || 0;
      skillTags.forEach((tag, index) => {
        const holeRadius = 15;
        const segmentStart = tag.offsetLeft + currentX + tag.offsetWidth / 2 + holeRadius;
        const segmentWidth = tag.offsetWidth / 2 + gap / 2 - holeRadius;

        gsap.set(skillSegments[index], {
          x: segmentStart,
          width: segmentWidth
        });
      });
    };

    const applySkillResistance = (value) => {
      if (value > maxX) return maxX + (value - maxX) * 0.28;
      if (value < minX) return minX + (value - minX) * 0.28;
      return value;
    };

    const settleSkillRail = () => {
      if (targetX > maxX) {
        velocity += (maxX - targetX) * 0.12;
      } else if (targetX < minX) {
        velocity += (minX - targetX) * 0.12;
      }
    };

    const renderSkillsRail = () => {
      if (!isDragging) {
        targetX += velocity;
        velocity *= 0.3;
        settleSkillRail();
      }

      currentX += (targetX - currentX) * (isDragging ? 0.22 : 0.16);
      gsap.set(skillsRail, {x: currentX});

      const sway = prefersReducedMotion ? 0 : clampSkillRail((targetX - currentX) * 0.055 + velocity * 0.28, -10, 10);
      skillTags.forEach((tag, index) => {
        const physics = cardPhysics[index];
        const targetAngle = prefersReducedMotion ? 0 : sway + physics.offset;
        const spring = isDragging ? 0.18 : 0.065;
        const damping = isDragging ? 0.7 : 0.9;

        physics.angularVelocity += (targetAngle - physics.angle) * spring;
        physics.angularVelocity *= damping;
        physics.angle += physics.angularVelocity;

        gsap.set(tag, {
          rotation: physics.angle,
          y: 0
        });
      });
      updateSkillSegments();

      requestAnimationFrame(renderSkillsRail);
    };

    const onSkillsPointerDown = (event) => {
      scrollHandoffActive = false;
      scrollHandoffPending = false;
      isDragging = true;
      velocity = 0;
      targetX = currentX;
      lastPointerX = event.clientX;
      lastPointerTime = performance.now();
      skillsViewport.classList.add('is-dragging');
      skillsViewport.setPointerCapture(event.pointerId);
    };

    const onSkillsPointerMove = (event) => {
      if (!isDragging) return;

      const now = performance.now();
      const deltaX = event.clientX - lastPointerX;
      const deltaTime = Math.max(now - lastPointerTime, 16);
      const normalizedDelta = deltaX * (16 / deltaTime);

      velocity = velocity * 0.72 + normalizedDelta * 0.28;
      targetX = applySkillResistance(targetX + deltaX);
      lastPointerX = event.clientX;
      lastPointerTime = now;
    };

    const onSkillsPointerUp = (event) => {
      if (!isDragging) return;

      isDragging = false;
      scrollHandoffPending = true;
      velocity = clampSkillRail(velocity, -42, 42);
      if (!prefersReducedMotion) {
        cardPhysics.forEach((physics, index) => {
          const directionOffset = (index - (cardPhysics.length - 1) / 2) * 0.015;
          physics.angularVelocity += velocity * 0.045 + directionOffset;
        });
      }
      skillsViewport.classList.remove('is-dragging');
      if (skillsViewport.hasPointerCapture(event.pointerId)) {
        skillsViewport.releasePointerCapture(event.pointerId);
      }
    };

    measureSkillsRail();
    window.addEventListener('scroll', readSkillsScroll, {passive: true});
    window.addEventListener('resize', measureSkillsRail);
    skillsViewport.addEventListener('pointerdown', onSkillsPointerDown);
    skillsViewport.addEventListener('pointermove', onSkillsPointerMove);
    skillsViewport.addEventListener('pointerup', onSkillsPointerUp);
    skillsViewport.addEventListener('pointercancel', onSkillsPointerUp);
    requestAnimationFrame(renderSkillsRail);
  }

  const duckHop = document.querySelector('.duck-hop');
  const duck = document.querySelector('.duck-mascot');
  const armLeft = document.querySelector('.duck-arm-left');
  const armRight = document.querySelector('.duck-arm-right');
  const legLeft = document.querySelector('.duck-leg-left');
  const legRight = document.querySelector('.duck-leg-right');
  const body = document.querySelector('.duck-body');
  const head = document.querySelector('.duck-head');
  const headNod = document.querySelector('.duck-head-nod');
  const headTrack = document.querySelector('.duck-head-track');
  const shadow = document.querySelector('.duck-shadow');
  const heroDuckParts = [armLeft, armRight, legLeft, legRight, body, head].filter(Boolean);

  if (heroDuckParts.length) {
    gsap.set(heroDuckParts, {x: 0, y: 0});
  }

  const enter = gsap.timeline({defaults:{duration:0.8, ease:'power3.out'}});

  // entrance: fade + parts stagger
  enter.from(duck, {autoAlpha:0, y:40, scale:0.96, duration:0.9});
  //enter.from(['.duck-body','.duck-head','.duck-arm-left','.duck-arm-right','.duck-leg-left','.duck-leg-right'], {autoAlpha:0, y:18, stagger:0.08}, '-=0.5');

  
  gsap.set(armLeft, {transformOrigin: '37.33% 61.49%'});
  gsap.set(body, {transformOrigin: '49.87% 72.89%'});

  // quick playful movements on enter
  enter.to(armLeft, {rotation: 10,  duration:0.5, yoyo:true, repeat: -1, ease:'sine.inOut'}, '<');
  enter.to(armRight, {rotation: 3, transformOrigin:'50% 50%', duration:0.5, yoyo:true, repeat: -1, ease:'sine.inOut'}, '<');
  enter.to(duck, {y:-6, duration:0.6, yoyo:true, repeat:3, ease:'sine.inOut'}, '-=0.6');

  // idle loop: subtle bob and shadow squash
    gsap.to('.duck-mascot', {y: -150, scaleX: 0.93, duration: 0.6, ease:'power2.inOut', yoyo:true, repeat:-1});
    gsap.to(legLeft, {rotation: -4, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1});
    gsap.to(legRight, {rotation: 4, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1});
    gsap.to(body, {y: 10, rotation: 5, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 0.6});
    gsap.to(head, {y: 5, x: 15, rotation: 3, duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 0.6});
    gsap.to('.duck-mascot', {scaleY: 0.98, transformOrigin:' 50% 100%', duration: 0.6, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 0.6});


  gsap.to('.duck-shadow', {scaleX:0.75, autoAlpha: 0.6, duration: 0.6, yoyo:true, repeat:-1, transformOrigin:'center'});

  // small head float / look
  gsap.to(headNod, {rotation: -4, duration:3, ease:'sine.inOut', yoyo:true, repeat:-1, transformOrigin:'51.58% 39.70%'});


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
