/* ============================================================
   shell.js — unified nav + footer for skelet0l.net
   One source of truth. Every page loads this; nav and footer
   are injected at runtime. Update here, propagates everywhere.
   skele.t0l · festina lente
   ============================================================ */
(function () {
  'use strict';

  var NAV_LINKS = [
    { href: '/', label: 'HOME' },
    { href: '/music/', label: 'MUSIC' },
    { href: '/about/', label: 'ABOUT' },
    { href: '/os/', label: 'OS KIT' },
    { href: '/skeletol/', label: 'COLLABORATION' }
  ];

  function getActive() {
    var p = window.location.pathname;
    if (p !== '/' && !p.endsWith('/')) p += '/';
    return p;
  }

  function buildNav() {
    var active = getActive();
    var html = '<nav>'
      + '<a href="/" class="logo" aria-label="skele.t0l home"><span class="a">skele</span><span class="b">.t0l</span></a>'
      + '<button id="menubtn" aria-label="Menu" aria-expanded="false">\u2630</button>'
      + '<div class="links" id="navlinks">';

    NAV_LINKS.forEach(function (lnk) {
      var cls = (active === lnk.href) ? ' class="on" aria-current="page"' : '';
      html += '<a href="' + lnk.href + '"' + cls + '>' + lnk.label + '</a>';
    });

    html += '</div></nav><div class="rule"></div>';
    return html;
  }

  function buildFooter() {
    var html = '<footer><div class="foot-links">';

    NAV_LINKS.forEach(function (lnk) {
      html += '<a href="' + lnk.href + '">' + lnk.label + '</a>';
    });

    html += '<span class="dot">\u00B7</span>'
      + '<a class="dim" href="https://github.com/skastro" target="_blank" rel="noopener">GITHUB</a>'
      + '</div>'
      + '<p class="foot-contact">Open to collaboration, creative partnerships, and role conversations. <a href="/skeletol/">Let\u2019s chat!</a></p>'
      + '<div class="foot-base">'
      + '<span>skele.t0l: My portfolio for music, systems, and the Astral Compendium.</span>'
      + '<span class="c">\u00A9 2026 skele.t0l</span>'
      + '</div></footer>';
    return html;
  }

  function inject() {
    var navTarget = document.getElementById('site-header');
    if (navTarget) {
      navTarget.innerHTML = buildNav();
    } else {
      document.body.insertAdjacentHTML('afterbegin', buildNav());
    }

    var footTarget = document.getElementById('site-footer');
    if (footTarget) {
      footTarget.innerHTML = buildFooter();
    } else {
      document.body.insertAdjacentHTML('beforeend', buildFooter());
    }

    var btn = document.getElementById('menubtn');
    var links = document.getElementById('navlinks');
    if (btn && links) {
      btn.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
