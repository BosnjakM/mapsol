// Videos nur abspielen, wenn sichtbar. Bei «Bewegung reduzieren» gar nicht.
(function () {
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start = document.getElementById('video-start');
  if (ruhig && start) { start.removeAttribute('autoplay'); start.pause(); }
  var videos = document.querySelectorAll('.deko-video');
  if (ruhig || !('IntersectionObserver' in window)) return;
  var beob = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (e.isIntersecting) { e.target.play().catch(function () {}); }
      else { e.target.pause(); }
    });
  }, { threshold: 0.25 });
  videos.forEach(function (v) { beob.observe(v); });
})();
