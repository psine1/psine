var banner = document.getElementById('wrapper'),
	ad = document.getElementById('ad'),
	T1,
	tl = new TimelineMax(),
	// CLICKTAG FUNCTION EXPRESSION
	openWindow = function () {
		window.open(clickTag);
	},
	// GSAP ANIMATION TIMELINE
	allAnimation = function () {
		banner.style.visibility = 'visible';

		T1 = new TimelineMax();

		T1
			.staggerFromTo(".mask-path", 1.4, {drawSVG:"0%"}, { drawSVG:"100%", ease:Power2.easeOut }, 0.2, 0)
			.from("#stroke-b", 0.8, {autoAlpha: 0, ease:Power3.easeOut}, 0.18)
			.from("#brush-1", 5, {scale: 1.5, rotation: -5, ease:Power3.easeOut}, 0)
			.from("#wrap-car", 2, {x: -260, ease:Power3.easeOut}, 0.1)
			.from("[id*='wheel'] img", 2, {rotation: -1080, transformOrigin: "50% 50%", ease:Power3.easeOut}, 0.1)

			.to('.border-top', 1.7, {
				scaleX: 1,
				ease: Power4.easeOut
			}, 0.5)
			.to(['.border-left', '.border-right'], 2, {
				scaleY: 1,
				ease: Power4.easeOut
			}, 1.2)
			.to('.border-bottom', 1.5, {
				y: 0,
				ease: Power4.easeOut
			}, 1)
			.to('#logo', .7, {
				opacity: 1,
				ease: Power4.easeOut
			}, 1.7)
			.fromTo('#txt-1-a', 1, {
				opacity: 0,
				y: 20,
				ease: Expo.easeOut
			}, {
				opacity: 1,
				y: 0,
				ease: Expo.easeOut
			}, 2)

			.fromTo('#txt-1-b', 1, {
				opacity: 0,
				y: 20,
				ease: Expo.easeOut
			}, {
				opacity: 1,
				y: 0,
				ease: Expo.easeOut
			}, 2.2)

			
			.fromTo('#btn', 1, {
					opacity: 0
				}, {
					opacity: 1,
					ease: Expo.easeOut,
					onComplete: function () {
						tl.set("#btn", {
							className: "btn--bgcolor"
						});
					}
				},
				3)
	};

// EVENT LISTENERS
ad.addEventListener('click', openWindow);
window.addEventListener('load', allAnimation);
