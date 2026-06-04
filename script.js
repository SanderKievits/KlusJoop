(function () {
  'use strict';

  /* ==========================================
     HERO AFBEELDING FOUTMELDING
     ========================================== */

  var heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    var heroSrc = heroBg.style.backgroundImage.replace(/^url\(['"]?|['"]?\)$/g, '');
    var testImg = new Image();
    testImg.onerror = function () {
      heroBg.style.backgroundImage = 'none';
      var melding = document.createElement('p');
      melding.textContent = 'Afbeelding kon niet geladen worden.';
      melding.style.cssText = 'position:absolute;bottom:16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.6);color:#fff;padding:8px 16px;border-radius:4px;font-size:0.85rem;pointer-events:none;';
      heroBg.parentElement.appendChild(melding);
    };
    testImg.src = heroSrc;
  }

  /* ==========================================
     HAMBURGER MENU
     ========================================== */

  var hamburger   = document.querySelector('.hamburger');
  var mobielmenu  = document.getElementById('mobiel-menu');
  var sluiten     = document.querySelector('.mobiel-sluiten');

  if (hamburger && mobielmenu) {

    function openMenu() {
      mobielmenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (sluiten) sluiten.focus();
    }

    function sluitMenu() {
      mobielmenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', openMenu);
    if (sluiten) sluiten.addEventListener('click', sluitMenu);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobielmenu.classList.contains('open')) {
        sluitMenu();
      }
    });

    mobielmenu.addEventListener('click', function (e) {
      if (e.target === mobielmenu) sluitMenu();
    });
  }

  /* ==========================================
     LIGHTBOX (alleen op projecten.html)
     ========================================== */

  var lightbox  = document.getElementById('lightbox');

  if (lightbox) {
    var lbImg     = document.getElementById('lightbox-img');
    var lbSluiten = document.getElementById('lightbox-sluiten');
    var lbVorige  = document.getElementById('lightbox-vorige');
    var lbVolgende = document.getElementById('lightbox-volgende');

    var items      = Array.from(document.querySelectorAll('.project-item'));
    var huidigIndex = 0;

    function laadAfbeelding(index) {
      var item = items[index];
      var img  = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      huidigIndex = index;
    }

    function openLightbox(index) {
      laadAfbeelding(index);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbSluiten.focus();
    }

    function sluitLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      items[huidigIndex].focus();
    }

    function vorige() {
      var nieuw = (huidigIndex - 1 + items.length) % items.length;
      laadAfbeelding(nieuw);
    }

    function volgende() {
      var nieuw = (huidigIndex + 1) % items.length;
      laadAfbeelding(nieuw);
    }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        openLightbox(parseInt(item.dataset.index, 10));
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(parseInt(item.dataset.index, 10));
        }
      });
    });

    lbSluiten.addEventListener('click', sluitLightbox);
    lbVorige.addEventListener('click', vorige);
    lbVolgende.addEventListener('click', volgende);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) sluitLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      sluitLightbox();
      if (e.key === 'ArrowLeft')   vorige();
      if (e.key === 'ArrowRight')  volgende();
    });
  }

}());
