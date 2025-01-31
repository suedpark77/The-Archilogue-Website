function initializeSearch() {
    const searchField = document.getElementById("search-field");
    const mainContent = document.querySelector(".posts");



    searchField.addEventListener("keydown", async function (event) {
        if (event.key === "Enter") { // Check if the "Enter" key is pressed
            const query = this.value.toLowerCase();
            const resultsContainer = document.getElementById('search-results');

            // Clear previous results
            resultsContainer.innerHTML = '';

            if (query === '') return;

            try {
                // Fetch the articles from 
                const response = await fetch("/nodes.json");
                const articles = await response.json();

                // Filter articles based on the query
                const filteredArticles = articles.filter(article =>
                    article.title.toLowerCase().includes(query) ||
                    article.content.toLowerCase().includes(query)
                );

                mainContent.style.display = "none";
                resultsContainer.style.display = "block";

                // Display results
                const resultsTitle = document.createElement('div');
                resultsTitle.innerHTML = '<h1>نتائج البحث</h1>';
                resultsContainer.appendChild(resultsTitle);

                if (filteredArticles.length > 0) {
                    filteredArticles.forEach(article => {
                        const result = document.createElement('div');
                        result.className = 'search-result hilight';
                        result.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.content.substring(0, 100)}...</p>
                <a class="filldiv" href="${article.url}"></a>
              `;
                        resultsContainer.appendChild(result);
                    });
                } else {
                    resultsContainer.innerHTML = '<p>تعذّر البحث! حاول مجدداً باستخدام كلمات مختلفة.</p>';
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
                resultsContainer.innerHTML = '<p>تحميل النتائج غير ممكن.</p>';
            }

        }
    });
}
