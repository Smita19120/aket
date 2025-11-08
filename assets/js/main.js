/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulink = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulink.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


  // Function to filter portfolio items
  function filterPortfolio(category) {
    // Get all portfolio items
    const items = document.querySelectorAll('.portfolio-item');

    // Loop through each item
    items.forEach(item => {
      // If the category matches or if "All" is selected, show the item
      if (category === 'All' || item.getAttribute('data-category') === category) {
        item.style.display = 'block'; // Show item
      } else {
        item.style.display = 'none'; // Hide item
      }
    });
  }

  // Add event listeners to buttons
  document.querySelector('button[name="All"]').addEventListener('click', () => filterPortfolio('All'));
  document.querySelector('button[name="Completed"]').addEventListener('click', () => filterPortfolio('Completed'));
  document.querySelector('button[name="Ongoing"]').addEventListener('click', () => filterPortfolio('Ongoing'));

  // Get all buttons
  const buttons = document.querySelectorAll('.btn');

  // Add click event listener to each button
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove 'active' class from all buttons
          buttons.forEach(btn => btn.classList.remove('active'));
          // Add 'active' class to the clicked button
          this.classList.add('active');
      });
  });


  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".purecounter");

    counters.forEach(counter => {
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let target = parseInt(counter.getAttribute("data-purecounter-end"));
                    let duration = parseInt(counter.getAttribute("data-purecounter-duration")) * 1000;
                    let start = parseInt(counter.getAttribute("data-purecounter-start")) || 0;
                    let step = Math.ceil(target / (duration / 50));

                    let count = start;
                    let interval = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            counter.innerText = target + "+";
                            clearInterval(interval);
                        } else {
                            counter.innerText = count;
                        }
                    }, 50);
                }
            });
        }, { threshold: 1 });

        observer.observe(counter);
    });
});




  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 800, 
      easing: 'ease-in-out',
      once: true, 
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        let targetId = this.getAttribute('href').substring(1);
        let targetElement = document.getElementById(targetId);
        let offset = 120; // Adjust this value for margin from top

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: "smooth"
            });
        }
    });
});

document.querySelectorAll('.footer_services').forEach(link => {
  link.addEventListener('click', function (e) {
      e.preventDefault();
      let targetId = this.getAttribute('href').substring(1);
      let targetElement = document.getElementById(targetId);
      let offset = 120; // Adjust this value for margin from top

      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - offset,
              behavior: "smooth"
          });
      }
  });
});

// document.addEventListener('DOMContentLoaded', function() {
//   var carousel = document.getElementById('carouselExampleIndicators');
//   var listItems = document.querySelectorAll('.image-list li');
  
//   carousel.addEventListener('slid.bs.carousel', function (event) {
//       // Remove active class from all list items
//       listItems.forEach(function(item) {
//           item.classList.remove('active');
//       });
      
//       // Add active class to the corresponding list item
//       var activeIndex = event.to;
//       listItems[activeIndex].classList.add('active');
//   });
// });

// // Add active class to clicked list item
// document.querySelectorAll('.image-list li').forEach((item, index) => {
//   item.addEventListener('click', function() {
//       document.querySelector('.image-list .active').classList.remove('active');
//       this.classList.add('active');

//       // Move the carousel to the selected index
//       let carousel = new bootstrap.Carousel(document.querySelector('#carouselExampleIndicators'));
//       carousel.to(index);
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('#carouselExampleIndicators');
  const titles = document.querySelectorAll('.image-list li');
  
  // Initialize Bootstrap Carousel
  const bsCarousel = new bootstrap.Carousel(carousel);
  
  // Listen for slide events
  carousel.addEventListener('slid.bs.carousel', function(event) {
    const activeIndex = event.to;
    
    // Update titles
    titles.forEach((title, index) => {
      if (index === activeIndex) {
        title.classList.add('active');
      } else {
        title.classList.remove('active');
      }
    });
  });
  
  // Make titles clickable
  titles.forEach(title => {
    title.addEventListener('click', function() {
      const slideTo = this.getAttribute('data-bs-slide-to');
      bsCarousel.to(slideTo);
    });
  });
});
