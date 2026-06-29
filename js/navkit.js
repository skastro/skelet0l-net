/* ============================================================
   navkit.v1 — shared data layer for the Astral Codex desktop
   skele.t0l · festina lente
   ------------------------------------------------------------
   The Compass is the WRITER. The Map and the Ship Log are READERS.
   All three are served from one origin, so they share localStorage
   live; the `storage` event carries changes across windows/tabs.

   Usage (readers):
     NavKit.getCurrentBearing();        // Capture | null
     NavKit.getReadings();              // Reading[]  (newest first)
     NavKit.getCaptures();              // Capture[]  (Ship Log form)
     NavKit.getUpdated();               // ISO string | null
     NavKit.onChange(fn);               // fires on any navkit.* write
                                        //   from another window/tab
   ============================================================ */
(function (root) {
  "use strict";

  var NS = "navkit.v1.";
  var KEYS = {
    currentBearing: NS + "currentBearing",
    readings:       NS + "readings",
    captures:       NS + "captures",
    updated:        NS + "updated"
  };

  /* graceful storage — falls back to memory in private mode */
  var mem = {}, ok = true;
  try { var t = "__navkit_t"; localStorage.setItem(t, "1"); localStorage.removeItem(t); }
  catch (e) { ok = false; }

  function get(key) {
    try { return ok ? localStorage.getItem(key) : (key in mem ? mem[key] : null); }
    catch (e) { return key in mem ? mem[key] : null; }
  }
  function set(key, val) {
    try { if (ok) localStorage.setItem(key, val); else mem[key] = val; }
    catch (e) { mem[key] = val; }
  }
  function parse(raw, fallback) {
    if (raw == null || raw === "") return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }

  var NavKit = {
    persistent: ok,
    KEYS: KEYS,

    /* ---- reads ---- */
    getCurrentBearing: function () { return parse(get(KEYS.currentBearing), null); },
    getReadings:       function () { return parse(get(KEYS.readings), []); },
    getCaptures:       function () { return parse(get(KEYS.captures), []); },
    getUpdated:        function () { return get(KEYS.updated); },

    /* ---- writes (the Compass owns these; exposed for symmetry) ---- */
    setReadings: function (readings, captures, currentBearing) {
      set(KEYS.readings, JSON.stringify(readings || []));
      if (captures !== undefined) set(KEYS.captures, JSON.stringify(captures || []));
      if (currentBearing !== undefined)
        set(KEYS.currentBearing, currentBearing ? JSON.stringify(currentBearing) : "");
      set(KEYS.updated, new Date().toISOString());
    },

    /* ---- live sync ---- */
    isKitKey: function (key) {
      return key === KEYS.currentBearing || key === KEYS.readings ||
             key === KEYS.captures || key === KEYS.updated;
    },
    /* fn(detail) where detail = {key, bearing, readings, captures} */
    onChange: function (fn) {
      var self = this;
      window.addEventListener("storage", function (e) {
        if (!e.key || !self.isKitKey(e.key)) return;
        fn({
          key: e.key,
          bearing:  self.getCurrentBearing(),
          readings: self.getReadings(),
          captures: self.getCaptures()
        });
      });
    }
  };

  root.NavKit = NavKit;
})(window);
