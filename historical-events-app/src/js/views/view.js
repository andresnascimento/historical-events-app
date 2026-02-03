export default class View {
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

  removeClass(elArr, className) {
    elArr.forEach((el) => el.classList.remove(className));
  }
  addClass(elArr, className) {
    elArr.forEach((el) => el.classList.add(className));
  }
}
