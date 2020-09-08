import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping List object
- Linked recipes
 */
const state = {};

/* 
    SEARCH CONTROLLER 
*/
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

        try {
            //Search for recepies
            await state.search.getResults();

            //Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);            
        } catch (error) {
            console.log('Something wrong with the search.');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});


elements.searchResultsPages.addEventListener('click', e => {
    const button = e.target.closest('.btn-inline');
    if (button) {
        const goToPage = parseInt(button.dataset.goto);
        searchView.clearSearchResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/* 
    RECIPE CONTROLLER 
*/
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        // Create new recipe object
        state.recipe = new Recipe(id);
        
        try {
            // Get Recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            console.log(error);
            console.log('Something went while with processing the recipe!');
        }

        
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// Same as above
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));