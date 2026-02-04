import { getJSON } from "./helper";
import { searchURL, searchDetailsURL, DECISION_KEYWORDS } from "./config";

export const historicalEvents = {
  result: [],
};

const filterEvents = function (rawEventsArr, year) {
  return rawEventsArr.filter((item) => {
    const title = item.title.toLowerCase();
    const snippet = item.snippet.toLowerCase();
    // filter by keywords
    const hasKeywords = DECISION_KEYWORDS.some(
      (keyword) =>
        (title.includes(keyword) || snippet.includes(keyword)) &&
        snippet.includes(year)
    );
    // filter by word count
    const hasEnoughContent = item.wordcount > 500;
    return hasKeywords && hasEnoughContent;
  });
};

const fetchEventDetails = async function (pageId) {
  const data = await getJSON(searchDetailsURL(pageId));
  const eventObj = Object.values(data.query.pages)[0];

  return {
    id: eventObj.pageid,
    url: eventObj.canonicalurl,
    description: eventObj.extract,
    title: eventObj.title,
    language: eventObj.pagelanguage,
    thumbnail: eventObj.thumbnail,
    categories: eventObj.categories,
    updated: eventObj.touched,
  };
};

export const searchHistoricalEvents = async function (year, onEventLoaded) {
  const query = `${year} treaty OR law OR agreement OR pact OR climate`;

  try {
    if (!year) return;

    // First fetch
    const rawEvents = await getJSON(searchURL(query));

    const filteredEvents = filterEvents(rawEvents.query.search, year);

    historicalEvents.result = [];

    // Progressive fetch - fetch trhough first results
    for (const ev of filteredEvents) {
      const event = await fetchEventDetails(ev.pageid);

      historicalEvents.result.push(event);

      // tells the view there are more
      if (onEventLoaded) onEventLoaded(event);
    }
  } catch (error) {
    console.log(error);
  }
};

// export const searchHistoricalEvents = async function (year) {
//   const query = `${year} treaty OR law OR agreement OR pact OR climate`;

//   try {
//     if (!year) return;
//     // first fetch using year + keywords
//     const rawEvents = await getJSON(searchURL(query));
//     //console.log(rawEvents);

//     // filter most relevant events
//     const filteredEvents = filterEvents(rawEvents.query.search, year);

//     // Second fetch with only relevant events id
//     const filteredEventSearch = await filteredEvents.map(async (ev) => {
//       const data = await getJSON(searchDetailsURL(ev.pageid));
//       const eventObj = Object.values(data.query.pages)[0];
//       return {
//         id: eventObj.pageid,
//         url: eventObj.canonicalurl,
//         description: eventObj.extract,
//         title: eventObj.title,
//         language: eventObj.pagelanguage,
//         thumbnail: eventObj.thumbnail,
//         categories: eventObj.categories,
//         updated: eventObj.touched,
//       };
//     });

//     // wait for all the fetches and store the result on the historicalEvents object
//     historicalEvents.result = await Promise.all(filteredEventSearch);

//     //console.log(historicalEvents);
//   } catch (error) {
//     console.log(error);
//   }
// };
