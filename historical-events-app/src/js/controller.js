import * as model from "./model";
import eventListView from "./views/eventListView";
import eventPageView from "./views/eventPageView";

const controlEventPreview = async function (query) {
  try {
    await model.searchHistoricalEvents(query);
    console.log(model.historicalEvents.result);
    eventListView.clear();
    eventListView.render(model.historicalEvents);

    eventListView.addClickHandler(
      eventPageView.renderArticle,
      model.historicalEvents.result
    );
    //console.log(eventListView._eventArticlePreview);
  } catch (error) {
    console.log(error);
  }
};

const controlToggleEvent = function () {
  eventPageView.hideEventDetails();
};

const init = function () {
  eventListView.addSearchHandler(controlEventPreview);
  eventPageView.addReturnButton(controlToggleEvent);
};
init();
