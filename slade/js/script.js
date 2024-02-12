
const mainSlider = document.querySelector('.main');
new Swiper('.page', {
  autoplay: {
    delay: 6000,
   
  },
  centeredSlides: true,
  spaceBetween: 100,
  slidesPerView: 1,
 autoHeight: true,
  speed: 800,
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
   
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

 
});

const newSlider = document.querySelector('.new');
if (newSlider) {
	new Swiper('.new__slider', {
    autoplay: {
      delay: 4500,
     
    },
    centeredSlides: true,
		loop: true,
	
		speed: 500,
   	spaceBetween: 90,
		slidesPerView: 3,
		// Navigation arrows
		navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
		},
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
        slidesPerView: 1.5,
				spaceBetween: 30
			},
			486: {
				slidesPerView: 2,
				spaceBetween: 50
			},
			// when window width is >= 480px
			770: {
				slidesPerView: 3,
				spaceBetween: 50
       
			},
		
       
			
				
       
			
		}
	});
}



function onEntry(entry) {
  entry.forEach(change => {
      if (change.isIntersecting) {
          if (change.target.classList.contains('anime')) {
              change.target.classList.add('anime-show');
          } else if (change.target.classList.contains('other-class')) {
              change.target.classList.add('other-class-show');
          } else if (change.target.classList.contains('third-class')) {
              change.target.classList.add('third-class-show');
          } else if (change.target.classList.contains('fourth-class')) {
              change.target.classList.add('fourth-class-show');
          }
      } else {
          if (change.target.classList.contains('anime')) {
              change.target.classList.remove('anime-show');
          } else if (change.target.classList.contains('other-class')) {
              change.target.classList.remove('other-class-show');
          } else if (change.target.classList.contains('third-class')) {
              change.target.classList.remove('third-class-show');
          } else if (change.target.classList.contains('fourth-class')) {
              change.target.classList.remove('fourth-class-show');
          }
      }
  });
}

let options = {
  threshold: [0.4]
};
let observer = new IntersectionObserver(onEntry, options);
let elementsToObserve = document.querySelectorAll('.anime, .other-class, .third-class, .fourth-class');
for (let elm of elementsToObserve) {
  observer.observe(elm);
}
 
 

