import View from "./view";
import eventPageView from "./eventPageView";

class EventListView extends View {
  _parentElement = document.querySelector(".section__search-result--container");
  _searchButton = document.querySelector(".section__search-btn");
  _dataInputValue = new Date(
    document.querySelector(".section__search-input").value
  ).getFullYear();

  _generateMarkup() {
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
                        src="${this._data.thumbnail.source}"
                        alt="image description"
                    />
                </figure>
                <div class="event__preview-description">
                    <time
                        datetime="1992-01-20"
                        class="event__preview-description-title"
                    >
                        ${this._data.title}
                    </time>
                    <p>
                        ${this._data.description}
                    </p>
                </div>
            </button>
        </article>
    </li>
    
    `;
  }

  addClickHandler(handler, data) {
    [...this._parentElement.children].forEach((element) => {
      element.addEventListener("click", (e) => {
        const id = +e.target.closest("article").id;
        handler(data, id);
      });
    });
  }

  addSearchHandler(handler) {
    this._searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this._dataInputValue);
      console.log(this._dataInputValue);
    });
  }
}

export default new EventListView();
