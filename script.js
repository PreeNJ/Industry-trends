// ======== script.js ======== //

/* =========  Search + Filter  ========= */

function performSearch() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.article-card').forEach(card => {
    const title   = card.querySelector('.article-title').textContent.toLowerCase();
    const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
    const cat     = card.dataset.category.toLowerCase();

    const match = !term
      || title.includes(term)
      || excerpt.includes(term)
      || cat.includes(term);

    card.style.display = match ? 'block' : 'none';
    if (match) {
      card.style.animation = 'fadeInUp 0.5s ease';
    }
  });
}

function filterByCategory(cat) {
  document.querySelectorAll('.article-card').forEach(card => {
    const show = card.dataset.category === cat;
    card.style.display  = show ? 'block' : 'none';
    if (show) {
      card.style.animation = 'fadeInUp 0.5s ease';
    }
  });

  const map = {
    trends: 'Industry Trends',
    technology: 'Innovative Technologies',
    practices: 'Best Practices',
  };
  document.querySelector('.section-title').textContent = map[cat] || 'Latest Articles';
}

function showAllArticles() {
  document.querySelectorAll('.article-card').forEach(card => {
    card.style.display  = 'block';
    card.style.animation = 'fadeInUp 0.5s ease';
  });
  document.querySelector('.section-title').textContent = 'Latest Articles';
  document.getElementById('searchInput').value = '';
}

/* =========  “Read More”  ========= */

function readArticle(articleId) {
  // 1) Analytics stub (replace with your real analytics call if needed)
  trackArticleInteraction(articleId, 'read-more-clicked');

  // 2) Redirect to the corresponding file in the "articles/" folder
  //    Notice: NO leading slash—this is a relative path from index.html
  window.location.href = `articles/${articleId}.html`;
}

/* =========  Analytics helper (console.log stub)  ========= */

function trackArticleInteraction(id, action) {
  console.log(`Article interaction: ${id} -> ${action}`);
}

/* =========  One-time initialization  ========= */

document.addEventListener('DOMContentLoaded', () => {
  // — Search: Enter key triggers performSearch()
  const searchEl = document.getElementById('searchInput');
  searchEl.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  // — If search is cleared, show all articles
  searchEl.addEventListener('input', e => {
    if (e.target.value === '') {
      showAllArticles();
    }
  });

  // — Smooth-scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // — Animate article cards on load
  document.querySelectorAll('.article-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
    card.style.animation      = 'fadeInUp 0.6s ease forwards';
  });

  // — Wire up every “Read More” button to stopPropagation & call readArticle()
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();  
      e.stopPropagation(); 

      // Extract the slug from the existing inline onclick="readArticle('slug')"
      const onclickText = btn.getAttribute('onclick') || '';
      const match = onclickText.match(/readArticle\(['"](.+?)['"]\)/);
      if (match) {
        const id = match[1];
        readArticle(id);
      }
    });
  });

  // — Track generic card clicks (ignoring clicks on the “Read More” button)
  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('read-more')) {
        const title = card.querySelector('.article-title').textContent;
        trackArticleInteraction(title, 'card-clicked');
      }
    });
  });
});
