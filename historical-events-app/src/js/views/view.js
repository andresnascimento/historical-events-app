export default class View {
  _data;
  render(data) {
    if (data.length === 0) return console.log("erro");

    this._data = data;
    console.log(this._data);
    this._clear();
    this._parentElement.innerHTML = "";
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
