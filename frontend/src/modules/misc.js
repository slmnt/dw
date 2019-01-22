import history from './history';
import queryString from 'query-string';

export function processRedirect() {
  const parsed = queryString.parse(history.location.search);
  if (parsed.redirect) history.push(parsed.redirect);
}
