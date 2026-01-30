import View from "./view";

class EventPageView extends View {
  _sectionSearch = document.querySelector(".section__search");
  _eventArticleDetails = document.querySelector(".event-details");

  renderArticle = (data, id) => {
    this._eventArticleDetails.innerHTML = "";
    const selectedArticle = data.filter((article) => {
      if (article.id === id) return article;
    });

    const markup = this._generateArticleMarkup(selectedArticle[0]);
    this._eventArticleDetails.insertAdjacentHTML("afterbegin", markup);
    this._toogleVisibility();
  };

  _toogleVisibility = () => {
    this._sectionSearch.classList.add("hidden");
    this._eventArticleDetails.classList.remove("hidden");
  };
  _generateArticleMarkup(data) {
    return `
        <article
            id="event-1992-01-20"
            tabindex="-1"
            aria-labelledby="event-title"
        >
            <header>
                <button type="button">Go back</button>
                <time datetime="1992-01-20"> Ano selecionado </time>
                
            </header>
            <figure>
              <img src="${data.thumbnail.source}" />
            </figure>
            <div>
                <h2 id="event-title">${data.title}</h2>
                <p>
                    ${data.description}
                </p>
            </div>
        </article>
    `;
  }
}

export default new EventPageView();
