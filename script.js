function setLang(lang) {
  document.body.classList.toggle('en', lang === 'en');

  document.querySelectorAll('.lang-btn').forEach(function(btn, i) {
    btn.classList.toggle(
      'active',
      (i === 0 && lang === 'no') || (i === 1 && lang === 'en')
    );
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

  if (!drawer || !btn) return;

  var isOpen = drawer.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeDrawer() {
  var drawer = document.getElementById('mobileDrawer');
  var btn = document.getElementById('hamburger');

  if (drawer) drawer.classList.remove('open');
  if (btn) btn.classList.remove('open');

  document.body.style.overflow = '';
}

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e, i) {
        if (e.isIntersecting) {
          e.target.style.animationDelay = (i * 0.08) + 's';
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up').forEach(function(el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.fade-up').forEach(function(el) {
      el.classList.add('visible');
    });
  }

  var galleries = {
    '1': [
      'images/northern-silence/001.jpg'
    ],

    '2': [
      'images/travel-notes/Brazil_jan2015.jpg'
    ],

    '3': [
      'images/architecture/001.jpg'
    ],

    '4': [
      'images/people/001.jpg'
    ],

    '5': [
      'images/details/001.jpg'
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
      overlay.id = 'photoOverlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-label', 'Photo viewer');

      overlay.style.cssText = [
        'position:fixed',
        'inset:0',
        'background:rgba(0,0,0,0.94)',
        'display:flex',
        'justify-content:center',
        'align-items:center',
        'z-index:9999',
        'padding:4vh 5vw'
      ].join(';');

      var img = document.createElement('img');
      img.id = 'galleryImage';
      img.src = images[current];
      img.alt = 'Selected photograph';
      img.style.cssText = [
        'max-width:92vw',
        'max-height:88vh',
        'width:auto',
        'height:auto',
        'object-fit:contain',
        'box-shadow:0 20px 80px rgba(0,0,0,0.45)'
      ].join(';');

      var prevBtn = document.createElement('button');
      prevBtn.id = 'prevBtn';
      prevBtn.type = 'button';
      prevBtn.innerHTML = '&#10094;';
      prevBtn.setAttribute('aria-label', 'Tilbake');
      prevBtn.style.cssText = [
        'position:absolute',
        'left:24px',
        'top:50%',
        'transform:translateY(-50%)',
        'color:white',
        'font-size:56px',
        'line-height:1',
        'background:none',
   
