/* async function fetchWikipediaSearch(year, term) {
  const query = `${year} ${term}`;

  const url =
    `https://en.wikipedia.org/w/api.php` +
    `?action=query` +
    `&list=search` +
    `&srsearch=${encodeURIComponent(query)}` +
    `&srlimit=10` +
    `&format=json` +
    `&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Wikipedia raw response:", data);
    console.log("Search results:", data.query.search);

    return data.query.search;
  } catch (error) {
    console.error("Error fetching Wikipedia:", error);
  }
} */

const searchURL = (query) =>
  `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=10&format=json&origin=*`;

const searchDetailsURL = (pageId) => {
  return (
    `https://en.wikipedia.org/w/api.php` +
    `?action=query` +
    `&prop=extracts|info` +
    `&pageids=${pageId}` +
    `&exintro=true` +
    `&explaintext=true` +
    `&inprop=url` +
    `&format=json` +
    `&origin=*`
  );
};

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

let eventsData;

const loadEventsSearch = async function (year, keywords) {
  const query = `${year} ${keywords}`;
  try {
    const data = await getJSON(searchURL(query));
    eventsData = data;
    console.log(eventsData.query.search);
  } catch (error) {
    console.log(error);
  }
};

loadEventsSearch(1989, "treaty");
