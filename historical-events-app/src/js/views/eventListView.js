import View from "./view";
import eventPageView from "./eventPageView";
import placeholderThumbnail from "../../img/thumbnail-placeholder.png";

class EventListView extends View {
  _parentElement = document.querySelector(".section__search-result--container");
  _searchButton = document.querySelector(".section__search-btn");
  _eventListHeader = document.querySelector(".section__search-result-header");
  _eventListTitle = document.querySelector(".section__search-result-title");
  _dateInputValue = document.querySelector("#year");

  _generateMarkup() {
    const description = this._createDescription(this._data.description);
    return `
    <li >
        <article id='${this._data.id}'>
            <button
                type="button"
                aria-haspopup="grid"
                aria-controls="event-1992-01-20"
                class="event__preview-container"
            >
                <figure class="event__preview-image">
                    <img
                        src="${
                          this._data.thumbnail
                            ? this._data.thumbnail.source
                            : placeholderThumbnail
                        }"
                        alt="image description"
                    />
                </figure>
                <div class="event__preview-description">
                    <h3
                        datetime="1992-01-20"
                        class="event__preview-description-title"
                    >
                        ${this._data.title}
                    </h3>
                    <p>
                        ${description}
                    </p>
                </div>
            </button>
        </article>
    </li>
    
    `;
  }

  getInputedDate() {
    return this._dateInputValue.value;
    //const year = this._dateInputValue.value.split("-")[0];
  }

  dataInputFocus() {
    this._dateInputValue.focus();
  }

  checkInputValue() {
    this._dateInputValue.addEventListener("input", () => {
      const year = Number(this._dateInputValue.value);

      const isValid = Number.isInteger(year) && year >= 1800 && year <= 2026;

      this._searchButton.disabled = !isValid;
    });
  }

  _createDescription(htmlString) {
    // it cleans the fetched article description to show in the event list preview
    const container = document.createElement("div");
    container.innerHTML = htmlString;

    // select all <p>
    const paragraphs = [...container.querySelectorAll("p")];

    const firstValidParagraph = paragraphs.find(
      (p) => p.textContent.trim() !== ""
    );

    return firstValidParagraph ? firstValidParagraph.innerHTML : "";
  }

  addClickHandler(data) {
    [...this._parentElement.children].forEach((element) => {
      element.addEventListener("click", (e) => {
        // get the clicked element id
        const id = +e.target.closest("article").id;
        // filter the results array by id
        const selectedArticle = data.filter((article) => {
          if (article.id === id) return article;
        });
        // render the pageview with the filtered data
        eventPageView.renderArticle(selectedArticle[0]);
      });
    });
  }

  addSearchHandler(handler) {
    this._searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
      this._eventListTitle.innerHTML = this.getInputedDate();
      this._dateInputValue.value = "";
      //this._dateInputValue.valueAsDate = null;
    });
  }
}

export default new EventListView();
