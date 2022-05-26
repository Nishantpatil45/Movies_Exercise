const prefix = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
const parentNode = document.querySelector("div.row.row-cols-1");
const cardNode = document.querySelector(".col");
let movieData;
let currentPage = 1;
let totalPages;
let pagesDisplayed = 5;
let cardsPerPage = 20;

// for search results
let searchResults = [];
let searchResultsCurrPage = -1;
let totalResultPages = -1;
let searchPagesDisplayed = 5;

const badgeClassArray = [
    "badge rounded-pill bg-gradient bg-danger",
    "badge rounded-pill bg-gradient bg-warning text-dark",
    "badge rounded-pill bg-gradient bg-info text-dark",
    "badge rounded-pill bg-gradient bg-light text-dark",
    "badge rounded-pill bg-gradient bg-dark",
    "badge rounded-pill bg-gradient bg-primary",
    "badge rounded-pill bg-gradient bg-secondary",
    "badge rounded-pill bg-gradient bg-success"
];

(async function () {
    let response = await fetch("../movies.json");
    movieData = await response.json();

    console.log("Original: ", movieData);
    movieData = prepareData(movieData);
    console.log(movieData);

    // initial preparations
    totalPages = Number(movieData.length / cardsPerPage);
    let start = (currentPage - 1) * cardsPerPage;
    let end = currentPage * cardsPerPage;
    for (let i = start; i < end; i++) {
        createCard(movieData[i], i);
    }
    generatePages(1, 5);

    let input = document.getElementById("filter-year-input");
    input.addEventListener("input", function searchFilter() {

        // as soon as the user starts serching, reset appropriate variables to initial values
        currentPage = 1;        // so that next and previous buttons work correctly
        searchResults = [];     // don't consider previous searches
        removeAllCards();       // remove previous cards on display
        // remove the pagination to create room for pagination specific to searched results
        document.querySelectorAll("ul.pagination > .page-item").forEach(function (page) {
            page.remove();
        });

        // on empty input - reset to initial html
        if (this.value === "") {
            for (let i = start; i < end; i++) {
                createCard(movieData[i], i);
            }
            generatePages(1, 5, false);

        } else if (this.value.length < 4) {
            document.getElementById("current-page").innerHTML = 0;
            document.getElementById("total-pages").innerHTML = 0;

        } else if (this.value.length === 4) {
            for (let i = 0; i < movieData.length; i++) {
                if (movieData[i].releaseDate.slice(-4) == this.value) {
                    searchResults.push(i);
                }
            }
            showResults();
        }
    });
})();
