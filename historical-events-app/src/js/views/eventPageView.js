import View from "./view";

class EventPageView extends View {
  _sectionSearch = document.querySelector(".section__search");
  _eventArticleDetails = document.querySelector(".event-details");
  _eventList = document.querySelector(".events-list");
  _returnButton = document.querySelector(".btn-return");

  renderArticle = (data, id) => {
    this._eventArticleDetails.innerHTML = "";
    const selectedArticle = data.filter((article) => {
      if (article.id === id) return article;
    });

    const markup = this._generateArticleMarkup(selectedArticle[0]);
    this._eventArticleDetails.insertAdjacentHTML("afterbegin", markup);
    // add css classes to manipulate layout visibily
    this.showEventDetails();
  };

  showEventDetails() {
    this.removeClass([this._eventArticleDetails, this._returnButton], "hidden");
    this.addClass([this._sectionSearch], "hidden");
    this.addClass([this._eventList], "shrink-content");
  }

  hideEventDetails() {
    this.addClass([this._eventArticleDetails, this._returnButton], "hidden");
    this._sectionSearch.classList.remove("hidden");
    this._eventList.classList.remove("shrink-content");
    // this._eventArticleDetails.classList.add("hidden");
    // this._returnButton.classList.add("hidden");
  }

  addReturnButton(handler) {
    this._returnButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  _generateArticleMarkup(data) {
    return `
        <article
            id="${data.id}"
            tabindex="-1"
            aria-labelledby="${data.title}"
        >
            <figure>
              <img src="${data.thumbnail.source}" />
            </figure>
            <div>
                <h1 id="event-title">${data.title}</h1>
                <p>Last updated at: ${data.updated}</p>
                <p>
                    ${data.description}
                </p>
            </div>
        </article>
    `;
  }
}

export default new EventPageView();
