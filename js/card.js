function createCard(movie, modalNum) {
    let genreSpansHTML = "";
    let len = badgeClassArray.length;

    for (let i = 0; i < movie.genres.length; i++) {
        genreSpansHTML += `<span class="me-1 ${badgeClassArray[i % len]}">${movie.genres[i]}</span>`;
    }

    let colCardHTML = `<div class="col d-flex align-items-stretch">
                        <div class="card shadow-sm">
                            <a href="#" data-bs-target="#modal-${modalNum}" data-bs-toggle="modal">
                                <img class="card-img-top" src="${movie.posterPath}">
                            </a>
                            <div class="card-body">
                                <div class="float-end badge bg-primary">
                                    <p class="my-0 px-1 fs-4">${movie.rating}</p>
                                </div>
                                <a href="#" data-bs-toggle="modal" data-bs-target="#modal-${modalNum}">
                                    <h5 class="card-text movie-name">${movie.title}</h5>
                                </a>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="genre-tags mt-3">`
        + genreSpansHTML
        + `                     </div>
                                </div>
                                <div class="float-end py-1">
                                    <p class="card-text running-time fs-6 fst-italic bottom-0 end-0">${movie.runtime}</p>
                                </div>
                            </div>
                            <div class="modal fade" id="modal-${modalNum}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">${movie.title}</h5>
                                            <div class="float-end badge bg-primary">
                                                <p class="my-0 px-1 fs-4">${movie.rating}</p>
                                            </div>
                                        </div>
                                        <div class="modal-body">
                                            <div>
                                            <div class="certification">
                                            </div>
                                            <p class="release-date">${movie.releaseDate}</p>
                                            <p class="fw-bold running-time">${movie.runtime}</p>
                                            </div>
                                            <div class="mb-3 d-flex justify-content-between align-items-center">
                                                <div class="genre-tags">`
                + genreSpansHTML
                + `                             </div>
                                            </div>
                                            <h6>Certification: <span class="${badgeClassArray[0]}">${movie.certification}</span></h6>
                                            <div class="language"><h6>Language:</h6><p class="fw-light">${movie.originalLanguage}</p></div>
                                            <div class="overview"><h6>Overview:</h6><p class="fw-light">${movie.overview}</p></div>
                                            <div class="directors"><h6>Director(s):</h6><p class="fw-light">${movie.directors.join(", ")}</p></div>
                                            <div class="writers"><h6>Writer(s):</h6><p class="fw-light">${movie.writers.join(", ")}</p></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    parentNode.innerHTML += colCardHTML;
}
