function setLang(lang) {
  document.body.classList.toggle('en', lang === 'en');

  var langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(function(btn, i) {
    var activeNo = i === 0 && lang === 'no';
    var activeEn = i === 1 && lang === 'en';
    btn.classList.toggle('active', activeNo || activeEn);
  });

  var mlNo = document.getElementById('mlNo');
  var mlEn = document.getElementById('mlEn');

  if (mlNo && mlEn) {
    mlNo.classList.toggle('active', lang === 'no');
    mlEn.classList.toggle('active', lang === 'en');
  }
}

function toggleDrawer() {
  var drawer = document.getElementById('mobileDrawer');
  var btn = document.getElementById('hamburger');

  if (!drawer || !btn) {
    return;
  }

  var isOpen = drawer.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeDrawer() {
  var drawer = document.getElementById('mobileDrawer');
  var btn = document.getElementById('hamburger');

  if (drawer) {
    drawer.classList.remove('open');
  }

  if (btn) {
    btn.classList.remove('open');
  }

  document.body.style.overflow = '';
}

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');

  if (navbar) {
    navbar.classList.toggle('scrolled', Boolean(window.scrollY));
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var fadeItems = document.querySelectorAll('.fade-up');

  fadeItems.forEach(function(item) {
    item.classList.add('visible');
  });

  var travelNotesImage = 'images/travel-notes/Brazil_jan2015.jpg';

  var travelCard = document.querySelector('.collection-card[data-gallery="2"]');

  if (!travelCard) {
    return;
  }

  travelCard.style.cursor = 'pointer';

  travelCard.addEventListener('click', function() {
    var overlay = document.createElement('div');

    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.right = '0';
    overlay.style.bottom = '0';
    overlay.style.background = 'rgba(0,0,0,0.94)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.padding = '40px';

    var image = document.createElement('img');

    image.src = travelNotesImage;
    image.alt = 'Brazil';
    image.style.maxWidth = '92vw';
    image.style.maxHeight = '88vh';
    image.style.objectFit = 'contain';
    image.style.display = 'block';

    var backButton = document.createElement('button');

    backButton.type = 'button';
    backButton.textContent = 'Tilbake';
    backButton.style.position = 'absolute';
    backButton.style.left = '24px';
    backButton.style.top = '24px';
    backButton.style.color = 'white';
    backButton.style.background = 'rgba(0,0,0,0.35)';
    backButton.style.border = '1px solid rgba(255,255,255,0.35)';
    backButton.style.padding = '10px 16px';
    backButton.style.fontSize = '14px';
    backButton.style.letterSpacing = '0.12em';
    backButton.style.textTransform = 'uppercase';
    backButton.style.cursor = 'pointer';

    var closeButton = document.createElement('button');

    closeButton.type = 'button';
    closeButton.textContent = 'Lukk';
    closeButton.style.position = 'absolute';
    closeButton.style.
