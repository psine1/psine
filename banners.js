document.addEventListener('DOMContentLoaded', () => {
	const bannerFrame = document.querySelector('[data-banner-frame]');
	const bannerStage = document.querySelector('[data-banner-stage]');
	const bannerSizeButtons = Array.from(document.querySelectorAll('[data-banner-size]'));
	const campaignButtons = Array.from(document.querySelectorAll('[data-campaign]'));
	const campaignName = document.querySelector('[data-campaign-name]');
	const bannerReplay = document.querySelector('[data-banner-replay]');

	bannerSizeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			bannerStage.dataset.size = button.dataset.bannerSize;
			bannerSizeButtons.forEach((item) => {
				const isCurrent = item === button;
				item.classList.toggle('is-active', isCurrent);
				item.setAttribute('aria-pressed', String(isCurrent));
			});
		});
	});

	campaignButtons.forEach((button) => {
		button.addEventListener('click', () => {
			bannerFrame.src = button.dataset.src;
			bannerFrame.title = button.dataset.title;
			campaignName.textContent = button.dataset.name;
			campaignButtons.forEach((item) => {
				const isCurrent = item === button;
				item.classList.toggle('is-active', isCurrent);
				item.setAttribute('aria-pressed', String(isCurrent));
			});
		});
	});

	bannerReplay.addEventListener('click', () => {
		bannerFrame.src = bannerFrame.src;
	});
});
