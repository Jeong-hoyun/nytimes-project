export const API_KEY = "Ali6AtsGeFJP74mqOcxADqhoVC7StV5X";
export const getUrl = ({ q, page }) => `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=newest&api-key=${API_KEY}`;

