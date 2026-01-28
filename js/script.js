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

const getRawEvents = async function (query) {
  //const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=10&format=json&origin=*`;
  try {
    const events = await getJSON(searchURL(query));
    return events;
  } catch (error) {
    console.log(error);
  }
};

const getFilteredEvents = async function (year, keywords) {
  const query = `${year} ${keywords}`;
  try {
    const rawEvents = await getRawEvents(query);

    const events = await rawEvents.query.search.map(async (ev) => {
      const page = await getJSON(searchDetailsURL(ev.pageid));
      return Object.values(page.query.pages)[0];
    });

    const filteredEvents = await Promise.all(events);
    console.log(filteredEvents);
  } catch (error) {
    console.log(error);
  }
};

getFilteredEvents(1989, "treaty");

// const loadEvents = async function () {
//   const events = await getFilteredEvents(getRawEvents(1989, "treaty"));
//   console.log(events);
// };

// loadEvents();

/* const getJSON = async function (url) {
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

    return data;
  } catch (error) {
    console.log(error);
  }
};

const loadFilteredEvents = async function () {
  const events = await loadEventsSearch(1989, "treaty");
  events.query.search.map((ev) => {

  });
};

loadFilteredEvents(); */
