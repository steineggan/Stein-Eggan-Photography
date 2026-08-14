/* ------------------------------------------------------------------
 * script.js
 * Stein Eggan Photography Journal
 * ------------------------------------------------------------------
 * Innhold:
 * 1. Språkbytte (NO/EN) og mobilmeny
 * 2. Fade-in for seksjoner
 * 3. Generisk galleri-/lightbox-system (Samlinger + Expeditions-regioner)
 * 4. Interaktivt Expeditions-kart (Leaflet + fallback-data)
 * ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------
 * GALLERY_DATA
 * Enkel, robust datastruktur for alle bildegallerier på siden.
 *
 * Hver nøkkel tilsvarer verdien i attributtet data-gallery på et
 * klikkbart kort/element. "images" er en liste med filstier under
 * images/-mappen. Listen kan være tom mens bilder mangler - da
 * viser siden en diskret "kommer snart"-melding i stedet for å
 * krasje eller åpne et tomt galleri.
 *
 * SLIK LEGGER DU TIL FLERE BILDER:
 * 1. Last opp bildefilene i riktig undermappe under images/.
 * 2. Legg filstien til i riktig "images"-liste under (rekkefølgen
 *    i listen er rekkefølgen bildene vises i).
 * 3. Ikke noe annet i koden må endres - kortet finner galleriet
 *    automatisk via data-gallery-attributtet i HTML-en.
 * ------------------------------------------------------------------ */
var GALLERY_DATA = {
  'northern-silence': {
    title: 'Northern Silence',
    images: []
  },
  'travel-notes': {
    title: 'Travel Notes',
    images: [
      'images/travel-notes/Brazil_jan2015.jpg',
      'images/travel-notes/mississippi_des2007.jpg'
    ]
  },
  'architecture': {
    title: 'Architecture',
    images: []
  },
  'people': {
    title: 'People',
    images: [
      'images/people/people_001.jpg',
      'images/people/people_002.jpg'      
    ]
  },
  'details': {
    title: 'Details',
    images: []
  },
  'regions-norway': {
    title: 'Norway',
    images: [
      'images/regions/norway/IMG_9898.jpg'
    ]
  },
  'regions-europe': {
    title: 'Europe',
    images: []
  },
  'regions-asia-pacific': {
    title: 'Asia / Pacific',
    images: []
  },
  'regions-americas': {
    title: 'Americas',
    images: []
  }
};

function makeOverlayButton(label, position) {
  var button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  button.style.position = 'absolute';
  button.style.color = '#ffffff';
  button.style.background = 'rgba(0,0,0,0.45)';
  button.style.border = '1px solid rgba(255,255,255,0.45)';
  button.style.padding = '11px 18px';
  button.style.cursor = 'pointer';
  button.style.letterSpacing = '0.12em';
  button.style.textTransform = 'uppercase';
  button.style.fontSize = '13px';
  button.style.fontFamily = 'Syne, Arial, sans-serif';

  for (var key in position) {
    if (Object.prototype.hasOwnProperty.call(position, key)) {
      button.style[key] = position[key];
    }
  }

  return button;
}

function openGalleryOverlay(images, title) {
  var currentImage = 0;

  var oldOverlay = document.getElementById('galleryOverlay');
  if (oldOverlay) oldOverlay.remove();

  var overlay = document.createElement('div');
  overlay.id = 'galleryOverlay';
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
  image.alt = title || 'Photograph';
  image.style.maxWidth = '92vw';
  image.style.maxHeight = '86vh';
  image.style.objectFit = 'contain';
  image.style.display = 'block';

  var backButton = makeOverlayButton('Tilbake', { left: '24px', top: '24px' });
  var nextButton = makeOverlayButton('Neste', { right: '24px', top: '50%', transform: 'translateY(-50%)' });
  var closeButton = makeOverlayButton('Lukk', { right: '24px', top: '24px' });

  var counter = document.createElement('div');
  counter.style.position = 'absolute';
  counter.style.left = '50%';
  counter.style.top = '24px';
  counter.style.transform = 'translateX(-50%)';
  counter.style.color = 'rgba(255,255,255,0.75)';
  counter.style.fontFamily = 'Syne, Arial, sans-serif';
  counter.style.fontSize = '12px';
  counter.style.letterSpacing = '0.14em';
  counter.style.textTransform = 'uppercase';

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

  function updateCounter() {
    counter.textContent = (currentImage + 1) + ' / ' + images.length;
  }

  function showImage() {
    errorMessage.style.display = 'none';
    image.src = images[currentImage];
    updateCounter();
  }

  function closeOverlay() {
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  }

  function goNext() {
    currentImage = currentImage + 1;
    if (currentImage >= images.length) {
      currentImage = 0;
    }
    showImage();
  }

  function onKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'ArrowLeft') {
      closeOverlay();
    } else if (event.key === 'ArrowRight') {
      goNext();
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
    goNext();
  });

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      closeOverlay();
    }
  });

  if (images.length > 1) {
    overlay.appendChild(nextButton);
    overlay.appendChild(counter);
  }

  overlay.appendChild(image);
  overlay.appendChild(backButton);
  overlay.appendChild(closeButton);
  overlay.appendChild(errorMessage);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);

  updateCounter();
}

