export default class View {
  //   _eventArticlePreview = document.querySelectorAll(".event__preview-container");
  //   _sectionSearch = document.querySelector(".section__search");
  _data;

  render(data) {
    if (data.length === 0) return console.log("erro");

    data.result.forEach((element) => {
      this._data = element;
      const markup = this._generateMarkup();
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    });
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
}
