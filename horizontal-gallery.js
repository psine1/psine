(() => {
	'use strict';

	const controllers = new WeakMap();
	const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

	window.initPinnedHorizontalGallery = ({
		section,
		sticky,
		viewport,
		progress,
		minWidth = 761,
		dragThreshold = 7,
		keyboardStep = 0.72,
		scrollMultiplier = 1.12,
		minScrollScreens = 1.5
	} = {}) => {
		if (!section || !sticky || !viewport) return null;
		if (controllers.has(viewport)) return controllers.get(viewport);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let horizontalTween = null;
		let horizontalTrigger = null;
		let galleryMedia = null;
		let pointerDown = false;
		let dragging = false;
		let didDrag = false;
		let startX = 0;
		let startY = 0;
		let startScrollLeft = 0;
		const root = document.documentElement;
		const initialInlineScrollBehavior = root.style.scrollBehavior;
		let instantPageScroll = false;

		const setInstantPageScroll = (active) => {
			if (active === instantPageScroll) return;
			instantPageScroll = active;
			if (active) {
				root.style.scrollBehavior = 'auto';
			} else if (initialInlineScrollBehavior) {
				root.style.scrollBehavior = initialInlineScrollBehavior;
			} else {
				root.style.removeProperty('scroll-behavior');
			}
		};

		const maxScroll = () => Math.max(viewport.scrollWidth - viewport.clientWidth, 0);

		const syncProgress = () => {
			if (!progress) return;
			const maximum = maxScroll();
			const ratio = maximum ? clamp(viewport.scrollLeft / maximum, 0, 1) : 1;
			progress.style.transform = `scaleX(${ratio})`;
		};

		const hasPinnedControl = () => {
			if (!horizontalTrigger) return false;
			return window.scrollY >= horizontalTrigger.start - 1
				&& window.scrollY <= horizontalTrigger.end + 1;
		};

		const moveTo = (horizontalPosition, behavior = 'auto') => {
			const maximum = maxScroll();
			const targetX = clamp(horizontalPosition, 0, maximum);

			if (hasPinnedControl() && maximum > 0) {
				// A page may declare scroll-behavior:smooth globally.
				// Disable it while pinned so every drag frame maps 1:1 to ScrollTrigger.
				setInstantPageScroll(true);
				const verticalRange = horizontalTrigger.end - horizontalTrigger.start;
				const targetY = horizontalTrigger.start + (targetX / maximum) * verticalRange;
				window.scrollTo({
					top: targetY,
					left: window.scrollX,
					behavior
				});
				return;
			}

			if (behavior === 'smooth') {
				viewport.scrollTo({left: targetX, behavior});
			} else {
				viewport.scrollLeft = targetX;
			}
		};

		const onPointerDown = (event) => {
			if (event.button !== 0) return;
			pointerDown = true;
			dragging = false;
			didDrag = false;
			startX = event.clientX;
			startY = event.clientY;
			startScrollLeft = viewport.scrollLeft;
		};

		const onPointerMove = (event) => {
			if (!pointerDown) return;
			const deltaX = event.clientX - startX;
			const deltaY = event.clientY - startY;

			if (!dragging && Math.abs(deltaX) > dragThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
				dragging = true;
				didDrag = true;
				viewport.classList.add('is-dragging');
				viewport.setPointerCapture(event.pointerId);
			}

			if (!dragging) return;
			event.preventDefault();
			moveTo(startScrollLeft - deltaX);
		};

		const finishDrag = (event) => {
			if (!pointerDown) return;
			pointerDown = false;
			if (!dragging) return;
			dragging = false;
			viewport.classList.remove('is-dragging');
			if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
			if (!horizontalTrigger?.isActive) setInstantPageScroll(false);
		};

		const preventDraggedClick = (event) => {
			if (!didDrag) return;
			event.preventDefault();
			event.stopPropagation();
			didDrag = false;
		};

		const preventNativeDrag = (event) => {
			event.preventDefault();
		};

		const onKeyDown = (event) => {
			if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
			event.preventDefault();
			const direction = event.key === 'ArrowRight' ? 1 : -1;
			moveTo(
				viewport.scrollLeft + direction * viewport.clientWidth * keyboardStep,
				reducedMotion ? 'auto' : 'smooth'
			);
		};

		viewport.addEventListener('pointerdown', onPointerDown);
		viewport.addEventListener('pointermove', onPointerMove, {passive: false});
		viewport.addEventListener('pointerup', finishDrag);
		viewport.addEventListener('pointercancel', finishDrag);
		viewport.addEventListener('dragstart', preventNativeDrag);
		viewport.addEventListener('click', preventDraggedClick, true);
		viewport.addEventListener('keydown', onKeyDown);
		viewport.addEventListener('scroll', syncProgress, {passive: true});
		window.addEventListener('resize', syncProgress);
		syncProgress();

		if (window.gsap && window.ScrollTrigger && !reducedMotion) {
			window.gsap.registerPlugin(window.ScrollTrigger);
			galleryMedia = window.gsap.matchMedia();
			galleryMedia.add(`(min-width: ${minWidth}px)`, () => {
				horizontalTween = window.gsap.to(viewport, {
					scrollLeft: () => maxScroll(),
					ease: 'none',
					scrollTrigger: {
						trigger: section,
						start: 'top top',
						end: () => `+=${Math.max(maxScroll() * scrollMultiplier, window.innerHeight * minScrollScreens)}`,
						pin: sticky,
						pinSpacing: true,
						scrub: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onToggle: (self) => setInstantPageScroll(self.isActive),
						onUpdate: syncProgress,
						onRefresh: syncProgress
					}
				});

				horizontalTrigger = horizontalTween.scrollTrigger;

				return () => {
					setInstantPageScroll(false);
					horizontalTrigger = null;
					horizontalTween = null;
				};
			});
		}

		const controller = {
			refresh() {
				syncProgress();
				horizontalTrigger?.refresh();
			},
			destroy() {
				galleryMedia?.revert();
				setInstantPageScroll(false);
				viewport.removeEventListener('pointerdown', onPointerDown);
				viewport.removeEventListener('pointermove', onPointerMove);
				viewport.removeEventListener('pointerup', finishDrag);
				viewport.removeEventListener('pointercancel', finishDrag);
				viewport.removeEventListener('dragstart', preventNativeDrag);
				viewport.removeEventListener('click', preventDraggedClick, true);
				viewport.removeEventListener('keydown', onKeyDown);
				viewport.removeEventListener('scroll', syncProgress);
				window.removeEventListener('resize', syncProgress);
				controllers.delete(viewport);
			}
		};

		controllers.set(viewport, controller);
		return controller;
	};
})();
