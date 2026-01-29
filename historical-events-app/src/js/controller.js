import * as model from "./model";
import eventListView from "./views/eventListView";

const controlEventPreview = async function (query) {
  try {
    await model.searchHistoricalEvents(query);
    console.log(model.historicalEvents);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  eventListView.addSearchHandler(
    controlEventPreview,
    eventListView._dataInputValue
  );
};
init();
