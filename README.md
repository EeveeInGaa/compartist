# Compartist

## Usage
You can run it by pulling it and run `ng serve`
> you would also need to add the API key to `environment.development.ts` I will provide, since I don't want it to lie around openly. <br>
> I know it's not the best way but dotenv seemed a bid too much.

## What I did
### Planning and setup
1. plan how the app should look like, what routes are needed and collect requirements 
2. setup app with prettier and eslint to have less pain with formatting and linting
3. add basic component structure and styles to normalize everything (especially spacing; other style resets and styles come later)
4. setup routes (at this point without the artist detail route, since I want to focus on the list first)

> Normally I work with branches, but since this is a quite small app and I'm not working with anyone on it, I work on main. This reduces redundancy since I would just merge it once it's a Pull Request. 

### Implementation of requirements
1. create interfaces in preparation for the service (at this point I was thinking if I use a dotenv file (which I already added before) to not reveal my api key, but I thought for this task it would be more efficient to just put it in the environment file and skip the pain of setting up the dotenv)
2. actually get data form the api over the service 
3. add basic styling for list items to have a better overview over the data (that they are not clustered together) 
4. finalize the (dumb/isolated) select component (with interface and enum in the parent for type safety; adding and reading them to the url queryParams could be added)
5. add search functionality (a bid back and forth until it was working well)
6. add translation (transloco seemed to be the easier option for this project than i18next)
7. add styling (also for dark mode if system is in dark mode)
8. refinements, refactorings and bug fixings (I commented some things in the code, I'm aware that some things are not best practice, but in terms of time and size of the project I considered them fine)
9. add test for select component (unfortuntly this test is performed with Karma which I have not really worked with yet (we use Jest), and I ran in some problems executing it, but tried to adapt as good as possible)
10. add readme to explain what and why I have done (or not done)

## What I have focused on
- Responsive Design (normally I start mobile first, but since my main focus here was to first have the functionality ready, I started with my normal viewport/desktop first)
- Type Safety (with enums, interfaces and typescript strict mode)
- Clear Data Usage (performant calls over the service, not adding too much cache by unsubscribing)
- Good Architecture (folders for components, pages, services, etc.)

> I'm aware that the app is not perfectly accessible (missing outlines for list items etc.) because I was focusing on the requirements, but I know that it's important in general and especially next year needed by law.
