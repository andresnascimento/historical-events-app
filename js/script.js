const searchURL = (query) =>
  `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=100&format=json&origin=*`;

const searchDetailsURL = (pageId) => {
  return (
    `https://en.wikipedia.org/w/api.php` +
    `?action=query` +
    `&prop=extracts|info|pageimages` +
    `&pageids=${pageId}` +
    `&exintro=true` +
    `&explaintext=true` +
    `&inprop=url` +
    `&piprop=thumbnail` +
    `&pithumbsize=600` +
    `&format=json` +
    `&origin=*`
  );
};

const historicalEvents = {
  result: [],
};

const DECISION_KEYWORDS = [
  "treaty",
  "law",
  "agreement",
  "pact",
  "act",
  "policy",
  "accord",
  "constitution",
  "reform",
  "health",
  "climate",
];

const filterEvents = function (rawEventsArr, year) {
  return rawEventsArr.filter((item) => {
    const title = item.title.toLowerCase();
    const snippet = item.snippet.toLowerCase();
    // filter by keywords
    const hasKeywords = DECISION_KEYWORDS.some(
      (keyword) =>
        (title.includes(keyword) || snippet.includes(keyword)) &&
        snippet.includes(year),
    );
    // filter by word count
    const hasEnoughContent = item.wordcount > 500;
    return hasKeywords && hasEnoughContent;
  });
};

/* const scoreEvents = function (item) {
  let score = 0;
  const title = item.title.toLowerCase();
  const snippet = item.snippet.toLowerCase();
  // add a score for each item passed
  DECISION_KEYWORDS.forEach((keyword) => {
    if (title.includes(keyword)) score += 3;
    if (snippet.includes(keyword)) score += 1;
  });

  if (item.wordcount > 1000) score += 1;

  return score;
}; */

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(`${response.status}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const searchHistoricalEvents = async function (year) {
  const query = `${year} treaty OR law OR agreement OR pact OR climate`;

  try {
    // first fetch using year + keywords
    const rawEvents = await getJSON(searchURL(query));
    console.log(rawEvents);

    // filter most relevant events
    const filteredEvents = filterEvents(rawEvents.query.search, year);

    // Second fetch with only relevant events id
    const filteredEventSearch = await filteredEvents.map(async (ev) => {
      const data = await getJSON(searchDetailsURL(ev.pageid));
      const eventObj = Object.values(data.query.pages)[0];
      return {
        id: eventObj.pageid,
        url: eventObj.fullurl,
        description: eventObj.extract,
        title: eventObj.title,
        language: eventObj.pagelanguage,
        thumbnail: eventObj.thumbnail,
      };
    });

    // wait for all the fetches and store the result on the historicalEvents object
    historicalEvents.result = await Promise.all(filteredEventSearch);

    console.log(historicalEvents);
  } catch (error) {
    console.log(error);
  }
};

searchHistoricalEvents(2020);