function openComingSoonOverlay() {
  var oldOverlay = document.getElementById('galleryOverlay');
  if (oldOverlay) oldOverlay.remove();

  var overlay = document.createElement('div');
  overlay.id = 'galleryOverlay';
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.bottom = '0';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.padding = '40px';

  var box = document.createElement('div');
  box.style.background = '#0f1117';
  box.style.border = '1px solid rgba(255,255,255,0.16)';
  box.style.color = '#f5f3ef';
  box.style.padding = '2.6rem 3rem';
  box.style.textAlign = 'center';
  box.style.maxWidth = '420px';
  box.style.fontFamily = 'Syne, Arial, sans-serif';

  var text = document.createElement('p');
  text.style.fontSize = '0.95rem';
  text.style.letterSpacing = '0.02em';
  text.style.lineHeight = '1.7';
  text.style.marginBottom = '1.5rem';
  text.innerHTML = '<span data-lang="no">Denne samlingen er under arbeid. Nye bilder legges til fortløpende.</span><span data-lang="en">This collection is being prepared. New photographs will be added soon.</span>';

  var closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.textContent = 'OK';
  closeButton.style.color = '#0f1117';
  closeButton.style.background = '#d4b47a';
  closeButton.style.border = '0';
  closeButton.style.padding = '11px 26px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.letterSpacing = '0.12em';
  closeButton.style.textTransform = 'uppercase';
  closeButton.style.fontSize = '12px';
  closeButton.style.fontFamily = 'Syne, Arial, sans-serif';

  function closeOverlay() {
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeyDown);
  }

  function onKeyDown(event) {
    if (event.key === 'Escape') closeOverlay();
  }

  closeButton.addEventListener('click', function(event) {
    event.stopPropagation();
    closeOverlay();
  });

  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) closeOverlay();
  });

  box.appendChild(text);
  box.appendChild(closeButton);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);
}

function openGallery(key) {
  var gallery = GALLERY_DATA[key];

  if (!gallery || !gallery.images || gallery.images.length === 0) {
    openComingSoonOverlay();
    return;
  }

  openGalleryOverlay(gallery.images, gallery.title);
}

function wireGalleryTriggers() {
  var triggers = document.querySelectorAll('[data-gallery]');

  triggers.forEach(function(trigger) {
    trigger.style.cursor = 'pointer';

    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      var key = trigger.getAttribute('data-gallery');
      openGallery(key);
    });
  });
}

/* ------------------------------------------------------------------
 * Expeditions-kart (Leaflet + PHOTO_LOCATIONS-fallback)
 *
 * Kartet bruker PHOTO_LOCATIONS fra photo-data.js som datakilde.
 * Siden dette er en statisk side uten byggeprosess, hentes ikke
 * GPS-koordinater automatisk fra EXIF ved sidelasting - de legges
 * inn manuelt i photo-data.js (se dokumentasjon der). Dersom
 * Leaflet ikke laster (f.eks. blokkert nettverk), feiler ikke
 * siden - kartfeltet viser da en enkel tekstmelding i stedet.
 * ------------------------------------------------------------------ */
function initExpeditionMap() {
  var mapEl = document.getElementById('expeditionMap');
  if (!mapEl) return;

  var locations = (typeof PHOTO_LOCATIONS !== 'undefined') ? PHOTO_LOCATIONS : [];

  if (typeof L === 'undefined') {
    mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(245,243,239,0.6);font-family:Syne,Arial,sans-serif;font-size:0.85rem;letter-spacing:0.08em;text-align:center;padding:2rem;">Kartet kunne ikke lastes.</div>';
    return;
  }

  try {
    var map = L.map(mapEl, {
      scrollWheelZoom: false,
      worldCopyJump: true
    }).setView([25, 15], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    var goldIcon = L.divIcon({
      className: 'expedition-marker',
      html: '<span></span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    locations.forEach(function(loc) {
      if (typeof loc.lat !== 'number' || typeof loc.lng !== 'number') return;

      var marker = L.marker([loc.lat, loc.lng], { icon: goldIcon }).addTo(map);

      var popupHtml = '<div class="expedition-popup">' +
        '<strong>' + loc.title + '</strong>' +
        '<span class="expedition-popup-region">' + (loc.region || '') + '</span>' +
        '<span class="expedition-popup-series">' + (loc.series || '') + '</span>' +
        (loc.link ? '<a href="' + loc.link + '">' +
          '<span data-lang="no">Se samling</span><span data-lang="en">View collection</span></a>' : '') +
        '</div>';

      marker.bindPopup(popupHtml);
    });

    setTimeout(function() {
      map.invalidateSize();
    }, 200);
  } catch (error) {
    mapEl.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(245,243,239,0.6);font-family:Syne,Arial,sans-serif;font-size:0.85rem;letter-spacing:0.08em;text-align:center;padding:2rem;">Kartet kunne ikke lastes.</div>';
  }
}

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');

  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  showAllFadeItems();
  wireGalleryTriggers();
  initExpeditionMap();
});
