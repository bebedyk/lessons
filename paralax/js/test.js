let depth = 0;
const maxDepth = 150;
const minDepth = 0;
let targetDepth = depth;
let isAnimating = false;
let parallaxEnabled = false;
let tiltEnabled = false;
let fixedScale = 1;
let tiltX = 0, tiltY = 0;
const smoothingFactor = 0.05;

const tunnelEffect = { scaleSpeed: 0.010, maxScale: 2.7 };
const backgroundEffect = { translateSpeed: 0.2, scaleSpeed: 0.0005 };
const tiltEffect = { maxTilt: 10 };
const backgroundImage = document.querySelector(".too");
const videoElement = document.querySelector(".too");
const overlayImage = document.querySelector(".thre");
const animatedText = document.querySelector(".animated-text");
const musicElement = document.querySelector(".music");

function handleScroll(event) {
	targetDepth += event.deltaY * 0.2;
	targetDepth = Math.max(minDepth, Math.min(maxDepth, targetDepth));

	if (!isAnimating) {
		isAnimating = true;
		animateScroll();
	}

	document.querySelector(".scroll-indicator").style.display = 'none';
}

function animateScroll() {
	if (Math.abs(targetDepth - depth) < 0.5) {
		isAnimating = false;
		return;
	}

	depth += (targetDepth - depth) * 0.1;

	const tunnelScale = Math.min(1 + depth * tunnelEffect.scaleSpeed, tunnelEffect.maxScale);
	document.querySelector(".wan").style.transform = `scale(${tunnelScale})`;

	let backgroundScale = 1 + depth * backgroundEffect.scaleSpeed;
	fixedScale = backgroundScale;
	backgroundImage.style.transform = `scale(${fixedScale}) rotateX(${-tiltY}deg) rotateY(${tiltX}deg)`;

	if (depth >= maxDepth - 1 && !parallaxEnabled) {
		parallaxEnabled = true;
		tiltEnabled = true;
		videoElement.style.display = 'block';
		videoElement.play();
		musicElement.play().catch(error => {
			console.log("Автовідтворення заборонено, взаємодійте з екраном", error);
		});
		if (depth >= maxDepth - 1 && !parallaxEnabled) {
			parallaxEnabled = true;
			tiltEnabled = true;
			videoElement.style.display = 'block';
			videoElement.play();
			musicElement.currentTime = 0;
			musicElement.play().catch(error => {
				console.log("Автовідтворення заборонено, користувач має взаємодіяти з документом", error);
			});
		}
		videoElement.addEventListener('ended', () => {
			videoElement.style.display = 'block';
			videoElement.style.objectFit = 'cover';
			overlayImage.style.display = 'block';
			setTimeout(() => {
				overlayImage.style.transform = 'translate(-50%, -50%) scale(1)';
				overlayImage.style.opacity = '0.5';
			}, 100);
			setTimeout(() => {
				animatedText.style.transform = 'translate(-50%, -50%) scale(1)';
				animatedText.style.opacity = '1';
			}, 1500);
		});
	}
	setTimeout(() => {
		animatedText.classList.add("pulse");
	}, 800);
	requestAnimationFrame(animateScroll);
}

function handleMouseMove(event) {
	if (!tiltEnabled) return;

	const centerX = window.innerWidth / 3;
	const centerY = window.innerHeight / 3;
	const targetTiltX = ((event.clientX - centerX) / centerX) * tiltEffect.maxTilt;
	const targetTiltY = ((event.clientY - centerY) / centerY) * tiltEffect.maxTilt;

	tiltX += (targetTiltX - tiltX) * smoothingFactor;
	tiltY += (targetTiltY - tiltY) * smoothingFactor;

	backgroundImage.style.transform = `scale(${fixedScale}) rotateX(${-tiltY}deg) rotateY(${tiltX}deg)`;
}

window.addEventListener("wheel", handleScroll, { passive: true });
window.addEventListener("mousemove", handleMouseMove);
document.body.style.overflow = 'hidden';