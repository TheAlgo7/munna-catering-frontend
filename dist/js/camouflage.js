'use strict';

(function () {
  var navbar = document.querySelector('#navbar'),
      toggle = document.querySelector('#burger-toggle'),
      navbarStyle = navbar.style;

  toggle.checked = false;

  toggle.addEventListener('change', function () {
    if (toggle.checked) {
      navbarStyle.backgroundColor = 'rgb(0, 153, 110)';
      navbarStyle.backgroundImage = 'url(../images/edge-skew.png)';
    } else {
      navbarStyle.backgroundColor = 'transparent';
      navbarStyle.backgroundImage = 'none';
    }
  });
})();