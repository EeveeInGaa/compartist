# Compartist

## Usage

The Last.fm API key is read exclusively by a server-side Netlify Function and is
never included in the Angular bundle.

### Local development

Copy `.env.example` to `.env`, add your Last.fm key and start Angular normally:

```bash
cp .env.example .env
npm start
```

Angular's development proxy adds the key server-side when forwarding `/api/lastfm`
to Last.fm. The key is not included in the browser bundle. Never commit `.env`.

### Netlify deployment

Add an `API_KEY` environment variable in Netlify, enable the Functions scope and
redeploy the site. The deployed app uses the server-side Netlify Function
automatically; linking the Netlify CLI locally is not required.

## What I did

### Planning and setup

1. plan how the app should look like, what routes are needed and collect requirements
2. setup app with prettier and eslint to have less pain with formatting and linting
3. add basic component structure and styles to normalize everything (especially spacing; other style resets and styles come later)
4. setup routes (at this point without the artist detail route, since I want to focus on the list first)

> Normally I work with branches, but since this is a quite small app and I'm not working with anyone on it, I work on main. This reduces redundancy since I would just merge it once it's a Pull Request.

### Implementation of requirements

1. create typed API interfaces and keep the Last.fm key server-side behind a Netlify Function
2. actually get data form the api over the service
3. add basic styling for list items to have a better overview over the data (that they are not clustered together)
4. finalize the (dumb/isolated) select component (with interface and enum in the parent for type safety; adding and reading them to the url queryParams could be added)
5. add search functionality (a bid back and forth until it was working well)
6. add translation (transloco is a good mix of simplicity and type safety)
7. add styling (also for dark mode if system is in dark mode)
8. refinements, refactorings and bug fixings (I commented some things in the code, I'm aware that some things are not best practice, but in terms of time and size of the project I considered them fine)
9. add test for select component (unfortunately this test is performed with Karma which I have not really worked with yet (we use Jest), and I ran in some problems executing it, but tried to adapt as good as possible)
10. add readme to explain what and why I have done (or not done)
11. optimize logic and deployment to meet modern standards

## What I have focused on

- Responsive Design (normally I start mobile first, but since my main focus here was to first have the functionality ready, I started with my normal viewport/desktop first)
- Type Safety (with enums, interfaces and typescript strict mode)
- Clear Data Usage (performant calls over the service, not adding too much cache by unsubscribing)
- Good Architecture (folders for components, pages, services, etc.)

> I'm aware that the app is not perfectly accessible (missing outlines for list items etc.) because I was focusing on the requirements, but I know that it's important in general and especially next year needed by law.
