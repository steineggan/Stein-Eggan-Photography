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
  var isOpen = drawer.classList.toggle('open');

  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

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

document.addEventListener('DOMContentLoaded', function() {

  var galleries = {
    1: [
      'images/northern-silence/001.jpg'
    ],

    2: [
      'images/travel-notes/Brazil_jan2015.jpg'
    ],

    3: [
      'images/architecture/001.jpg'
    ],

    4: [
      'images/people/001.jpg'
    ],

    5: [
      'images/details/001.jpg'
    ]
  };

  document.querySelectorAll('.collection-card').forEach(function(card) {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function() {
      var id = card.getAttribute('data-gallery');
      var images = galleries[id];

      if (!images || images.length === 0) {
        return;
      }

      var current = 0;

      var overlay = document.createElement('div');

      overlay.style.cssText =
        'position:fixed;' +
        'inset:0;' +
        'background:rgba(0,0,0,.95);' +
        'display:flex;' +
        'justify-content:center;' +
        'align-items:center;' +
        'z-index:9999;';

      overlay.innerHTML =
        '<button id="prevBtn" style="position:absolute;left:24px;color:white;font-size:52px;background:none;border:none;cursor:pointer;z-index:10000;">❮</button>' +

        '' + images[current] + '' +

        '<button id="nextBtn" style="position:absolute;right:24px;color:white;font-size:52px;background:none;border:none;cursor:pointer;z-index:10000;">❯</button>' +

        '<button id="closeBtn" style="position:absolute;top:22px;right:28px;color:white;font-size:34px;background:none;border:none;cursor:pointer;z-index:10000;">×</button>';

      document.body.appendChild(overlay);

      var img = document.getElementById('galleryImage');
      var prevBtn = document.getElementById('prevBtn');
      var nextBtn = document.getElementById('nextBtn');
      var closeBtn = document.getElementById('closeBtn');

      prevBtn.onclick = function(e) {
        e.stopPropagation();

        if (current === 0) {
          overlay.remove();
          return;
        }

        current = current - 1;
        img.src = images[current];
      };

      nextBtn.onclick = function(e) {
        e.stopPropagation();

        if (images.length === 1) {
          return;
        }

        current = (current + 1) % images.length;
        img.src = images[current];
      };

      closeBtn.onclick = function(e) {
        e.stopPropagation();
        overlay.remove();
      };

      overlay.onclick = function(e) {
        if (e.target === overlay) {
          overlay.remove();
        }
      };
    });
  });
});
