const numbEvents = 20;

export const searchURL = (query) =>
  `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    query
  )}&srlimit=${numbEvents}&format=json&origin=*`;

export const searchDetailsURL = (pageId) => {
  return (
    "https://en.wikipedia.org/w/api.php" +
    "?action=query" +
    "&prop=extracts|info|pageimages|categories" +
    `&pageids=${pageId}` +
    "&exintro=true" +
    "&inprop=url" +
    "&piprop=thumbnail" +
    "&pithumbsize=600" +
    "&cllimit=10" +
    "&format=json" +
    "&origin=*"
  );
};

export const DECISION_KEYWORDS = [
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
