import lottie from "lottie-web";

export default class View {
  _data;
  _animationContainer;

  initSearchingAnimation() {
    this._animationContainer = document.querySelector("#lottie");

    if (!this._animationContainer) return;

    this.searchingAnimation = lottie.loadAnimation({
      container: this._animationContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/searching.json",
    });
  }

  render(data) {
    if (data.length === 0) return;

    this.clear();
    data.result.forEach((element) => {
      this._data = element;
      const markup = this._generateMarkup();
      this._eventListHeader.classList.remove("hidden");
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    });
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  renderLoading(year) {
    const markup = `
        <li class="search__loading">
            <div id="lottie" style="width: 100%; height: 250px"></div>
            <h2>Dusting off old records from ${year}…</h2>
        </li> 
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this.initSearchingAnimation();
  }

  formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  removeClass(elArr, className) {
    elArr.forEach((el) => el.classList.remove(className));
  }
  addClass(elArr, className) {
    elArr.forEach((el) => el.classList.add(className));
  }
}
