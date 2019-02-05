import history from './history';
import queryString from 'query-string';

export function processRedirect(a) {
  const parsed = queryString.parse(history.location.search);
  if (parsed.redirect) history.push(parsed.redirect);
  else if (a) history.push(a);
}
