document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '2a53fb313409413ea7aceecc85e4781b';
    const newsContainer = document.getElementById('news-container');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const defaultImage = '/mnt/data/image.png'; // Use o caminho correto para sua imagem padrão
    const nav = document.querySelector('nav');

    function isValidImageURL(url) {
        return url && (url.startsWith('http://') || url.startsWith('https://'));
    }

    function fetchNews(category = '') {
        let url = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${apiKey}`;
        if (category) {
            url += `&category=${category}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = '';
                data.articles.forEach(article => {
                    const newsArticle = document.createElement('article');
                    const imageUrl = isValidImageURL(article.urlToImage) ? article.urlToImage : defaultImage;
                    newsArticle.innerHTML = `
                        <h2>${article.title}</h2>
                        <img src="${imageUrl}" alt="Imagem da notícia">
                        <p>${article.description || ''}</p>
                        <a href="${article.url}" target="_blank" class="read-more-btn">Ler Mais</a>
                    `;
                    newsContainer.appendChild(newsArticle);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar notícias:', error);
                newsContainer.innerHTML = '<p>Erro ao carregar notícias. Por favor, tente novamente mais tarde.</p>';
            });
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }

        if (window.scrollY > nav.offsetTop) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }
    });

    document.getElementById('inicio').addEventListener('click', () => fetchNews());
    document.getElementById('politica').addEventListener('click', () => fetchNews('politics'));
    document.getElementById('esportes').addEventListener('click', () => fetchNews('sports'));
    document.getElementById('entretenimento').addEventListener('click', () => fetchNews('entertainment'));
    document.getElementById('tecnologia').addEventListener('click', () => fetchNews('technology'));

    fetchNews(); // Carregar todas as notícias inicialmente

    window.scrollToTop = scrollToTop;
});
