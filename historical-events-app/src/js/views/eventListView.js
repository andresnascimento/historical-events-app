import View from "./view";

class EventListView extends View {
  _searchButton = document.querySelector(".section__search-btn");
  _dataInput = document.querySelector("#birth-year");
  _dataInputValue = new Date(
    document.querySelector(".section__search-input").value
  ).getFullYear();

  _generateMarkup() {
    return `
    
    
    `;
  }

  addSearchHandler(handler, searchValue) {
    this._searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      handler(searchValue);
    });
  }
}

export default new EventListView();
