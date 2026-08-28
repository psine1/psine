document.addEventListener('DOMContentLoaded', () => {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const progress = document.querySelector('[data-cs2-progress]');
	const year = document.querySelector('[data-cs2-year]');
	const video = document.querySelector('[data-cs2-video]');
	const videoToggle = document.querySelector('[data-cs2-video-toggle]');
	const videoScrubber = document.querySelector('[data-cs2-video-scrubber]');
	const gallery = document.querySelector('[data-cs2-gallery]');
	const galleryProgress = document.querySelector('[data-cs2-gallery-progress]');
	const productSection = document.querySelector('.cs2-product');
	const productSticky = document.querySelector('.cs2-product-sticky');
	const challengeSection = document.querySelector('.cs2-challenge');
	const challengeCards = Array.from(document.querySelectorAll('.cs2-challenge-grid article'));
	let galleryMaxScroll = () => 0;
	let syncGalleryProgress = () => {};
	let galleryScrollTrigger = null;
	let syncPinnedScrollPosition = () => {};

	if (year) year.textContent = String(new Date().getFullYear());

	const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

	const updatePageProgress = () => {
		if (!progress) return;
		const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
		progress.style.transform = `scaleX(${clamp(window.scrollY / scrollable, 0, 1)})`;
	};

	window.addEventListener('scroll', updatePageProgress, {passive: true});
	window.addEventListener('resize', updatePageProgress);
	updatePageProgress();

	if (video && videoScrubber) {
		let pointerDown = false;
		let scrubbing = false;
		let wasPlaying = false;
		let manuallyPaused = false;
		let startX = 0;
		let startY = 0;
		let startTime = 0;

		const syncVideoButton = () => {
			if (!videoToggle) return;
			videoToggle.classList.toggle('is-paused', video.paused);
			videoToggle.setAttribute('aria-label', video.paused ? 'Reproducir video' : 'Pausar video');
		};

		const playVideo = () => video.play().catch(syncVideoButton);

		videoToggle?.addEventListener('click', () => {
			if (video.paused) {
				manuallyPaused = false;
				playVideo();
			} else {
				manuallyPaused = true;
				video.pause();
			}
		});

		video.addEventListener('play', syncVideoButton);
		video.addEventListener('pause', syncVideoButton);

		videoScrubber.addEventListener('pointerdown', (event) => {
			if (event.button !== 0 || event.target.closest('[data-cs2-video-toggle]')) return;
			pointerDown = true;
			scrubbing = false;
			wasPlaying = !video.paused;
			startX = event.clientX;
			startY = event.clientY;
			startTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
		});

		videoScrubber.addEventListener('pointermove', (event) => {
			if (!pointerDown) return;
			const deltaX = event.clientX - startX;
			const deltaY = event.clientY - startY;

			if (!scrubbing && Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
				scrubbing = true;
				video.pause();
				videoScrubber.classList.add('is-scrubbing');
				videoScrubber.setPointerCapture(event.pointerId);
			}

			if (!scrubbing || !Number.isFinite(video.duration) || video.duration <= 0) return;
			event.preventDefault();
			const deltaTime = (deltaX / Math.max(videoScrubber.clientWidth, 1)) * video.duration;
			video.currentTime = clamp(startTime + deltaTime, 0, Math.max(video.duration - 0.05, 0));
		}, {passive: false});

		const finishScrub = (event) => {
			if (!pointerDown) return;
			pointerDown = false;
			if (!scrubbing) return;
			scrubbing = false;
			videoScrubber.classList.remove('is-scrubbing');
			if (videoScrubber.hasPointerCapture(event.pointerId)) videoScrubber.releasePointerCapture(event.pointerId);
			if (wasPlaying && !manuallyPaused) playVideo();
		};

		videoScrubber.addEventListener('pointerup', finishScrub);
		videoScrubber.addEventListener('pointercancel', finishScrub);

		if ('IntersectionObserver' in window) {
			const videoObserver = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting && !manuallyPaused) playVideo();
				if (!entry.isIntersecting) video.pause();
			}, {threshold: 0.15});
			videoObserver.observe(video);
		}

		if (reducedMotion) {
			manuallyPaused = true;
			video.pause();
		}

		syncVideoButton();
	}

	if (gallery) {
		let pointerDown = false;
		let dragging = false;
		let startX = 0;
		let startY = 0;
		let startScroll = 0;
		let lastX = 0;
		let lastTime = 0;
		let velocity = 0;
		let inertiaFrame = 0;

		galleryMaxScroll = () => Math.max(gallery.scrollWidth - gallery.clientWidth, 0);

		syncGalleryProgress = () => {
			if (!galleryProgress) return;
			const maximum = galleryMaxScroll();
			galleryProgress.style.transform = `scaleX(${maximum ? gallery.scrollLeft / maximum : 1})`;
		};

		const runInertia = () => {
			velocity *= 0.92;
			gallery.scrollLeft -= velocity;
			syncPinnedScrollPosition();
			if (Math.abs(velocity) > 0.25 && gallery.scrollLeft > 0 && gallery.scrollLeft < galleryMaxScroll()) {
				inertiaFrame = requestAnimationFrame(runInertia);
			} else {
				inertiaFrame = 0;
			}
		};

		gallery.addEventListener('pointerdown', (event) => {
			if (event.button !== 0) return;
			if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
			pointerDown = true;
			dragging = false;
			startX = event.clientX;
			startY = event.clientY;
			startScroll = gallery.scrollLeft;
			lastX = event.clientX;
			lastTime = performance.now();
			velocity = 0;
		});

		gallery.addEventListener('pointermove', (event) => {
			if (!pointerDown) return;
			const deltaX = event.clientX - startX;
			const deltaY = event.clientY - startY;

			if (!dragging && Math.abs(deltaX) > 7 && Math.abs(deltaX) > Math.abs(deltaY)) {
				dragging = true;
				gallery.classList.add('is-dragging');
				gallery.setPointerCapture(event.pointerId);
			}

			if (!dragging) return;
			event.preventDefault();
			gallery.scrollLeft = startScroll - deltaX;
			syncPinnedScrollPosition();
			const now = performance.now();
			const elapsed = Math.max(now - lastTime, 16);
			velocity = velocity * 0.65 + (event.clientX - lastX) * (16 / elapsed) * 0.35;
			lastX = event.clientX;
			lastTime = now;
		}, {passive: false});

		const finishGalleryDrag = (event) => {
			if (!pointerDown) return;
			pointerDown = false;
			if (!dragging) return;
			dragging = false;
			gallery.classList.remove('is-dragging');
			if (gallery.hasPointerCapture(event.pointerId)) gallery.releasePointerCapture(event.pointerId);
			velocity *= 1.8;
			inertiaFrame = requestAnimationFrame(runInertia);
		};

		gallery.addEventListener('pointerup', finishGalleryDrag);
		gallery.addEventListener('pointercancel', finishGalleryDrag);
		gallery.addEventListener('scroll', syncGalleryProgress, {passive: true});
		gallery.addEventListener('keydown', (event) => {
			if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
			event.preventDefault();
			const direction = event.key === 'ArrowRight' ? 1 : -1;
			if (galleryScrollTrigger?.isActive) {
				window.scrollBy({
					top: direction * (galleryScrollTrigger.end - galleryScrollTrigger.start) * 0.24,
					behavior: reducedMotion ? 'auto' : 'smooth'
				});
				return;
			}
			gallery.scrollBy({
				left: direction * gallery.clientWidth * 0.72,
				behavior: reducedMotion ? 'auto' : 'smooth'
			});
		});

		window.addEventListener('resize', syncGalleryProgress);
		syncGalleryProgress();
	}

	if (window.gsap && window.ScrollTrigger && !reducedMotion) {
		window.gsap.registerPlugin(window.ScrollTrigger);
		document.documentElement.classList.add('cs2-has-motion');

		const heroTimeline = window.gsap.timeline({defaults: {ease: 'power3.out'}});
		heroTimeline
			.from('.cs2-hero-title > *', {y: 70, opacity: 0, duration: 1, stagger: 0.12})
			.from('.cs2-project-summary', {y: 48, opacity: 0, duration: 0.85}, '<0.2')
			.from('.cs2-hero-media', {y: 90, opacity: 0, scale: 0.96, duration: 1.1}, '<0.12');

		window.gsap.utils.toArray('[data-cs2-reveal]').forEach((element) => {
			if (element.closest('.cs2-hero')) return;
			window.gsap.from(element, {
				y: 64,
				opacity: 0,
				duration: 0.9,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: element,
					start: 'top 88%',
					once: true
				}
			});
		});

		window.gsap.utils.toArray('[data-cs2-cloud]').forEach((cloud, index) => {
			window.gsap.to(cloud, {
				'--cloud-scroll-y': `${90 + index * 35}px`,
				ease: 'none',
				scrollTrigger: {
					trigger: '.cs2-hero',
					start: 'top top',
					end: 'bottom top',
					scrub: 0.8
				}
			});
		});

		window.gsap.from('.cs2-gallery-card', {
			x: 120,
			opacity: 0,
			rotation: 1.4,
			duration: 0.95,
			stagger: 0.1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.cs2-gallery',
				start: 'top 84%',
				once: true
			}
		});

		if (gallery && productSection && productSticky) {
			const galleryMedia = window.gsap.matchMedia();
			galleryMedia.add('(min-width: 761px)', () => {
				const horizontalTween = window.gsap.to(gallery, {
					scrollLeft: () => galleryMaxScroll(),
					ease: 'none',
					scrollTrigger: {
						trigger: productSection,
						start: 'top top',
						end: () => `+=${Math.max(galleryMaxScroll() * 1.12, window.innerHeight * 1.5)}`,
						pin: productSticky,
						scrub: 0.75,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: syncGalleryProgress,
						onRefresh: syncGalleryProgress
					}
				});

				galleryScrollTrigger = horizontalTween.scrollTrigger;
				syncPinnedScrollPosition = () => {
					if (!galleryScrollTrigger || galleryScrollTrigger.isActive === false) return;
					const maximum = galleryMaxScroll();
					if (!maximum) return;
					const targetScroll = galleryScrollTrigger.start
						+ (gallery.scrollLeft / maximum) * (galleryScrollTrigger.end - galleryScrollTrigger.start);
					if (Math.abs(window.scrollY - targetScroll) > 1) window.scrollTo(0, targetScroll);
				};

				return () => {
					galleryScrollTrigger = null;
					syncPinnedScrollPosition = () => {};
					gallery.scrollLeft = 0;
				};
			});
		}

		if (challengeSection && challengeCards.length > 1) {
			const challengeMedia = window.gsap.matchMedia();
			challengeMedia.add('(max-width: 760px)', () => {
				challengeCards.forEach((card, index) => {
					window.gsap.set(card, {zIndex: index + 1});
				});

				const stackTimeline = window.gsap.timeline({
					scrollTrigger: {
						trigger: challengeSection,
						start: 'top top',
						end: () => `+=${Math.max(window.innerHeight * 0.65, 480)}`,
						pin: challengeSection,
						pinSpacing: true,
						scrub: 0.65,
						anticipatePin: 1,
						invalidateOnRefresh: true
					}
				});

				challengeCards.slice(1).forEach((card, index) => {
					stackTimeline.fromTo(card, {
						y: () => card.offsetHeight + 24
					}, {
						y: (index + 1) * 8,
						duration: 1,
						ease: 'none'
					}, index);
				});

				return () => {
					stackTimeline.scrollTrigger?.kill();
					stackTimeline.kill();
					window.gsap.set(challengeCards, {clearProps: 'transform,zIndex'});
				};
			});
		}

	}
});
