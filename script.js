function setLang(lang) {
  document.body.classList.toggle('en', lang === 'en');

  var buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(function(button, index) {
    button.classList.toggle('active', (index === 0 && lang === 'no') || (index === 1 && lang === 'en'));
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
  var hamburger = document.getElementById('hamburger');

  if (!drawer || !hamburger) return;

  var isOpen = drawer.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeDrawer() {
  var drawer = document.getElementById('mobileDrawer');
  var hamburger = document.getElementById('hamburger');

  if (drawer) drawer.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');

  document.body.style.overflow = '';
}

function showAllFadeItems() {
  var fadeItems = document.querySelectorAll('.fade-up');

  fadeItems.forEach(function(item) {
    item.classList.add('visible');
    item.style.opacity = '1';
  });
}

function openTravelNotes() {
  function openTravelNotes() {
  var images = [
    'images/travel-notes/Brazil_jan2015.jpg',
    'images/travel-notes/mississippi_des2007.jpg'
  ];

  var currentImage = 0;

  var oldOverlay = document.getElementById('travelNotesOverlay');
  if (oldOverlay) oldOverlay.remove();

  var overlay = document.createElement('div');
  overlay.id = 'travelNotesOverlay';
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.background = 'rgba(0,0,0,0.94)';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.padding = '40px';

  var image = document.createElement('img');
  image.src = images[currentImage];
  image.alt = 'Brazil';
  image.style.maxWidth = '92vw';
  image.style.maxHeight = '86vh';
  image.style.objectFit = 'contain';
  image.style.display = 'block';

  var backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.textContent = 'Tilbake';
  backButton.style.position = 'absolute';
  backButton.style.left = '24px';
  backButton.style.top = '24px';
  backButton.style.color = '#ffffff';
  backButton.style.background = 'rgba(0,0,0,0.45)';
  backButton.style.border = '1px solid rgba(255,255,255,0.45)';
  backButton.style.padding = '11px 18px';
  backButton.style.cursor = 'pointer';
  backButton.style.letterSpacing = '0.12em';
  backButton.style.textTransform = 'uppercase';
  backButton.style.fontSize = '13px';
  backButton.style.fontFamily = 'Syne, Arial, sans-serif';

  var nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.textContent = 'Neste';
  nextButton.style.position = 'absolute';
  nextButton.style.right = '24px';
  nextButton.style.top = '50%';
  nextButton.style.transform = 'translateY(-50%)';
  nextButton.style.color = '#ffffff';
  nextButton.style.background = 'rgba(0,0,0,0.45)';
  nextButton.style.border = '1px solid rgba(255,255,255,0.45)';
  nextButton.style.padding = '11px 18px';
  nextButton.style.cursor = 'pointer';
  nextButton.style.letterSpacing = '0.12em';
  nextButton.style.textTransform = 'uppercase';
  nextButton.style.fontSize = '13px';
  nextButton.style.fontFamily = 'Syne, Arial, sans-serif';
    
  var closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.textContent = 'Lukk';
  closeButton.style.position = 'absolute';
  closeButton.style.right = '24px';
  closeButton.style.top = '24px';
  closeButton.style.color = '#ffffff';
  closeButton.style.background = 'rgba(0,0,0,0.45)';
  closeButton.style.border = '1px solid rgba(255,255,255,0.45)';
  closeButton.style.padding = '11px 18px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.letterSpacing = '0.12em';
  closeButton.style.textTransform = 'uppercase';
  closeButton.style.fontSize = '13px';
  closeButton.style.fontFamily = 'Syne, Arial, sans-serif';

  var errorMessage = document.createElement('div');
  errorMessage.textContent = 'Bildet kunne ikke lastes. Kontroller filnavn og mappe.';
  errorMessage.style.display = 'none';
  errorMessage.style.position = 'absolute';
  errorMessage.style.bottom = '30px';
  errorMessage.style.left = '50%';
  errorMessage.style.transform = 'translateX(-50%)';
  errorMessage.style.color = '#ffffff';
  errorMessage.style.background = 'rgba(0,0,0,0.7)';
  errorMessage.style.padding = '12px 18px';

  function closeOverlay() {
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'ArrowLeft') {
      closeOverlay();
    }
  }

  image.onerror = function() {
    errorMessage.style.display = 'block';
  };

  backButton.addEventListener('click', function(event) {
    event.stopPropagation();
    closeOverlay();
  });

  closeButton.addEventListener('click', function(event) {
    event.stopPropagation();
    closeOverlay();
  });

  nextButton.addEventListener('click', function(event) {
  event.stopPropagation();

  currentImage = currentImage + 1;

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  image.src = images[currentImage];
});
    
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  overlay.appendChild(image);
  overlay.appendChild(backButton);
  overlay.appendChild(nextButton);
  overlay.appendChild(closeButton);
  overlay.appendChild(errorMessage);


  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);
}

function connectTravelNotesCard() {
  var travelCard = document.querySelector('.collection-card[data-gallery="2"]');

  if (!travelCard) {
    var cards = document.querySelectorAll('.collection-card');

    cards.forEach(function(card) {
      var heading = card.querySelector('h3');

      if (heading && heading.textContent.trim().toLowerCase() === 'travel notes') {
        travelCard = card;
      }
    });
  }

  if (!travelCard) return;

  travelCard.style.cursor = 'pointer';

  travelCard.addEventListener('click', function(event) {
    event.preventDefault();
    openTravelNotes();
  });
}

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');

  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  showAllFadeItems();
  connectTravelNotesCard();
});
