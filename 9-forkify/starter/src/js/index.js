import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping List object
- Linked recipes
 */
const state = {};

const controlSearch = async () => {
    //Get query from view
    const query = searchView.getInput();

    if (query) {
        //New search object and add to state
        state.search = new Search(query);

        //Prepare UI for results
        searchView.clearInput();
        searchView.clearSearchResults();
        renderLoader(elements.searchResults);

        //Search for recepies
         await state.search.getResults();

        //Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
};

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});


