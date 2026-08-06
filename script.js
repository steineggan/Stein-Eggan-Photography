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
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var fadeItems = document.querySelectorAll('.fade-up');

  fadeItems.forEach(function(item) {
    item.classList.add('visible');
  });

  var galleries = {
    '2': [
      {
        image: 'images/travel-notes/Brazil_jan2015.jpg',
        title: 'Brazil',
        text: 'Brazil, January 2015. A travel note from a journey shaped by light, movement and place.'
      }
    ]
  };

  var cards = document.querySelectorAll('.collection-card[data-gallery]');

  cards.forEach(function(card) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function() {
      var galleryId = card.getAttribute('data-gallery');
      var gallery = galleries[galleryId];

      if (!gallery || gallery.length === 0) {
        return;
      }

      var current = 0;
      var item = gallery[current];

      var overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.background = 'rgba(0,0,0,0.94)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999';
      overlay.style.padding = '40px';

      var content = document.createElement('div');
      content.style.maxWidth = '92vw';
      content.style.maxHeight = '92vh';
      content.style.textAlign = 'center';

      var image = document.createElement('img');
      image.src = item.image;
      image.alt = item.title;
      image.style.maxWidth = '92vw';
      image.style.maxHeight = '72vh';
      image.style.objectFit = 'contain';
      image.style.display = 'block';
      image.style.margin = '0 auto';

      var captionTitle = document.createElement('h3');
      captionTitle.textContent = item.title;
      captionTitle.style.color = 'white';
      captionTitle.style.marginTop = '20px';
      captionTitle.style.marginBottom = '8px';
      captionTitle.style.fontFamily = 'Cormorant Garamond, serif';
      captionTitle.style.fontSize = '32px';
      captionTitle.style.fontWeight = '300';

      var captionText = document.createElement('p');
      captionText.textContent = item.text;
      captionText.style.color = 'rgba(255,255,255,0.72)';
      captionText.style.maxWidth = '720px';
      captionText.style.margin = '0 auto';
      captionText.style.lineHeight = '1.7';
      captionText.style.fontSize = '15px';

      content.appendChild(image);
      content.appendChild(captionTitle);
      content.appendChild(captionText);

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

      overlay.appendChild(content);
      overlay.appendChild(prevButton);
      overlay.appendChild(nextButton);
      overlay.appendChild(closeButton);

      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';

      function updateImage() {
        var activeItem = gallery[current];
        image.src = activeItem.image;
        image.alt = activeItem.title;
        captionTitle.textContent = activeItem.title;
        captionText.textContent = activeItem.text;
      }

      function closeOverlay() {
        overlay.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', escapeClose);
      }

      prevButton.addEventListener('click', function(event) {
        event.stopPropagation();

        if (current === 0) {
          closeOverlay();
          return;
        }

        current = current - 1;
        updateImage();
      });

      nextButton.addEventListener('click', function(event) {
        event.stopPropagation();

        if (gallery.length <= 1) {
          return;
        }

        current = current + 1;

        if (current
