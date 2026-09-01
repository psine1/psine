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

	if (gallery && productSection && productSticky && typeof window.initPinnedHorizontalGallery === 'function') {
		window.initPinnedHorizontalGallery({
			section: productSection,
			sticky: productSticky,
			viewport: gallery,
			progress: galleryProgress
		});
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

	}
});
