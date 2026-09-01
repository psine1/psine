document.addEventListener('DOMContentLoaded', () => {
	const bannerFrame = document.querySelector('[data-banner-frame]');
	const bannerStage = document.querySelector('[data-banner-stage]');
	const bannerFrameShell = bannerStage?.querySelector('.bn-banner-frame');
	const sizeButtons = Array.from(document.querySelectorAll('[data-banner-size]'));
	const campaignButtons = Array.from(document.querySelectorAll('[data-campaign]'));
	const campaignName = document.querySelector('[data-campaign-name]');
	const replayButton = document.querySelector('[data-banner-replay]');
	let activeCampaign = document.querySelector('[data-campaign].is-active')?.dataset.campaign || 'onimusha';

	const setFrameSource = (frame, source) => {
		if (!frame || !source) return;
		frame.dataset.currentSrc = source;
		frame.src = source;
	};

	const replayFrame = (frame) => {
		if (!frame) return;
		const source = frame.dataset.currentSrc || frame.dataset.src || frame.getAttribute('src');
		if (!source) return;
		const replayUrl = new URL(source, document.baseURI);
		replayUrl.searchParams.set('_replay', String(Date.now()));
		frame.src = replayUrl.href;
	};

	const restartFrameOnReentry = (stage, frame, initialSource) => {
		if (!stage || !frame) return;
		let hasEntered = false;
		let isVisible = false;

		const enter = () => {
			if (isVisible) return;
			isVisible = true;
			if (!hasEntered) {
				hasEntered = true;
				if (!frame.getAttribute('src')) setFrameSource(frame, initialSource);
				else if (!frame.dataset.currentSrc) frame.dataset.currentSrc = initialSource || frame.getAttribute('src');
				return;
			}
			replayFrame(frame);
		};

		if (!('IntersectionObserver' in window)) {
			enter();
			return;
		}

		new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) enter();
				else isVisible = false;
			});
		}, {threshold: 0.2, rootMargin: '0px 0px -10% 0px'}).observe(stage);
	};

	const fitBanner = () => {
		if (!bannerStage || !bannerFrameShell) return;
		const [nativeWidth, nativeHeight] = bannerStage.dataset.size.split('x').map(Number);
		if (!nativeWidth || !nativeHeight) return;

		const stageStyle = window.getComputedStyle(bannerStage);
		const availableWidth = bannerStage.clientWidth - parseFloat(stageStyle.paddingLeft) - parseFloat(stageStyle.paddingRight);
		const availableHeight = bannerStage.clientHeight - parseFloat(stageStyle.paddingTop) - parseFloat(stageStyle.paddingBottom);
		const scale = Math.max(0.05, Math.min(1, availableWidth / nativeWidth, availableHeight / nativeHeight));

		bannerStage.style.setProperty('--bn-ad-width', `${nativeWidth}px`);
		bannerStage.style.setProperty('--bn-ad-height', `${nativeHeight}px`);
		bannerStage.style.setProperty('--bn-ad-scale', String(scale));
		bannerFrameShell.style.width = `${Math.round(nativeWidth * scale * 100) / 100}px`;
		bannerFrameShell.style.height = `${Math.round(nativeHeight * scale * 100) / 100}px`;
	};

	const loadOnimushaSize = (button) => {
		if (!bannerFrame || !button?.dataset.src) return;
		setFrameSource(bannerFrame, button.dataset.src);
		bannerFrame.title = button.dataset.title;
	};

	sizeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			if (!bannerStage) return;
			bannerStage.dataset.size = button.dataset.bannerSize;
			if (activeCampaign === 'onimusha') loadOnimushaSize(button);
			sizeButtons.forEach((item) => {
				const isCurrent = item === button;
				item.classList.toggle('is-active', isCurrent);
				item.setAttribute('aria-pressed', String(isCurrent));
			});
			window.requestAnimationFrame(fitBanner);
		});
	});

	campaignButtons.forEach((button) => {
		button.addEventListener('click', () => {
			activeCampaign = button.dataset.campaign;
			if (activeCampaign === 'onimusha') {
				loadOnimushaSize(sizeButtons.find((item) => item.classList.contains('is-active')) || sizeButtons[0]);
			} else if (bannerFrame) {
				setFrameSource(bannerFrame, button.dataset.src);
				bannerFrame.title = button.dataset.title;
			}
			if (campaignName) campaignName.textContent = button.dataset.name;
			campaignButtons.forEach((item) => {
				const isCurrent = item === button;
				item.classList.toggle('is-active', isCurrent);
				item.setAttribute('aria-pressed', String(isCurrent));
			});
		});
	});

	replayButton?.addEventListener('click', () => {
		replayFrame(bannerFrame);
	});

	if (bannerStage) {
		if ('ResizeObserver' in window) new ResizeObserver(fitBanner).observe(bannerStage);
		else window.addEventListener('resize', fitBanner);
		window.requestAnimationFrame(fitBanner);
	}

	restartFrameOnReentry(bannerStage, bannerFrame, bannerFrame?.getAttribute('src'));

	const formatStage = document.querySelector('[data-bn-format-stage]');
	const formatFrameShell = formatStage?.querySelector('.bn-single-frame');
	const formatFrame = document.querySelector('[data-bn-format-frame]');
	const formatButtons = Array.from(document.querySelectorAll('[data-bn-format-size]'));
	const formatName = document.querySelector('[data-bn-format-name]');
	const formatReplay = document.querySelector('[data-bn-format-replay]');

	const fitFormatBanner = () => {
		if (!formatStage || !formatFrameShell) return;
		const [nativeWidth, nativeHeight] = formatStage.dataset.size.split('x').map(Number);
		if (!nativeWidth || !nativeHeight) return;

		const stageStyle = window.getComputedStyle(formatStage);
		const availableWidth = formatStage.clientWidth - parseFloat(stageStyle.paddingLeft) - parseFloat(stageStyle.paddingRight);
		const availableHeight = formatStage.clientHeight - parseFloat(stageStyle.paddingTop) - parseFloat(stageStyle.paddingBottom);
		const scale = Math.max(0.05, Math.min(1, availableWidth / nativeWidth, availableHeight / nativeHeight));

		formatStage.style.setProperty('--bn-format-width', `${nativeWidth}px`);
		formatStage.style.setProperty('--bn-format-height', `${nativeHeight}px`);
		formatStage.style.setProperty('--bn-format-scale', String(scale));
		formatFrameShell.style.width = `${Math.round(nativeWidth * scale * 100) / 100}px`;
		formatFrameShell.style.height = `${Math.round(nativeHeight * scale * 100) / 100}px`;
	};

	formatButtons.forEach((button) => {
		button.addEventListener('click', () => {
			if (!formatStage || !formatFrame) return;
			formatStage.dataset.size = button.dataset.bnFormatSize;
			setFrameSource(formatFrame, button.dataset.src);
			formatFrame.title = button.dataset.title;
			if (formatName) formatName.textContent = button.querySelector('strong')?.textContent || button.dataset.bnFormatSize;

			formatButtons.forEach((item) => {
				const isCurrent = item === button;
				item.classList.toggle('is-active', isCurrent);
				item.setAttribute('aria-pressed', String(isCurrent));
			});

			window.requestAnimationFrame(fitFormatBanner);
		});
	});

	formatReplay?.addEventListener('click', () => {
		replayFrame(formatFrame);
	});

	if (formatStage) {
		if ('ResizeObserver' in window) new ResizeObserver(fitFormatBanner).observe(formatStage);
		else window.addEventListener('resize', fitFormatBanner);
		window.requestAnimationFrame(fitFormatBanner);
	}

	restartFrameOnReentry(formatStage, formatFrame, formatFrame?.dataset.src || formatButtons[0]?.dataset.src);
});
