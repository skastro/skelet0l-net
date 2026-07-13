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
      + '<a href="/" class="logo"><span class="a">skele</span><span class="b">.t0l</span></a>'
      + '<button id="menubtn" aria-label="Menu" aria-expanded="false">\u2630</button>'
      + '<div class="links" id="navlinks">';

    NAV_LINKS.forEach(function (lnk) {
      var cls = (active === lnk.href) ? ' class="on"' : '';
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
      + '<a href="https://github.com/skastro" target="_blank" rel="noopener">GITHUB</a>'
      + '</div>'
      + '<div class="foot-contact">Open to collaboration, creative partnerships, and role conversations. <a href="/skeletol/">Let\u2019s talk.</a></div>'
      + '<div class="foot-base">'
      + '<span>skele.t0l is Tony Scoburgh\u2019s portfolio for music, systems, and the Astral Compendium.</span>'
      + '<span class="c">\u00A9 2026 skele.t0l</span>'
      + '</div></footer>';
    return html;
  }

  function inject() {
    /* Nav: insert at top of body (before first element) */
    var navTarget = document.getElementById('site-header');
    if (navTarget) {
      navTarget.innerHTML = buildNav();
    } else {
      document.body.insertAdjacentHTML('afterbegin', buildNav());
    }

    /* Footer: append at bottom of body */
    var footTarget = document.getElementById('site-footer');
    if (footTarget) {
      footTarget.innerHTML = buildFooter();
    } else {
      document.body.insertAdjacentHTML('beforeend', buildFooter());
    }

    /* Mobile menu toggle */
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
