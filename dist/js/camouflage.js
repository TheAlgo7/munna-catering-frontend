(() => {
  const toggle = document.querySelector("#burger-toggle");
  const navbar = document.querySelector("#navbar");
  const topBtn = document.querySelector("#top-btn");

  // 1. Handle Scroll Effects
  const handleScroll = () => {
    // Show/Hide Back to top button
    if (topBtn) {
      if (window.scrollY > 300) {
        topBtn.style.bottom = "30px";
      } else {
        topBtn.style.bottom = "-80px";
      }
    }

    // Navbar Camouflage (Green when scrolled, Transparent when top)
    if (window.scrollY > 50 || toggle.checked) {
      navbar.style.backgroundColor = "var(--emerald-green)";
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      navbar.style.backgroundColor = "transparent";
      navbar.style.boxShadow = "none";
    }
  };

  // 2. Event Listeners
  window.addEventListener("scroll", handleScroll);

  // Check immediately on load
  handleScroll();

  // 3. Close mobile menu when a link is clicked
  const navLinks = document.querySelectorAll("nav ul a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggle.checked = false; // Uncheck the burger
      handleScroll(); // Reset navbar color
    });
  });

  // 4. Toggle Listener
  if (toggle) {
    toggle.addEventListener("change", handleScroll);
  }
})();
