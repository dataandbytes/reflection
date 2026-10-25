// app.js — the whole of it. No framework, no network, no analytics.
//
// What IS stored (locally, on this device only):
//   • which question indices you've already seen, so you don't repeat
//     until you've worked through every one;
//   • today's chosen question, so reopening the app today shows the same one.
// What is NEVER stored: your answers. Those live in your notebook.

(function () {
  "use strict";

  var SEEN_KEY = "reflection.seen";   // JSON array of indices seen this cycle
  var TODAY_KEY = "reflection.today"; // { date: "YYYY-MM-DD", index: n }

  // --- tiny, forgiving storage helpers (private mode can throw) --------
  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function todayStamp() {
    // Local date, not UTC — "today" should mean the user's today.
    var d = new Date();
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  // --- choose the question for today -----------------------------------
  function pickForToday() {
    var stamp = todayStamp();
    var today = load(TODAY_KEY, null);

    // Already chosen a question today? Keep showing it.
    if (today && today.date === stamp &&
        typeof today.index === "number" && QUESTIONS[today.index]) {
      return today.index;
    }

    var seen = load(SEEN_KEY, []);
    if (!Array.isArray(seen)) seen = [];

    // Which questions are still unseen this cycle?
    var remaining = [];
    for (var i = 0; i < QUESTIONS.length; i++) {
      if (seen.indexOf(i) === -1) remaining.push(i);
    }
    // Seen them all — start a fresh cycle.
    if (remaining.length === 0) {
      seen = [];
      for (var j = 0; j < QUESTIONS.length; j++) remaining.push(j);
    }

    var index = remaining[Math.floor(Math.random() * remaining.length)];
    seen.push(index);

    save(SEEN_KEY, seen);
    save(TODAY_KEY, { date: stamp, index: index });
    return index;
  }

  // --- render ----------------------------------------------------------
  function render() {
    var index = pickForToday();
    var q = QUESTIONS[index];

    var longDate = new Date().toLocaleDateString(undefined, {
      weekday: "long", month: "long", day: "numeric"
    });

    document.getElementById("date").textContent = longDate;
    document.getElementById("category").textContent = q.category;
    document.getElementById("question").textContent = q.text;
    document.title = "Reflection — " + longDate;
  }

  // --- calendar reminder (.ics with a daily recurrence) ----------------
  function pad(n) { return String(n).padStart(2, "0"); }

  function buildIcs(hhmm) {
    var parts = (hhmm || "21:00").split(":");
    var hour = parseInt(parts[0], 10) || 0;
    var min = parseInt(parts[1], 10) || 0;

    var now = new Date();
    // First occurrence: today at the chosen time (calendar rolls it
    // forward on its own if that moment has already passed).
    var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, min, 0);
    var end = new Date(start.getTime() + 15 * 60 * 1000); // a gentle 15 minutes

    function fmtLocal(d) {
      return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
        "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
    }
    function fmtUtc(d) {
      return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
        "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + "Z";
    }

    var url = location.href.split("#")[0];
    var uid = "reflection-" + Date.now() + "@" + (location.hostname || "local");

    // Floating local time (no TZID) so it fires at the same wall-clock
    // time wherever the person happens to be.
    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Reflection//Daily Question//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:" + uid,
      "DTSTAMP:" + fmtUtc(now),
      "DTSTART:" + fmtLocal(start),
      "DTEND:" + fmtLocal(end),
      "RRULE:FREQ=DAILY",
      "SUMMARY:A moment with yourself",
      "DESCRIPTION:Open your question\\, then answer it in your notebook — not on a screen.\\n" + url,
      "URL:" + url,
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      "DESCRIPTION:A moment with yourself",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ];
    return lines.join("\r\n");
  }

  function downloadIcs(hhmm) {
    var blob = new Blob([buildIcs(hhmm)], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "reflection-reminder.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  // --- sheet wiring ----------------------------------------------------
  function wireSheet() {
    var backdrop = document.getElementById("backdrop");
    var open = document.getElementById("openReminder");
    var close = document.getElementById("closeReminder");
    var dl = document.getElementById("downloadIcs");
    var time = document.getElementById("time");

    function show() { backdrop.hidden = false; }
    function hide() { backdrop.hidden = true; }

    open.addEventListener("click", show);
    close.addEventListener("click", hide);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) hide();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !backdrop.hidden) hide();
    });
    dl.addEventListener("click", function () {
      downloadIcs(time.value);
      hide();
    });
  }

  // --- go --------------------------------------------------------------
  render();
  wireSheet();
})();
