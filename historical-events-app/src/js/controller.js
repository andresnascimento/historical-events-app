import * as model from "./model";
import eventListView from "./views/eventListView";
import eventPageView from "./views/eventPageView";

const controlEventPreview = async function () {
  try {
    //get the inputed year
    const year = eventListView.getInputedDate();
    // fetch data
    await model.searchHistoricalEvents(year);
    console.log(model.historicalEvents.result);

    // remove loading
    eventListView.clear();

    // render event list
    eventListView.render(model.historicalEvents);

    // add listeners to the event list
    eventListView.addClickHandler(model.historicalEvents.result);
  } catch (error) {
    console.log(error);
  }
};

const controlToggleEvent = function () {
  eventPageView.hideEventDetails();
};

const init = function () {
  eventListView.addSearchHandler(controlEventPreview);
  eventListView.dataInputFocus();
  eventPageView.addReturnButton(controlToggleEvent);
};
init();
