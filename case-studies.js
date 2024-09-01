document.addEventListener("DOMContentLoaded", function() {
    const caseStudyContent = document.getElementById('case-study-content');

    // Wikipedia API URLs for case studies
    const caseStudies = [
        {
            title: "Drip_irrigation",
            displayTitle: "Drip Irrigation"
        },
        {
            title: "Rainwater_harvesting",
            displayTitle: "Rainwater Harvesting"
        },
        {
            title: "Desert_agriculture",
            displayTitle: "Desert Farming"
        }
    ];

    // Function to fetch and display case studies
    function fetchCaseStudy(caseStudy) {
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${caseStudy.title}`)
            .then(response => response.json())
            .then(data => {
                const article = document.createElement('article');
                article.classList.add('case-study');

                article.innerHTML = `
                    <h3>${caseStudy.displayTitle}</h3>
                    <p>${data.extract}</p>
                    <a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a>
                `;

                caseStudyContent.appendChild(article);
            })
            .catch(error => {
                console.error('Error fetching data from Wikipedia:', error);
                caseStudyContent.innerHTML = '<p>Failed to load case studies from Wikipedia.</p>';
            });
    }

    // Clear existing content
    caseStudyContent.innerHTML = '';

    // Fetch and display all case studies
    caseStudies.forEach(fetchCaseStudy);
});
