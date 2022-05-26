function addEventListenersToPages(isSearch = false) {
    let pageNumElements = document.querySelectorAll(".page-numbers");
    document.getElementById("first-page").addEventListener("click", function () {
        if (pageNumElements[0].innerHTML != 1 || document.querySelector(".active > a").innerHTML != 1) {
            let pageNum = 1;
            pageNumElements.forEach(function (pageNumElement) {
                pageNumElement.innerHTML = pageNum;
                pageNumElement.id = "p-" + pageNum;
                pageNum++;
            });
        }
        clickHandlerCreateCards(1, isSearch);
    });
    document.getElementById("last-page").addEventListener("click", function () {
        // change shown page numbers list if first page among the displayed pages does not belong to the group
        let firstPageNum = (isSearch ? totalResultPages - searchPagesDisplayed : totalPages - pagesDisplayed) + 1;
        if (pageNumElements[0].innerHTML != firstPageNum) {
            pageNumElements.forEach(function (pageNumElement) {
                pageNumElement.innerHTML = firstPageNum;
                pageNumElement.id = "p-" + firstPageNum;
                firstPageNum++;
            });

        }

        if (isSearch) {
            clickHandlerCreateCards(totalResultPages, true);
        } else {
            clickHandlerCreateCards(totalPages, false);
        }
    });

    pageNumElements.forEach(function (pageNumElement) {
        pageNumElement.addEventListener("click", function () {
            pageNum = Number(this.id.split("-").pop());
            clickHandlerCreateCards(pageNum, isSearch);
        });
    });

    document.getElementById("previous-page").addEventListener("click", function () {
        if (isSearch) {
            // do nothing if on 1st page
            if (searchResultsCurrPage === 1) {
                return;
            }

            // change page numbers and other operations performed if current page
            // is the the first active page among other page items
            if (searchResultsCurrPage % searchPagesDisplayed === 1) {
                let pageNum = searchResultsCurrPage - searchPagesDisplayed;
                pageNumElements.forEach(function (pageNumElement) {
                    pageNumElement.innerHTML = pageNum;
                    pageNumElement.id = "p-" + pageNum;
                    pageNum++;
                });
            }
            clickHandlerCreateCards(searchResultsCurrPage - 1, true);

        } else {
            // do nothing if on 1st page
            if (currentPage === 1) {
                return;
            }

            // change page numbers and other operations performed if current page
            // is the the first active page among other page items
            if (currentPage % pagesDisplayed === 1) {
                let pageNum = currentPage - pagesDisplayed;
                pageNumElements.forEach(function (pageNumElement) {
                    pageNumElement.innerHTML = pageNum;
                    pageNumElement.id = "p-" + pageNum;
                    pageNum++;
                });
            }
            clickHandlerCreateCards(currentPage - 1, false);
        }
    });

    document.getElementById("next-page").addEventListener("click", function () {
        if (isSearch) {
            // do nothing if already on last page
            if (searchResultsCurrPage === totalResultPages) {
                return;
            }

            // change page numbers and other operations performed if current page
            // is the the last active page among other page items
            if (searchResultsCurrPage % searchPagesDisplayed === 0) {
                let pageNum = searchResultsCurrPage + 1;
                pageNumElements.forEach(function (pageNumElement) {
                    pageNumElement.innerHTML = pageNum;
                    pageNumElement.id = "p-" + pageNum;
                    pageNum++;
                });
            }
            clickHandlerCreateCards(searchResultsCurrPage + 1, true);
        } else {
            // do nothing if already on last page
            if (currentPage === totalPages) {
                return;
            }

            if (currentPage % pagesDisplayed === 0) {
                let pageNum = currentPage + 1;
                pageNumElements.forEach(function (pageNumElement) {
                    pageNumElement.innerHTML = pageNum;
                    pageNumElement.id = "p-" + pageNum;
                    pageNum++;
                });
            }
            clickHandlerCreateCards(currentPage + 1, false);
        }
    });
}

function clickHandlerCreateCards(pageNum, isSearch) {
    if (!isSearch) {
        if (currentPage === pageNum) {
            return;
        } else {
            removeAllCards();

            currentPage = pageNum;
            document.querySelector("body").className = "page-" + pageNum;

            // re-create all cards
            let start = (currentPage - 1) * cardsPerPage;
            let end = currentPage * cardsPerPage;
            if (currentPage === totalPages) end = movieData.length;
            for (let i = start; i < end; i++) {
                createCard(movieData[i], i);
            }

            // remove active class from previous page
            document.querySelector(".active").classList.remove("active");

            // add active class to updated currentPage
            document.getElementById("p-" + currentPage).parentNode.classList.add("active");

            document.getElementById("current-page").innerHTML = currentPage;
        }
    } else {
        if (searchResultsCurrPage === pageNum) {
            return;
        } else {
            removeAllCards();

            searchResultsCurrPage = pageNum;
            document.querySelector("body").className = "page-" + pageNum;

            // re-create all cards
            let start = (searchResultsCurrPage - 1) * cardsPerPage;
            let end = searchResultsCurrPage * cardsPerPage;
            if (searchResultsCurrPage === totalResultPages) end = searchResults.length;
            for (let i = start; i < end; i++) {
                createCard(movieData[searchResults[i]], searchResults[i]);
            }

            // remove active class from previous page
            document.querySelector(".active").classList.remove("active");

            // add active class to updated currentPage
            document.getElementById("p-" + searchResultsCurrPage).parentNode.classList.add("active");

            document.getElementById("current-page").innerHTML = searchResultsCurrPage;
        }
    }
}
