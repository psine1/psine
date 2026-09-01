document.addEventListener('DOMContentLoaded', () => {
  const contactSection = document.querySelector('[data-contact-section]');
  const contactButtonScene = document.querySelector('[data-contact-cta-scene]');
  const magneticButton = document.querySelector('[data-magnetic-button]');
  const contactCue = document.querySelector('.contact-cue');
  const contactSparks = Array.from(document.querySelectorAll('.contact-spark'));
  const contactTitle = document.querySelector('[data-contact-title]');
  const contactDialog = document.querySelector('[data-contact-dialog]');
  const contactOverlay = document.querySelector('[data-contact-overlay]');
  const contactDialogShell = document.querySelector('[data-contact-dialog-shell]');
  const contactOpeners = Array.from(document.querySelectorAll('[data-contact-open]'));
  const contactForm = document.querySelector('[data-contact-form]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  const playLetterBounce = (letters) => {
    if (!letters.length || reducedMotion || !window.gsap) return;
    gsap.killTweensOf(letters);
    gsap.timeline()
      .to(letters, {
        y: () => gsap.utils.random(-7, 4, 1),
        rotation: () => gsap.utils.random(-9, 9, 1),
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

  const setupContactTitleMorph = () => {
    if (!contactTitle || reducedMotion || !window.gsap) return null;
    const lead = contactTitle.querySelector('[data-contact-lead]');
    const switcher = contactTitle.querySelector('[data-contact-word-switch]');
    const defaultWord = switcher?.querySelector('[data-word-default]');
    const alternateWord = switcher?.querySelector('[data-word-alternate]');
    if (!lead || !defaultWord || !alternateWord) return null;

    const leadLetters = splitTextIntoLetters(lead, 'contact-title-letter');
    const defaultLetters = splitTextIntoLetters(defaultWord, 'contact-title-letter');
    const alternateLetters = splitTextIntoLetters(alternateWord, 'contact-title-letter');
    let morphTimeline = null;
    let isReady = false;

    contactTitle.classList.add('has-gsap-word-morph');
    gsap.set(alternateWord, {autoAlpha: 0});
    gsap.set(alternateLetters, {yPercent: 120, opacity: 0});

    const showAlternate = () => {
      if (!isReady) return;
      morphTimeline?.kill();
      gsap.killTweensOf([...defaultLetters, ...alternateLetters]);
      contactTitle.setAttribute('aria-label', "Let's Cuack!");
      gsap.set([defaultWord, alternateWord], {autoAlpha: 1});
      playLetterBounce(leadLetters);
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
      if (!isReady) return;
      morphTimeline?.kill();
      gsap.killTweensOf([...defaultLetters, ...alternateLetters]);
      contactTitle.setAttribute('aria-label', "Let's Talk!");
      gsap.set([defaultWord, alternateWord], {autoAlpha: 1});
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

    return {
      leadLetters,
      defaultLetters,
      showAlternate,
      showDefault,
      enable: () => {
        isReady = true;
        contactTitle.classList.add('is-word-morph-ready');
        gsap.set(defaultWord, {autoAlpha: 1});
        gsap.set(defaultLetters, {yPercent: 0, rotation: 0, scaleY: 1, opacity: 1});
        gsap.set(alternateWord, {autoAlpha: 0});
      }
    };
  };

  if (!reducedMotion && window.gsap) {
    contactTitleMorph = setupContactTitleMorph();
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

    magneticButton?.addEventListener('pointerenter', () => contactTitleMorph?.showAlternate());
    magneticButton?.addEventListener('pointerleave', () => contactTitleMorph?.showDefault());
    magneticButton?.addEventListener('focus', () => contactTitleMorph?.showAlternate());
    magneticButton?.addEventListener('blur', () => contactTitleMorph?.showDefault());
  }

  if (contactSection) {
    contactSection.classList.add('is-ready');
    const contactObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        contactSection.classList.add('is-visible');

        if (contactCue && window.gsap && !reducedMotion) {
          gsap.fromTo(contactCue, {'--cue-shift-x': '-16px', autoAlpha: 0}, {
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
      if (window.gsap) {
        gsap.set([contactDialog, contactDialogShell, ...contactDialogParts].filter(Boolean), {clearProps: 'all'});
      }
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
          gsap.fromTo(contactDialogParts, {y: 14, autoAlpha: 0}, {
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
      contactOverlay?.classList.remove('is-visible');
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
        gsap.fromTo(contactFeedback, {y: 18, scale: 0.97, autoAlpha: 0}, {
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
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
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
      const normalizedX = clamp(pointerX / (sceneRect.width / 2), -1, 1);
      const normalizedY = clamp(pointerY / (sceneRect.height / 2), -1, 1);
      targetX = normalizedX * 20;
      targetY = normalizedY * 40;
      targetRotate = clamp(normalizedX * 4.8 + normalizedY * 1.8, -6.5, 6.5);
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
          rotation: 180,
          scale: 1.14,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)'
        })
        .to(spark, {y: '-=2', scale: 1, duration: 0.14, ease: 'power1.out'})
        .to(spark, {y: '-=4', scale: 0, rotation: 200, duration: 0.3, ease: 'power1.in'});
      return timeline;
    });

    contactSection?.addEventListener('pointerenter', () => {
      sparkTimelines.forEach((timeline) => timeline.timeScale(1.35));
    });
    contactSection?.addEventListener('pointerleave', () => {
      sparkTimelines.forEach((timeline) => timeline.timeScale(1));
    });
  }
});
