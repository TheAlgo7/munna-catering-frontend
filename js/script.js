document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     1. THEME SWITCH ENGINE & STATE MANAGEMENT
     ========================================= */
  const themeToggle = document.querySelector('#theme-checkbox');
  const savedTheme = localStorage.getItem('theme') || 'dark';

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
    themeToggle.addEventListener('change', () => {
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
  const navbar = document.querySelector('#navbar');
  const topBtn = document.querySelector('#top-btn');

  const handleScroll = () => {
    const scrollY = window.scrollY;

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
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* =========================================
     4. SIGNATURE CUISINES GRID TAB FILTER
     ========================================= */
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabButtons.forEach((t) => t.classList.remove('active-tab'));
      btn.classList.add('active-tab');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* =========================================
     5. INTERACTIVE BUDGET ESTIMATOR
     ========================================= */
  const guestSlider = document.querySelector('#guest-slider');
  const guestValLbl = document.querySelector('#guest-count-val');
  const calcRange = document.querySelector('#calc-range');

  const eventSelectors = document.querySelectorAll('.selector-card');
  const tierCards = document.querySelectorAll('.tier-card');
  const addOnCheckboxes = document.querySelectorAll('.option-checkbox-wrap input');

  // Summary labels
  const sumEvent = document.querySelector('#summary-event');
  const sumGuests = document.querySelector('#summary-guests');
  const sumTier = document.querySelector('#summary-tier');
  const sumAddons = document.querySelector('#summary-addons');
  const bookBtn = document.querySelector('#estimator-book-btn');

  let selectedEvent = 'Wedding';
  let guestCount = 200;
  let tierCost = 500;
  let tierName = 'Classic';

  // Helper: Format as Indian Rupees (INR)
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Main Calculation Logic
  const calculateBudget = () => {
    if (!guestSlider) return;

    guestCount = parseInt(guestSlider.value, 10);
    guestValLbl.textContent = guestCount + ' Guests';
    sumGuests.textContent = guestCount + ' Guests';

    // Sum selected addons per plate costs
    let addOnTotal = 0;
    const selectedAddonNames = [];

    addOnCheckboxes.forEach((chk) => {
      const parentWrap = chk.closest('.option-checkbox-wrap');
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

    sumAddons.textContent = selectedAddonNames.length > 0 
      ? selectedAddonNames.join(', ') 
      : 'None Selected';

    // Base Math
    const costPerPlate = tierCost + addOnTotal;
    const baseTotal = costPerPlate * guestCount;

    // Apply minor adjustment for events (e.g. corporate setups are slightly higher)
    let eventAdjustment = 1.0;
    if (selectedEvent === 'Corporate') eventAdjustment = 1.05;
    if (selectedEvent === 'House Party') eventAdjustment = 0.95;

    const adjustedTotal = baseTotal * eventAdjustment;

    // Create estimated range (e.g., -5% to +10%)
    const minEst = Math.round(adjustedTotal * 0.95);
    const maxEst = Math.round(adjustedTotal * 1.1);

    calcRange.textContent = formatINR(minEst) + ' - ' + formatINR(maxEst);
  };

  // Event Listeners for Estimator Inputs
  eventSelectors.forEach((card) => {
    card.addEventListener('click', () => {
      eventSelectors.forEach((c) => c.classList.remove('active-card'));
      card.classList.add('active-card');
      selectedEvent = card.querySelector('span').textContent;
      sumEvent.textContent = selectedEvent;
      calculateBudget();
    });
  });

  if (guestSlider) {
    guestSlider.addEventListener('input', calculateBudget);
  }

  tierCards.forEach((card) => {
    card.addEventListener('click', () => {
      tierCards.forEach((c) => c.classList.remove('active-tier'));
      card.classList.add('active-tier');
      tierCost = parseInt(card.getAttribute('data-multiplier'), 10);
      tierName = card.getAttribute('data-tier-name');
      sumTier.textContent = tierName;
      calculateBudget();
    });
  });

  addOnCheckboxes.forEach((chk) => {
    chk.addEventListener('change', calculateBudget);
  });

  // Pre-fill setup and redirection when clicking booking button
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      // Gather current calculation details
      const selectedAddons = [];
      addOnCheckboxes.forEach((c) => {
        if (c.checked) {
          selectedAddons.push(c.getAttribute('data-name'));
        }
      });

      const details = {
        event: selectedEvent,
        guests: guestCount,
        tier: tierName,
        addons: selectedAddons.join(', ') || 'None'
      };

      // Store in localStorage
      localStorage.setItem('estimator_booking', JSON.stringify(details));

      // Redirect to Contact page
      const currentPath = window.location.pathname;
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
  const contactForm = document.querySelector('#contact-form');
  const messageArea = document.querySelector('#comment');

  if (contactForm && messageArea) {
    const rawBookingData = localStorage.getItem('estimator_booking');
    if (rawBookingData) {
      const data = JSON.parse(rawBookingData);
      
      // Compose a highly professional pre-filled message
      const templateMsg = 'Hi Munna Catering Services,\n\nI\'d like to inquire about booking my upcoming celebration!\n\nHere are my estimated details:\n- Event Type: ' + data.event + '\n- Expected Guests: ' + data.guests + '\n- Selected Menu Tier: ' + data.tier + '\n- Additional Services: ' + data.addons + '\n\nPlease get back to me with availability, menu details, and formal quote options. Thank you!';
      
      messageArea.value = templateMsg;
      
      // Clear the temporary local storage key
      localStorage.removeItem('estimator_booking');

      // Trigger floating label adjustment
      const label = messageArea.nextElementSibling;
      if (label) {
        messageArea.setAttribute('placeholder', ' '); // ensures css rules match
      }
    }
  }

  /* =========================================
     7. TESTIMONIALS INTERACTIVE CAROUSEL SLIDER
     ========================================= */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');

  if (slides.length > 0 && dots.length > 0) {
    let currentIdx = 0;
    let slideInterval;

    const showSlide = (idx) => {
      slides.forEach((s) => s.classList.remove('active-slide'));
      dots.forEach((d) => d.classList.remove('active-dot'));

      slides[idx].classList.add('active-slide');
      dots[idx].classList.add('active-dot');
      currentIdx = idx;
    };

    const nextSlide = () => {
      let nextIdx = (currentIdx + 1) % slides.length;
      showSlide(nextIdx);
    };

    const startAutoSlide = () => {
      slideInterval = setInterval(nextSlide, 7000); // 7 seconds
    };

    const stopAutoSlide = () => {
      clearInterval(slideInterval);
    };

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
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
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active-faq');

      // Close all other FAQs
      faqItems.forEach((i) => i.classList.remove('active-faq'));

      // Toggle current one
      if (!isActive) {
        item.classList.add('active-faq');
      }
    });
  });
});
