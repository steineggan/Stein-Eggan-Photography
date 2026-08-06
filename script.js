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

  var galleries = {
    '2': [
      'images/travel-notes/Brazil_jan2015.jpg'
    ]
  };

  var cards = document.querySelectorAll('.collection-card[data-gallery]');

  cards.forEach(function(card) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function() {
      var galleryId = card.getAttribute('data-gallery');
      var images = galleries[galleryId];

      if (!images || images.length === 0) {
        return;
      }

      var current = 0;

      var overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.background = 'rgba(0,0,0,0.94)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999';
      overlay.style.padding = '40px';

      var image = document.createElement('img');
      image.src = images[current];
      image.alt = 'Travel Notes';
      image.style.maxWidth = '92vw';
      image.style.maxHeight = '88vh';
      image.style.objectFit = 'contain';

      var prevButton = document.createElement('button');
      prevButton.type = 'button';
      prevButton.textContent = '‹';
      prevButton.style.position = 'absolute';
      prevButton.style.left = '24px';
      prevButton.style.top = '50%';
      prevButton.style.transform = 'translateY(-50%)';
      prevButton.style.color = 'white';
      prevButton.style.background = 'none';
      prevButton.style.border = 'none';
      prevButton.style.fontSize = '70px';
      prevButton.style.cursor = 'pointer';

      var nextButton = document.createElement('button');
      nextButton.type = 'button';
      nextButton.textContent = '›';
      nextButton.style.position = 'absolute';
      nextButton.style.right = '24px';
      nextButton.style.top = '50%';
      nextButton.style.transform = 'translateY(-50%)';
      nextButton.style.color = 'white';
      nextButton.style.background = 'none';
      nextButton.style.border = 'none';
      nextButton.style.fontSize = '70px';
      nextButton.style.cursor = 'pointer';
      nextButton.style.opacity = '0.25';

      var closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.textContent = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '22px';
      closeButton.style.right = '28px';
      closeButton.style.color = 'white';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
      closeButton.style.fontSize = '42px';
      closeButton.style.cursor = 'pointer';

      overlay.appendChild(image);
      overlay.appendChild(prevButton);
      overlay.appendChild(nextButton)
