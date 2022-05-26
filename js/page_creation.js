function generatePages(start, end, isSearch) {
    let ulElement = document.querySelector("ul.pagination ");

    let pageListHTML =
    `<li class="page-item"><a class="page-link" id="first-page" href="#">First</a></li>
    <li class="page-item">
        <a class="page-link" id="previous-page" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>`;
    for (let i = start; i <= end; i++) {
        pageListHTML += `<li class="page-item"><a class="page-link page-numbers" id="p-${i}" href="#">${i}</a></li>`;
    }
    pageListHTML +=
    `<li class="page-item">
        <a class="page-link" href="#" id="next-page" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
    <li class="page-item"><a class="page-link" id="last-page" href="#">Last</a></li>`;

    ulElement.innerHTML += pageListHTML;

    if (isSearch) {
        document.getElementById("current-page").innerHTML = searchResultsCurrPage;
        document.getElementById("total-pages").innerHTML = totalResultPages;
    } else {
        document.getElementById("current-page").innerHTML = currentPage;
        document.getElementById("total-pages").innerHTML = totalPages;
    }

    // make first page active
    document.querySelector(".page-numbers").parentNode.classList.add("active");

    addEventListenersToPages(isSearch);
}
