export const API_KEY = "6tfNVzyLzZGfmEbE9s6T8imqnbkUAylZ";
export const getUrl = ({ q, page }) => `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=newest&api-key=${API_KEY}`;

// Ali6AtsGeFJP74mqOcxADqhoVC7StV5X