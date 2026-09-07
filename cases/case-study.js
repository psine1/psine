document.addEventListener('DOMContentLoaded', () => {
	const progress = document.querySelector('[data-progress]');
	const year = document.querySelector('[data-year]');
	const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const galleryStack = document.querySelector('[data-gallery-stack]');
	const galleryStage = document.querySelector('[data-gallery-stage]');
	const galleryCards = galleryStage ? Array.from(galleryStage.querySelectorAll('[data-gallery-card]')) : [];
	const galleryMotion = window.matchMedia('(min-width: 761px) and (prefers-reduced-motion: no-preference)');
	let galleryFrame = 0;
	let galleryTravel = 1;

	const laptopPlayers = Array.from(document.querySelectorAll('[data-laptop-player]'));
	const initLaptopPlayer = (player) => {
		const canvas = player.querySelector('.case-laptop-screen');
		const video = player.querySelector('.case-laptop-video');
		const context = canvas?.getContext('2d');
		if (!canvas || !video || !context) return;

		const screen = {
			topLeft: [176, 20],
			topRight: [704, 210],
			bottomRight: [557, 557],
			bottomLeft: [21, 376]
		};
		let animationFrame = 0;
		let videoFrame = 0;

		const fitLaptopScreen = () => {
			const laptop = player.querySelector('.case-laptop');
			if (!laptop) return;

			const scaleX = laptop.clientWidth / 715;
			const scaleY = laptop.clientHeight / 834;
			const points = [screen.topLeft, screen.topRight, screen.bottomRight, screen.bottomLeft]
				.map(([x, y]) => [x * scaleX, y * scaleY]);
			const [topLeft, topRight, bottomRight, bottomLeft] = points;
			const deltaX1 = topRight[0] - bottomRight[0];
			const deltaX2 = bottomLeft[0] - bottomRight[0];
			const deltaX3 = topLeft[0] - topRight[0] + bottomRight[0] - bottomLeft[0];
			const deltaY1 = topRight[1] - bottomRight[1];
			const deltaY2 = bottomLeft[1] - bottomRight[1];
			const deltaY3 = topLeft[1] - topRight[1] + bottomRight[1] - bottomLeft[1];
			const denominator = deltaX1 * deltaY2 - deltaX2 * deltaY1;
			const perspectiveX = (deltaX3 * deltaY2 - deltaX2 * deltaY3) / denominator;
			const perspectiveY = (deltaX1 * deltaY3 - deltaX3 * deltaY1) / denominator;
			const horizontalX = topRight[0] - topLeft[0] + perspectiveX * topRight[0];
			const verticalX = bottomLeft[0] - topLeft[0] + perspectiveY * bottomLeft[0];
			const horizontalY = topRight[1] - topLeft[1] + perspectiveX * topRight[1];
			const verticalY = bottomLeft[1] - topLeft[1] + perspectiveY * bottomLeft[1];
			const width = canvas.width;
			const height = canvas.height;

			canvas.style.transform = `matrix3d(
				${horizontalX / width}, ${horizontalY / width}, 0, ${perspectiveX / width},
				${verticalX / height}, ${verticalY / height}, 0, ${perspectiveY / height},
				0, 0, 1, 0,
				${topLeft[0]}, ${topLeft[1]}, 0, 1
			)`;
		};

		const drawLaptopScreen = () => {
			if (video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;

			context.setTransform(1, 0, 0, 1, 0, 0);
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = '#111111';
			context.fillRect(0, 0, canvas.width, canvas.height);

			const browserBarHeight = 72;
			context.fillStyle = '#292929';
			context.fillRect(0, 0, canvas.width, browserBarHeight);
			context.fillStyle = '#3b3b3b';
			context.fillRect(0, browserBarHeight - 2, canvas.width, 2);

			['#ff5ca7', '#ffcf25', '#2daef5'].forEach((color, index) => {
				context.beginPath();
				context.arc(30 + index * 28, browserBarHeight / 2, 8, 0, Math.PI * 2);
				context.fillStyle = color;
				context.fill();
			});

			const addressX = 132;
			const addressY = 16;
			const addressWidth = canvas.width - 174;
			const addressHeight = 40;
			const addressRadius = 12;
			context.beginPath();
			context.moveTo(addressX + addressRadius, addressY);
			context.lineTo(addressX + addressWidth - addressRadius, addressY);
			context.quadraticCurveTo(addressX + addressWidth, addressY, addressX + addressWidth, addressY + addressRadius);
			context.lineTo(addressX + addressWidth, addressY + addressHeight - addressRadius);
			context.quadraticCurveTo(addressX + addressWidth, addressY + addressHeight, addressX + addressWidth - addressRadius, addressY + addressHeight);
			context.lineTo(addressX + addressRadius, addressY + addressHeight);
			context.quadraticCurveTo(addressX, addressY + addressHeight, addressX, addressY + addressHeight - addressRadius);
			context.lineTo(addressX, addressY + addressRadius);
			context.quadraticCurveTo(addressX, addressY, addressX + addressRadius, addressY);
			context.closePath();
			context.fillStyle = '#1c1c1c';
			context.fill();
			context.fillStyle = '#a8a8a8';
			context.font = '500 18px Arial, sans-serif';
			context.textBaseline = 'middle';
			context.fillText('lll hub / product walkthrough', addressX + 22, browserBarHeight / 2);

			const viewportWidth = canvas.width;
			const viewportHeight = canvas.height - browserBarHeight;
			const videoScale = Math.min(
				viewportWidth / video.videoWidth,
				viewportHeight / video.videoHeight
			);
			const videoWidth = video.videoWidth * videoScale;
			const videoHeight = video.videoHeight * videoScale;
			const videoX = (viewportWidth - videoWidth) / 2;
			const videoY = browserBarHeight + (viewportHeight - videoHeight) / 2;

			context.drawImage(
				video,
				0,
				0,
				video.videoWidth,
				video.videoHeight,
				videoX,
				videoY,
				videoWidth,
				videoHeight
			);
		};

		const renderWithAnimationFrame = () => {
			drawLaptopScreen();
			animationFrame = window.requestAnimationFrame(renderWithAnimationFrame);
		};

		const renderWithVideoFrame = () => {
			drawLaptopScreen();
			videoFrame = video.requestVideoFrameCallback(renderWithVideoFrame);
		};

		video.addEventListener('loadeddata', () => {
			drawLaptopScreen();
			video.play().catch(() => {});
			if ('requestVideoFrameCallback' in video && !videoFrame) {
				videoFrame = video.requestVideoFrameCallback(renderWithVideoFrame);
			} else if (!animationFrame) {
				animationFrame = window.requestAnimationFrame(renderWithAnimationFrame);
			}
		}, { once: true });

		fitLaptopScreen();
		if ('ResizeObserver' in window) {
			const laptopResizeObserver = new ResizeObserver(fitLaptopScreen);
			laptopResizeObserver.observe(player);
		} else {
			window.addEventListener('resize', fitLaptopScreen);
		}
		if (video.readyState >= 2) video.dispatchEvent(new Event('loadeddata'));
	};

	laptopPlayers.forEach(initLaptopPlayer);

	if (year) year.textContent = String(new Date().getFullYear());

	const updateProgress = () => {
		if (!progress) return;
		const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
		const value = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
		progress.style.transform = `scaleX(${value})`;
	};

	const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
	const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

	const resetGalleryStack = () => {
		if (!galleryStack) return;
		galleryTravel = 1;
		galleryStack.style.height = '';
		galleryCards.forEach((card) => {
			card.style.removeProperty('--stack-y');
			card.style.removeProperty('--stack-scale');
			card.style.removeProperty('--stack-rotate');
			card.style.removeProperty('--stack-opacity');
		});
	};

	const updateGalleryStack = () => {
		galleryFrame = 0;
		if (!galleryStack || !galleryStage || galleryCards.length < 2 || !galleryMotion.matches) {
			resetGalleryStack();
			return;
		}

		const stageTop = parseFloat(getComputedStyle(galleryStage).top) || 0;
		const stackRect = galleryStack.getBoundingClientRect();
		const progressValue = clamp((stageTop - stackRect.top) / galleryTravel, 0, 1);
		const sequence = progressValue * (galleryCards.length - 1);
		const entranceDistance = Math.max(galleryStage.clientHeight * 0.9, 520);

		galleryCards.forEach((card, index) => {
			const entrance = index === 0 ? 1 : easeOutCubic(clamp(sequence - (index - 1), 0, 1));
			const depth = clamp(sequence - index, 0, galleryCards.length - 1);
			const y = index === 0 ? -depth * 14 : (1 - entrance) * entranceDistance - depth * 14;
			const scale = 1 - Math.min(depth, 3) * 0.016;
			const direction = index % 2 === 0 ? -1 : 1;
			const rotation = (1 - entrance) * direction * 0.55;
			const opacity = index === 0 || entrance > 0 ? 1 - Math.min(depth, 3) * 0.07 : 0;

			card.style.setProperty('--stack-y', `${y.toFixed(2)}px`);
			card.style.setProperty('--stack-scale', scale.toFixed(4));
			card.style.setProperty('--stack-rotate', `${rotation.toFixed(3)}deg`);
			card.style.setProperty('--stack-opacity', opacity.toFixed(3));
		});
	};

	const measureGalleryStack = () => {
		if (!galleryStack || !galleryStage || galleryCards.length < 2 || !galleryMotion.matches) {
			resetGalleryStack();
			return;
		}

		const step = Math.max(window.innerHeight * 0.72, 520);
		const stageTop = parseFloat(getComputedStyle(galleryStage).top) || 0;
		const finalHold = Math.max(window.innerHeight * 0.2, 130);
		galleryTravel = step * (galleryCards.length - 1);
		galleryStack.style.height = `${galleryStage.offsetHeight + stageTop + galleryTravel + finalHold}px`;
		updateGalleryStack();
	};

	const requestGalleryUpdate = () => {
		if (galleryFrame) return;
		galleryFrame = window.requestAnimationFrame(updateGalleryStack);
	};

	if (prefersReducedMotion || !('IntersectionObserver' in window)) {
		reveals.forEach((item) => item.classList.add('is-visible'));
	} else {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		}, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });

		reveals.forEach((item) => revealObserver.observe(item));
	}

	window.addEventListener('scroll', updateProgress, { passive: true });
	window.addEventListener('scroll', requestGalleryUpdate, { passive: true });
	window.addEventListener('resize', () => {
		updateProgress();
		measureGalleryStack();
	});
	galleryMotion.addEventListener('change', measureGalleryStack);
	updateProgress();
	measureGalleryStack();
});
