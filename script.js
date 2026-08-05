function setLang(lang){document.body.classList.toggle('en',lang==='en');document.querySelectorAll('.lang-btn').forEach(function(btn,i){btn.classList.toggle('active',(i===0&&lang==='no')||(i===1&&lang==='en'));});var mlNo=document.getElementById('mlNo');var mlEn=document.getElementById('mlEn');if(mlNo&&mlEn){mlNo.classList.toggle('active',lang==='no');mlEn.classList.toggle('active',lang==='en');}}function toggleDrawer(){var drawer=document.getElementById('mobileDrawer');var btn=document.getElementById('hamburger');var isOpen=drawer.classList.toggle('open');btn.classList.toggle('open',isOpen);document.body.style.overflow=isOpen?'hidden':'';}function closeDrawer(){document.getElementById('mobileDrawer').classList.remove('open');document.getElementById('hamburger').classList.remove('open');document.body.style.overflow='';}window.addEventListener('scroll',function(){document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>40);});var observer=new IntersectionObserver(function(entries){entries.forEach(function(e,i){if(e.isIntersecting){e.target.style.animationDelay=(i*.08)+'s';e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.12});document.querySelectorAll('.fade-up').forEach(function(el){observer.observe(el);});
document.addEventListener('DOMContentLoaded', () => {

  const essayCards = document.querySelectorAll('.essay-card');

  essayCards.forEach(card => {

    card.addEventListener('click', () => {

      const images = card.querySelectorAll('img');

      if(images.length < 2) return;

      let current = 0;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.95);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
      `;

      overlay.innerHTML = `
        <button id="prevPhoto" style="position:absolute;left:20px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;">❮</button>
        <img id="photoViewer" src="${images[0].src}" styleyle="position:absolute;right:20px;font-size:2rem;color:white;background:none;border:none;cursor:pointer;">❯</button>
      `;

      document.body.appendChild(overlay);

      const viewer = overlay.querySelector('#photoViewer');

      overlay.querySelector('#nextPhoto').onclick = () => {
        current = (current + 1) % images.length;
        viewer.src = images[current].src;
      };

      overlay.querySelector('#prevPhoto').onclick = () => {
        current = (current - 1 + images.length) % images.length;
        viewer.src = images[current].src;
      };

      overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
      };

    });

  });

});
document.addEventListener('DOMContentLoaded', () => {

  const galleries = {

    1: [
      'bilder/northern1.jpg',
      'bilder/northern2.jpg',
      'bilder/northern3.jpg'
    ],

    2: [
      'bilder/travel1.jpg',
      'bilder/travel2.jpg',
      'bilder/travel3.jpg'
    ],

    3: [
      'bilder/architecture1.jpg',
      'bilder/architecture2.jpg'
    ],

    4: [
      'bilder/woodland1.jpg',
      'bilder/woodland2.jpg'
    ],

    5: [
      'bilder/details1.jpg',
      'bilder/details2.jpg'
    ]

  };

  document.querySelectorAll('.collection-card').forEach(card => {

    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {

      const id = card.dataset.gallery;
      const images = galleries[id];

      if (!images || images.length === 0) return;

      let current = 0;

      const overlay = document.createElement('div');

      overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.95);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
      `;

      overlay.innerHTML = `
        <button id="prevBtn"
                style="position:absolute;left:20px;color:white;font-size:40px;background:none;border:none;">
          ❮
        </button>

        <img id="galleryImage"
             src="${images[0]}"
             style="max-width:90%;max-height:90%;">

        <button ckground:none;border:none;">
          ❯
        </button>
      `;

      document.body.appendChild(overlay);

      const img = document.getElementById('galleryImage');

      document.getElementById('nextBtn').onclick = () => {
        current = (current + 1) % images.length;
        img.src = images[current];
      };

      document.getElementById('prevBtn').onclick = () => {
        current = (current - 1 + images.length) % images.length;
        img.src = images[current];
      };

      overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
      };

    });
  });

});
