# The interview task

## HashRouter
Since GitHub Pages does not support browser history, I was employing a HashRouter. Existing path does not assist GitHub Pages in determining where to direct the user (since it is a frontend route).

## The Task
Imagine you've been hired to write an app that will allow people to perform searches to know the distance of a route that may consist of 2 or more cities, to enable them to plan their travel.

Imagine that the backend API can NOT return you the full list of cities, and you’ll need to search the cities with a keyword.

The app should consist of two pages: the search form (home page) and the search results.

On the home page there should be a search form. The form should consist of the following fields:

City of origin. Required to fill. A searchable dropdown (combobox) with a list of cities. The list of cities should be requested and searched asynchronously with the loading indication.

Intermediate cities. Same as City of origin. There should be a way to add/remove multiple intermediate cities. No intermediate cities should be shown when the page is first loaded. If an intermediate city is added it has to be filled.

City of destination. Required to fill. Same as City of origin.

Date of the trip. Required to fill. Should be a date in the future.

Number of passengers. Required to fill. Should be a number greater than 0.

The form should be validated. If some field has an invalid value the error should be shown around the problematic field and the submit button should be disabled. The submit button when clicked should navigate to the search results page.

The home page should allow deep-linking: form data should store in the URL, so when a user copy and share the link, the form can be pre-filled with the data from the URL parameters.

On the search results page all the fields filled on the home page should be displayed. The distance of the route (in kilometers) should be calculated and displayed: between subsequent cities of the route and the total distance. The distance calculation should be performed asynchronously with loading indication and error handling.

The search results page should take all parameters from the URL, meaning that the link to a particular search result can be shared with others.

## Technical Requirements
The application should be implemented as a SPA (single page application) using React and TypeScript.

To implement a cities database hardcode the list of cities and simulate the delay of requesting the cities. You can find an example list of cities in the Appendix A. The fake backend should have two endpoints (functions). The first endpoint receives a keyword and returns a list of cities that match the keyword. The second endpoint receives a list of cities and calculates the distances.

When a user attempts to find cities using the phrase “fail” (case-insensitive) the mocked API should fail to return results to demonstrate the error handling abilities of the UI.

To implement the distance calculation use Haversine distance formula and simulate the delay of the calculation. When “Dijon” city is involved the distance calculation should fail to demonstrate the error handling abilities of the UI.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.