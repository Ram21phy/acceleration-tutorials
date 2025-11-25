// make nav solid on scroll
(function(){
  const nav = document.querySelector('.nav-transparent');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });
})();
