import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';

if (existsSync('.env')) {
  loadEnvFile('.env');
}

const apiKey = process.env.API_KEY;

if (!apiKey) {
  throw new Error(
    'API_KEY is missing. Copy .env.example to .env and add your Last.fm API key.',
  );
}

export default {
  '/api/lastfm': {
    target: 'https://ws.audioscrobbler.com',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => {
      const url = new URL(path, 'http://localhost');

      url.pathname = '/2.0/';
      url.searchParams.set('api_key', apiKey);
      url.searchParams.set('format', 'json');

      return `${url.pathname}?${url.searchParams.toString()}`;
    },
  },
};
