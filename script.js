function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        const title = article.querySelector('.article-title').textContent.toLowerCase();
        const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
        const category = article.querySelector('.article-meta span').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            article.style.display = 'block';
            article.style.animation = 'fadeInUp 0.5s ease';
        } else {
            article.style.display = searchTerm === '' ? 'block' : 'none';
        }
    });
}

function filterByCategory(category) {
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        
        if (articleCategory === category) {
            article.style.display = 'block';
            article.style.animation = 'fadeInUp 0.5s ease';
        } else {
            article.style.display = 'none';
        }
    });
 
    const sectionTitle = document.querySelector('.section-title');
    const categoryNames = {
        'trends': 'Industry Trends',
        'technology': 'Innovative Technologies',
        'practices': 'Best Practices'
    };
    sectionTitle.textContent = categoryNames[category] || 'Latest Articles';
}
 
function readArticle(articleId) {
    alert(`Opening article: ${articleId}. In a real implementation, this would navigate to the full article page.`);
}
 
document.addEventListener('DOMContentLoaded', function() {
 
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });


    document.getElementById('searchInput').addEventListener('input', function(e) {
        if (e.target.value === '') {
            const articles = document.querySelectorAll('.article-card');
            articles.forEach(article => {
                article.style.display = 'block';
            });
            document.querySelector('.section-title').textContent = 'Latest Articles';
        }
    });

 
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

//     // Add dynamic loading animation for articles
//     const articles = document.querySelectorAll('.article-card');
//     articles.forEach((article, index) => {
//         article.style.animationDelay = `${index * 0.1}s`;
//         article.style.animation = 'fadeInUp 0.6s ease forwards';
//     });
// });

// // Additional utility functions

// // Show all articles (reset filters)
// function showAllArticles() {
//     const articles = document.querySelectorAll('.article-card');
//     articles.forEach(article => {
//         article.style.display = 'block';
//         article.style.animation = 'fadeInUp 0.5s ease';
//     });
//     document.querySelector('.section-title').textContent = 'Latest Articles';
//     document.getElementById('searchInput').value = '';
// }

// // Get articles by category
// function getArticlesByCategory(category) {
//     const articles = document.querySelectorAll('.article-card');
//     const categoryArticles = [];
    
//     articles.forEach(article => {
//         if (article.getAttribute('data-category') === category) {
//             categoryArticles.push({
//                 title: article.querySelector('.article-title').textContent,
//                 excerpt: article.querySelector('.article-excerpt').textContent,
//                 date: article.querySelector('.article-meta span:last-child').textContent,
//                 category: article.querySelector('.article-meta span:first-child').textContent
//             });
//         }
//     });
    
//     return categoryArticles;
// }

// // Search within specific category
// function searchInCategory(searchTerm, category) {
//     const articles = document.querySelectorAll('.article-card');
    
//     articles.forEach(article => {
//         const articleCategory = article.getAttribute('data-category');
//         const title = article.querySelector('.article-title').textContent.toLowerCase();
//         const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
        
//         if (articleCategory === category && 
//             (title.includes(searchTerm.toLowerCase()) || excerpt.includes(searchTerm.toLowerCase()))) {
//             article.style.display = 'block';
//             article.style.animation = 'fadeInUp 0.5s ease';
//         } else {
//             article.style.display = 'none';
//         }
//     });
// }

// // Add article interaction tracking (for analytics)
// function trackArticleInteraction(articleId, action) {
//     // In a real implementation, this would send data to analytics service
//     console.log(`Article interaction tracked: ${articleId} - ${action}`);
// }

// // Add click tracking to articles
// document.addEventListener('DOMContentLoaded', function() {
//     const readMoreButtons = document.querySelectorAll('.read-more');
//     readMoreButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const articleCard = this.closest('.article-card');
//             const articleTitle = articleCard.querySelector('.article-title').textContent;
//             trackArticleInteraction(articleTitle, 'read-more-clicked');
//         });
//     });
    
//     const articleCards = document.querySelectorAll('.article-card');
//     articleCards.forEach(card => {
//         card.addEventListener('click', function(e) {
//             if (!e.target.classList.contains('read-more')) {
//                 const articleTitle = this.querySelector('.article-title').textContent;
//                 trackArticleInteraction(articleTitle, 'card-clicked');
//             }
//         });
//     });
// });