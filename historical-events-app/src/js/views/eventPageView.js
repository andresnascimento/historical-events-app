import eventListView from "./eventListView";
import View from "./view";
import placeholderImg from "../../img/image-placeholder.png";

class EventPageView extends View {
  _sectionSearch = document.querySelector(".section__search");
  _eventArticleDetails = document.querySelector(".event-details");
  _eventList = document.querySelector(".events-list");
  _returnButton = document.querySelector(".btn-return");

  renderArticle = (selectedArticle) => {
    this._eventArticleDetails.innerHTML = "";

    const markup = this._generateArticleMarkup(selectedArticle);
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
  }

  addReturnButton(handler) {
    this._returnButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
      eventListView.dataInputFocus();
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
              <img src="${
                data.thumbnail ? data.thumbnail.source : placeholderImg
              }" />
            </figure>
            <div>
                <h1 id="event-title">${data.title}</h1>
                <p>Updated · ${this.formatDate(data.updated)}</p>
                <p>
                    ${data.description}
                </p>
                <a 
                href="${data.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="event-details-link"
                >
                    Dive deeper into this moment on Wikipedia 
                    <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
                    <span class="sr-only">(opens in a new tab)</span>
                </a>
            </div>
        </article>
    `;
  }
}

export default new EventPageView();
