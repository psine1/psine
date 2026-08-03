// GSAP timeline for the duck mascot
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.remove();

  const workSection = document.querySelector('[data-work-section]');
  const workViewport = document.querySelector('[data-work-viewport]');
  const workRail = document.querySelector('[data-work-rail]');
  const workProgress = document.querySelector('[data-work-progress]');

  if (workSection && workViewport && workRail) {
    const workCards = Array.from(workRail.querySelectorAll('.work-card'));
    const workCardInners = workCards.map((card) => card.querySelector('.work-card-inner'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clampWork = (value, min, max) => Math.min(Math.max(value, min), max);
    const easeOutWork = (value) => 1 - Math.pow(1 - value, 3);
    let minX = 0;
    let targetX = 0;
    let currentX = 0;
    let velocity = 0;
    let pointerDown = false;
    let isDragging = false;
    let didDrag = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;

    const measureWork = () => {
      minX = Math.min(workViewport.clientWidth - workRail.scrollWidth, 0);
      targetX = clampWork(targetX, minX, 0);
      currentX = clampWork(currentX, minX, 0);
      const horizontalTravel = Math.abs(minX);
      const scrollTravel = Math.max(window.innerHeight * 1.7, horizontalTravel * 1.18);
      workSection.style.height = `${window.innerHeight + scrollTravel}px`;
      readWorkScroll();
    };

    const readWorkScroll = () => {
      if (isDragging || pointerDown) return;
      const rect = workSection.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clampWork(-rect.top / travel, 0, 1);
      targetX = minX * progress;
      velocity = 0;
    };

    const renderWork = () => {
      if (!isDragging && Math.abs(velocity) > 0.02) {
        targetX = clampWork(targetX + velocity, minX, 0);
        velocity *= 0.9;
      }

      currentX += (targetX - currentX) * (isDragging ? 0.24 : 0.12);
      workRail.style.transform = `translate3d(${currentX}px, 0, 0)`;

      const viewportWidth = workViewport.clientWidth;
      workCards.forEach((card, index) => {
        const cardLeft = card.offsetLeft + currentX;
        const enterProgress = clampWork((viewportWidth - cardLeft) / (viewportWidth * 0.62), 0, 1);
        const settled = prefersReducedMotion ? 1 : easeOutWork(enterProgress);
        const direction = index % 2 === 0 ? 1 : -1;
        const y = (1 - settled) * (44 + index * 9);
        const rotation = (1 - settled) * direction * 2.8;
        const scale = 0.965 + settled * 0.035;
        const inner = workCardInners[index];

        if (inner) {
          inner.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
          inner.style.opacity = `${0.72 + settled * 0.28}`;
        }
      });

      if (workProgress) {
        const progress = minX === 0 ? 1 : clampWork(currentX / minX, 0, 1);
        workProgress.style.transform = `scaleX(${progress})`;
      }

      requestAnimationFrame(renderWork);
    };

    const onWorkPointerDown = (event) => {
      pointerDown = true;
      isDragging = false;
      didDrag = false;
      startX = event.clientX;
      startY = event.clientY;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;
    };

    const onWorkPointerMove = (event) => {
      if (!pointerDown) return;
      const totalX = event.clientX - startX;
      const totalY = event.clientY - startY;

      if (!isDragging && Math.abs(totalX) > 6 && Math.abs(totalX) > Math.abs(totalY)) {
        isDragging = true;
        didDrag = true;
        targetX = currentX;
        workViewport.classList.add('is-dragging');
        workViewport.setPointerCapture(event.pointerId);
      }

      if (!isDragging) return;
      event.preventDefault();
      const now = performance.now();
      const delta = event.clientX - lastX;
      const elapsed = Math.max(now - lastTime, 16);
      targetX = clampWork(targetX + delta, minX, 0);
      velocity = velocity * 0.65 + delta * (16 / elapsed) * 0.35;
      lastX = event.clientX;
      lastTime = now;
    };

    const onWorkPointerUp = (event) => {
      if (!pointerDown) return;
      pointerDown = false;
      if (isDragging) {
        isDragging = false;
        velocity = clampWork(velocity * 1.8, -36, 36);
        workViewport.classList.remove('is-dragging');
        if (workViewport.hasPointerCapture(event.pointerId)) {
          workViewport.releasePointerCapture(event.pointerId);
        }
      }
    };

    workViewport.addEventListener('pointerdown', onWorkPointerDown);
    workViewport.addEventListener('pointermove', onWorkPointerMove, {passive: false});
    workViewport.addEventListener('pointerup', onWorkPointerUp);
    workViewport.addEventListener('pointercancel', onWorkPointerUp);
    workViewport.addEventListener('click', (event) => {
      if (!didDrag) return;
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
    }, true);
    workViewport.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? -1 : 1;
      targetX = clampWork(targetX + direction * workViewport.clientWidth * 0.55, minX, 0);
      velocity = 0;
    });

    window.addEventListener('scroll', readWorkScroll, {passive: true});
    window.addEventListener('resize', measureWork);
    measureWork();
    requestAnimationFrame(renderWork);
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
