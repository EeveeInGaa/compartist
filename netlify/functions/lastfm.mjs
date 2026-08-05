const LASTFM_API_URL = 'https://ws.audioscrobbler.com/2.0/';

const allowedMethods = new Map([
  ['geo.gettopartists', 'country'],
  ['artist.getinfo', 'artist'],
  ['artist.search', 'artist'],
]);

function jsonError(message, status) {
  return Response.json({ error: message }, { status });
}

export default async function handler(request) {
  if (request.method !== 'GET') {
    return jsonError('Method not allowed.', 405);
  }

  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error('The API_KEY environment variable is not configured.');
    return jsonError('The music service is currently unavailable.', 500);
  }

  const requestUrl = new URL(request.url);
  const method = requestUrl.searchParams.get('method');
  const parameterName = allowedMethods.get(method);

  if (!parameterName) {
    return jsonError('Unsupported Last.fm method.', 400);
  }

  const parameterValue = requestUrl.searchParams.get(parameterName)?.trim();

  if (!parameterValue || parameterValue.length > 200) {
    return jsonError(`A valid ${parameterName} parameter is required.`, 400);
  }

  const lastFmUrl = new URL(LASTFM_API_URL);
  lastFmUrl.searchParams.set('method', method);
  lastFmUrl.searchParams.set(parameterName, parameterValue);
  lastFmUrl.searchParams.set('api_key', apiKey);
  lastFmUrl.searchParams.set('format', 'json');

  try {
    const response = await fetch(lastFmUrl, { signal: request.signal });
    const data = await response.json();
    const isSuccessful = response.ok && !data.error;

    return Response.json(data, {
      status: isSuccessful ? 200 : response.ok ? 502 : response.status,
      headers: isSuccessful
        ? {
            'Cache-Control': 'public, max-age=60',
            'Netlify-CDN-Cache-Control':
              'public, s-maxage=300, stale-while-revalidate=600',
          }
        : undefined,
    });
  } catch (error) {
    console.error('Last.fm request failed.', error);
    return jsonError('The music service could not be reached.', 502);
  }
}

export const config = {
  path: '/api/lastfm',
  method: 'GET',
  rateLimit: {
    windowLimit: 60,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
};
