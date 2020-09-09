import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping List object
- Linked recipes
 */
const state = {};
window.s = state;

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
    LIKES CONTROLLER 
*/
//TESTING ONLY
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
    // Create a new list if there is none yet;
    if (!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;

    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        
        // Toggle like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);
    } else {
        // Remove like from  the state
        state.likes.deleteLike(currentID);
        
        // Toggle like button
        likesView.toggleLikeBtn(false);
        
        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}


/* 
    LIST CONTROLLER 
*/
const controlList = () => {
    // Create a new list if there is none yet;
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and to the view
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
}


/* 
    RECIPE CONTROLLER 
*/
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        //Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);    
        }

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
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (error) {
            console.log(error);
            console.log('Something went while with processing the recipe!');
        }

        
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
    
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
})


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease btn is clicked 
        if (state.recipe.servings > 1 ) {
            state.recipe.updateServings('dec');    
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')){
        // Increase btn is clicked 
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});


window.l = new List();