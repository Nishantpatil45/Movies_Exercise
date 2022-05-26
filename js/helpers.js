function prepareData(jsonData) {
    let preparedData = [];

    for (let obj of jsonData) {
        let {
            cast,
            directors,
            writers,
            genres,
            original_language: originalLanguage,
            certification,
            poster_path: posterPath,
            release_date: releaseDate,
            runtime,
            title,
            vote_average: rating,
            overview
        } = obj;

        // change poster path to complete path
        posterPath = prefix + posterPath;

        // release date in strings
        let releaseDateObject = new Date(releaseDate);
        let dateOptions = {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
        releaseDate = releaseDateObject.toLocaleDateString("en-us", dateOptions);

        // convert runtime duration to string
        runtime = convertToHrsMins(runtime);

        // convert array of objects to array of strings
        directors = convertToStringArray(directors);
        cast = convertToStringArray(cast);
        writers = convertToStringArray(writers);

        // rating with exactly one decimal place
        rating = rating.toFixed(1);

        // if single genre convert to array
        if (typeof genres === "string") {
            genres = [genres];
        }

        preparedData.push({
            title,
            runtime,
            genres,
            releaseDate,
            originalLanguage,
            certification,
            posterPath,
            cast,
            directors,
            writers,
            rating,
            overview
        });
    }

    return preparedData;
}

function convertToHrsMins(timeInMinutes) {
    let hrs = Math.floor(timeInMinutes / 60);
    let minutes = timeInMinutes % 60;

    let str = minutes + " min";
    if (hrs > 0) {
        str = hrs + " h " + str;
    }
    return str;
}

function convertToStringArray(objArray) {
    let stringArray = [];
    objArray.forEach(function (obj) {
        stringArray.push(obj.name);
    });
    return stringArray;
}

function removeAllCards() {
    document.querySelectorAll(".col").forEach(function (card) {
        card.remove();
    });
}

function showResults() {
    let len = searchResults.length;

    // initialize search variables
    searchResultsCurrPage = 1;
    totalResultPages = Math.ceil(len / cardsPerPage);
    if (totalResultPages > pagesDisplayed) {
        searchPagesDisplayed = pagesDisplayed
    } else {
        searchPagesDisplayed = totalResultPages;
    }

    // remove all previous page list items
    document.querySelectorAll("ul.pagination > .page-item").forEach(function (page) {
        page.remove();
    });

    // create new set of page items specific to search results
    generatePages(searchResultsCurrPage, searchPagesDisplayed, true);
    let start = (searchResultsCurrPage - 1) * cardsPerPage;
    let end = searchResultsCurrPage * cardsPerPage;
    if (currentPage === totalResultPages) end = len;
    for (let i = start; i < end; i++) {
        createCard(movieData[searchResults[i]], searchResults[i]);
    }
}
