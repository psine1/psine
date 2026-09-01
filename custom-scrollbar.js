(() => {
	'use strict';

	const initCustomScrollbar = () => {
		if (!document.body || document.querySelector('[data-custom-scrollbar]')) return;

		const scrollbar = document.createElement('div');
		scrollbar.className = 'site-scrollbar';
		scrollbar.setAttribute('data-custom-scrollbar', '');
		scrollbar.setAttribute('aria-hidden', 'true');
		scrollbar.innerHTML = '<div class="site-scrollbar-track" data-scrollbar-track><div class="site-scrollbar-thumb" data-scrollbar-thumb></div></div>';
		document.body.appendChild(scrollbar);
		document.documentElement.classList.add('custom-scrollbar-ready');

		const root = document.documentElement;
		const track = scrollbar.querySelector('[data-scrollbar-track]');
		const thumb = scrollbar.querySelector('[data-scrollbar-thumb]');
		let updateFrame = 0;
		let dragStartY = 0;
		let dragStartThumbY = 0;

		const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

		const getMetrics = () => {
			const viewportHeight = root.clientHeight;
			const documentHeight = Math.max(root.scrollHeight, document.body.scrollHeight);
			const scrollableHeight = Math.max(documentHeight - viewportHeight, 0);
			const trackHeight = track.clientHeight;
			const thumbHeight = clamp(trackHeight * (viewportHeight / documentHeight), 44, trackHeight);
			const thumbRange = Math.max(trackHeight - thumbHeight, 0);
			const progress = scrollableHeight ? clamp(window.scrollY / scrollableHeight, 0, 1) : 0;

			return {scrollableHeight, thumbHeight, thumbRange, thumbY: thumbRange * progress};
		};

		const updateScrollbar = () => {
			updateFrame = 0;
			const metrics = getMetrics();
			scrollbar.classList.toggle('is-hidden', metrics.scrollableHeight <= 1);
			thumb.style.height = `${metrics.thumbHeight}px`;
			thumb.style.transform = `translate3d(-50%, ${metrics.thumbY}px, 0)`;
		};

		const queueUpdate = () => {
			if (!updateFrame) updateFrame = requestAnimationFrame(updateScrollbar);
		};

		thumb.addEventListener('pointerdown', (event) => {
			if (event.pointerType === 'mouse' && event.button !== 0) return;
			event.preventDefault();
			event.stopPropagation();
			const metrics = getMetrics();
			dragStartY = event.clientY;
			dragStartThumbY = metrics.thumbY;
			thumb.classList.add('is-dragging');
			thumb.setPointerCapture(event.pointerId);
		});

		thumb.addEventListener('pointermove', (event) => {
			if (!thumb.hasPointerCapture(event.pointerId)) return;
			const metrics = getMetrics();
			const nextThumbY = clamp(dragStartThumbY + event.clientY - dragStartY, 0, metrics.thumbRange);
			const nextScrollY = metrics.thumbRange ? (nextThumbY / metrics.thumbRange) * metrics.scrollableHeight : 0;
			window.scrollTo(0, nextScrollY);
		});

		const finishDrag = (event) => {
			if (thumb.hasPointerCapture(event.pointerId)) thumb.releasePointerCapture(event.pointerId);
			thumb.classList.remove('is-dragging');
		};

		thumb.addEventListener('pointerup', finishDrag);
		thumb.addEventListener('pointercancel', finishDrag);

		track.addEventListener('pointerdown', (event) => {
			if (event.target === thumb || (event.pointerType === 'mouse' && event.button !== 0)) return;
			const metrics = getMetrics();
			const trackRect = track.getBoundingClientRect();
			const nextThumbY = clamp(event.clientY - trackRect.top - metrics.thumbHeight / 2, 0, metrics.thumbRange);
			const nextScrollY = metrics.thumbRange ? (nextThumbY / metrics.thumbRange) * metrics.scrollableHeight : 0;
			window.scrollTo(0, nextScrollY);
		});

		window.addEventListener('scroll', queueUpdate, {passive: true});
		window.addEventListener('resize', queueUpdate, {passive: true});
		window.addEventListener('pageshow', queueUpdate);

		if ('ResizeObserver' in window) {
			const resizeObserver = new ResizeObserver(queueUpdate);
			resizeObserver.observe(document.body);
			resizeObserver.observe(root);
		}

		queueUpdate();
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initCustomScrollbar, {once: true});
	} else {
		initCustomScrollbar();
	}
})();
