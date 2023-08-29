# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.
 
[Source](https://pokemon.fandom.com/wiki/Pokedex)
 
Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card
     
- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.


- Given more time, what would you suggest for improving the performance of this app?

The main suggestion I would make to improve the performance of this app would be to remove the call to retrieve the list of Pokemon from the `onChange` handler of the search input, and instead make that call only once, when the app is first loaded. I would then cache the results of that call, either in memory, or in something more persistent, like local storage (since the original 151 Pokemon will never change). By making the request only once, we can avoid making a request on every keystroke, and remove the delay between when the user enters a new search query, and when the results are displayed.


- Is there anything you would consider doing if we were to go live with this app?

There are several things I would consider doing with this app if it were to go live in a production environment.

1. **Add linting and formatting**. This would help to improve the readability and maintainability of the codebase over time. I would also add a pre-commit hook to run the linter and formatter before committing code to the repo.
2. **Add testing (unit, integration, component, and e2e)**. This would help to ensure that the codebase is stable and that new changes don't break existing functionality. I would also add a pre-push hook to run the tests before pushing code to the repo.
3. **Docker-ize the app**. This would help to ensure that the app can be run in any environment, and would also help to ensure that the app is running in the same environment in production as it is in development.
4. **Add CI/CD**. Using something like Github Actions, I would add a CI/CD pipeline to the repo to ensure that the app is built and tested before any merges are allowed or being deployed to production.
5. **Styling**. Pokemon has a very unique style to everything they do, so I would want to update the styling of the application to match that familiar branding.
6. **Add observability**. At the bare minimum, I would want to include some kind of logging service to log errors and other events that occur in the app. I would also want to add some kind of monitoring service to monitor the health of the app and alert us if something goes wrong. (*This would depend on the investment we intend on making into this app and how much we anticipate it scaling.*)


- What was the most challenging aspect of this work for you (if at all)?

There was a little bit of a gotcha in the retrieving of the evolution chains from the API that took me a second to figure out. From the parameter name, I made the mistake of assuming it took the Pokemon ID. But when that didn't work, I looked over the Pokemon API docs and found that there's a different ID for each evolution chain that needed to be used instead. Once I figured that out, I added the extra call needed to retrieve that ID, and from there I was good to go.
