'use strict';

document.addEventListener('DOMContentLoaded', function () {
  /* =========================================
     1. THEME SWITCH ENGINE & STATE MANAGEMENT
     ========================================= */
  var themeToggle = document.querySelector('#theme-checkbox');
  var savedTheme = localStorage.getItem('theme') || 'dark';

  // Apply initial theme state
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    if (themeToggle) themeToggle.checked = true;
  } else {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    if (themeToggle) themeToggle.checked = false;
  }

  // Event listener for theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('change', function () {
      if (themeToggle.checked) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  /* =========================================
     2. FLOATING HEADER CAMOUFLAGE & SCROLL
     ========================================= */
  var navbar = document.querySelector('#navbar');
  var topBtn = document.querySelector('#top-btn');

  var handleScroll = function handleScroll() {
    var scrollY = window.scrollY;

    // Navbar Shrink & Glassmorphic Background
    if (scrollY > 50) {
      if (navbar) {
        navbar.classList.add('nav-scrolled');
      }
    } else {
      if (navbar) {
        navbar.classList.remove('nav-scrolled');
      }
    }

    // Back To Top Button visibility
    if (scrollY > 400) {
      if (topBtn) {
        topBtn.style.bottom = '30px';
      }
    } else {
      if (topBtn) {
        topBtn.style.bottom = '-80px';
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  /* =========================================
     3. SCROLL-TRIGGERED REVEAL ANIMATIONS
     ========================================= */
  var revealElements = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(function (el) {
    return revealObserver.observe(el);
  });

  /* =========================================
     4. SIGNATURE CUISINES GRID TAB FILTER
     ========================================= */
  var tabButtons = document.querySelectorAll('.menu-tab-btn');
  var menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Remove active class from all tabs
      tabButtons.forEach(function (t) {
        return t.classList.remove('active-tab');
      });
      btn.classList.add('active-tab');

      var filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(function () {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* =========================================
     5. INTERACTIVE BUDGET ESTIMATOR
     ========================================= */
  var guestSlider = document.querySelector('#guest-slider');
  var guestValLbl = document.querySelector('#guest-count-val');
  var calcRange = document.querySelector('#calc-range');

  var eventSelectors = document.querySelectorAll('.selector-card');
  var tierCards = document.querySelectorAll('.tier-card');
  var addOnCheckboxes = document.querySelectorAll('.option-checkbox-wrap input');

  // Summary labels
  var sumEvent = document.querySelector('#summary-event');
  var sumGuests = document.querySelector('#summary-guests');
  var sumTier = document.querySelector('#summary-tier');
  var sumAddons = document.querySelector('#summary-addons');
  var bookBtn = document.querySelector('#estimator-book-btn');

  var selectedEvent = 'Wedding';
  var guestCount = 200;
  var tierCost = 500;
  var tierName = 'Classic';

  // Helper: Format as Indian Rupees (INR)
  var formatINR = function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Main Calculation Logic
  var calculateBudget = function calculateBudget() {
    if (!guestSlider) return;

    guestCount = parseInt(guestSlider.value, 10);
    guestValLbl.textContent = guestCount + ' Guests';
    sumGuests.textContent = guestCount + ' Guests';

    // Sum selected addons per plate costs
    var addOnTotal = 0;
    var selectedAddonNames = [];

    addOnCheckboxes.forEach(function (chk) {
      var parentWrap = chk.closest('.option-checkbox-wrap');
      if (chk.checked) {
        addOnTotal += parseInt(chk.value, 10);
        selectedAddonNames.push(chk.getAttribute('data-name'));
        if (parentWrap) {
          parentWrap.classList.add('checked-option');
        }
      } else {
        if (parentWrap) {
          parentWrap.classList.remove('checked-option');
        }
      }
    });

    sumAddons.textContent = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'None Selected';

    // Base Math
    var costPerPlate = tierCost + addOnTotal;
    var baseTotal = costPerPlate * guestCount;

    // Apply minor adjustment for events (e.g. corporate setups are slightly higher)
    var eventAdjustment = 1.0;
    if (selectedEvent === 'Corporate') eventAdjustment = 1.05;
    if (selectedEvent === 'House Party') eventAdjustment = 0.95;

    var adjustedTotal = baseTotal * eventAdjustment;

    // Create estimated range (e.g., -5% to +10%)
    var minEst = Math.round(adjustedTotal * 0.95);
    var maxEst = Math.round(adjustedTotal * 1.1);

    calcRange.textContent = formatINR(minEst) + ' - ' + formatINR(maxEst);
  };

  // Event Listeners for Estimator Inputs
  eventSelectors.forEach(function (card) {
    card.addEventListener('click', function () {
      eventSelectors.forEach(function (c) {
        return c.classList.remove('active-card');
      });
      card.classList.add('active-card');
      selectedEvent = card.querySelector('span').textContent;
      sumEvent.textContent = selectedEvent;
      calculateBudget();
    });
  });

  if (guestSlider) {
    guestSlider.addEventListener('input', calculateBudget);
  }

  tierCards.forEach(function (card) {
    card.addEventListener('click', function () {
      tierCards.forEach(function (c) {
        return c.classList.remove('active-tier');
      });
      card.classList.add('active-tier');
      tierCost = parseInt(card.getAttribute('data-multiplier'), 10);
      tierName = card.getAttribute('data-tier-name');
      sumTier.textContent = tierName;
      calculateBudget();
    });
  });

  addOnCheckboxes.forEach(function (chk) {
    chk.addEventListener('change', calculateBudget);
  });

  // Pre-fill setup and redirection when clicking booking button
  if (bookBtn) {
    bookBtn.addEventListener('click', function () {
      // Gather current calculation details
      var selectedAddons = [];
      addOnCheckboxes.forEach(function (c) {
        if (c.checked) {
          selectedAddons.push(c.getAttribute('data-name'));
        }
      });

      var details = {
        event: selectedEvent,
        guests: guestCount,
        tier: tierName,
        addons: selectedAddons.join(', ') || 'None'
      };

      // Store in localStorage
      localStorage.setItem('estimator_booking', JSON.stringify(details));

      // Redirect to Contact page
      var currentPath = window.location.pathname;
      if (currentPath.indexOf('index.html') !== -1 || currentPath.charAt(currentPath.length - 1) === '/') {
        window.location.href = './html/contact.html';
      } else {
        window.location.href = 'contact.html';
      }
    });
  }

  // Run initial calculation on load
  calculateBudget();

  /* =========================================
     6. CONTACT PAGE AUTO-FILL ENGINE
     ========================================= */
  var contactForm = document.querySelector('#contact-form');
  var messageArea = document.querySelector('#comment');

  if (contactForm && messageArea) {
    var rawBookingData = localStorage.getItem('estimator_booking');
    if (rawBookingData) {
      var data = JSON.parse(rawBookingData);

      // Compose a highly professional pre-filled message
      var templateMsg = 'Hi Munna Catering Services,\n\nI\'d like to inquire about booking my upcoming celebration!\n\nHere are my estimated details:\n- Event Type: ' + data.event + '\n- Expected Guests: ' + data.guests + '\n- Selected Menu Tier: ' + data.tier + '\n- Additional Services: ' + data.addons + '\n\nPlease get back to me with availability, menu details, and formal quote options. Thank you!';

      messageArea.value = templateMsg;

      // Clear the temporary local storage key
      localStorage.removeItem('estimator_booking');

      // Trigger floating label adjustment
      var label = messageArea.nextElementSibling;
      if (label) {
        messageArea.setAttribute('placeholder', ' '); // ensures css rules match
      }
    }
  }

  /* =========================================
     7. TESTIMONIALS INTERACTIVE CAROUSEL SLIDER
     ========================================= */
  var slides = document.querySelectorAll('.testimonial-slide');
  var dots = document.querySelectorAll('.slider-dot');

  if (slides.length > 0 && dots.length > 0) {
    var currentIdx = 0;
    var slideInterval = void 0;

    var showSlide = function showSlide(idx) {
      slides.forEach(function (s) {
        return s.classList.remove('active-slide');
      });
      dots.forEach(function (d) {
        return d.classList.remove('active-dot');
      });

      slides[idx].classList.add('active-slide');
      dots[idx].classList.add('active-dot');
      currentIdx = idx;
    };

    var nextSlide = function nextSlide() {
      var nextIdx = (currentIdx + 1) % slides.length;
      showSlide(nextIdx);
    };

    var startAutoSlide = function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 7000); // 7 seconds
    };

    var stopAutoSlide = function stopAutoSlide() {
      clearInterval(slideInterval);
    };

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopAutoSlide();
        var slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
        showSlide(slideIdx);
        startAutoSlide();
      });
    });

    // Start auto slide loop
    startAutoSlide();
  }

  /* =========================================
     8. FAQ INTERACTIVE ACCORDION PANELS
     ========================================= */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var header = item.querySelector('.faq-header');
    header.addEventListener('click', function () {
      var isActive = item.classList.contains('active-faq');

      // Close all other FAQs
      faqItems.forEach(function (i) {
        return i.classList.remove('active-faq');
      });

      // Toggle current one
      if (!isActive) {
        item.classList.add('active-faq');
      }
    });
  });
});