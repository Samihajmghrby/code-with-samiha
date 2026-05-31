// Code with Samiha — shared.js
// handles nav active state, copy buttons, filter buttons, and small interactions

document.addEventListener('DOMContentLoaded', function () {

  // --- active nav link ---
  var links = document.querySelectorAll('.nav-link');
  var page  = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href === page || href.split('?')[0] === page) {
      link.classList.add('active');
    }
  });

  // --- copy button ---
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.code-block');
      if (!block) return;
      var code = block.querySelector('.code-block-body');
      if (!code) return;

      navigator.clipboard.writeText(code.innerText).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--teal-mid)';
        setTimeout(function () {
          btn.textContent = original;
          btn.style.color = '';
        }, 1800);
      });
    });
  });

  // --- language filter ---
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var val = btn.getAttribute('data-filter');
        var cards = document.querySelectorAll('.lang-card-wrap');

        cards.forEach(function (card) {
          if (val === 'all') {
            card.style.display = '';
            return;
          }
          var lvl  = card.getAttribute('data-level')  || '';
          var type = card.getAttribute('data-type')   || '';
          if (lvl === val || type === val) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- community post filter ---
  var postBtns = document.querySelectorAll('[data-tag]');
  if (postBtns.length > 0) {
    postBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        postBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var tag   = btn.getAttribute('data-tag');
        var posts = document.querySelectorAll('.post-card');

        posts.forEach(function (post) {
          if (tag === 'all') {
            post.classList.remove('hidden');
            return;
          }
          var ptag = post.getAttribute('data-tag') || '';
          if (ptag === tag) {
            post.classList.remove('hidden');
          } else {
            post.classList.add('hidden');
          }
        });
      });
    });
  }

});
