import './styles.css';
import * as comun from './js/common/selector-html';
import Recipe from './js/models/Recipe';
import * as searchView from './js/views/searchView'
import * as recipeView from './js/views/recipeView'
import Search from './js/models/Search';

/* GLOBAL STATE
Search Object
Current recipe 
shopping list
liked recipes
 */


const state = {};
////////////////////////////////////////////////////////
//////// SEARCH CONTROLLER
const controlSearch = async () => {
    // 1. Get the query from view

    const query = searchView.getInput();
    console.log(query);
    // 2. 
    if (query) {

        state.search = new Search(query)
        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearSearchView();
        comun.renderLoader(comun.elementsSelectors.searchRes)
        // 4. Search for recipes
        try {
            await state.search.getResults()

            const resp = state.search.result

            // 5. Render Results on UI
            searchView.renderResults(resp);
            comun.clearLoader()

        } catch (error) {
            console.warn(error);
            comun.clearLoader()
        }




    }

};

comun.elementsSelectors.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
});

comun.elementsSelectors.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearSearchView();
        searchView.renderResults(state.search.result, goToPage)
    }
})


// const search = new Search('pizza');
// search.getResults()

////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// FIN DE SEARCH
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROLADOR RECETAS
////////////////////////////////////////////////////////////////////////////////////////////////

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        // Prepare UI for changes

        comun.renderLoader(comun.elementsSelectors.recipe)
        if (state.search) {

            searchView.highlightSelected(id)
        }
        //Create new Recipe Object
        state.recipe = new Recipe(id)
        recipeView.clearRecipeView()
        //Get Recipe Data
        try {
            await state.recipe.getRecipe()

            // Calculate Servings & time
            //Render the recipe
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();
            comun.clearLoader();

            console.log(state.recipe);
            recipeView.renderRecipe(state.recipe)



        } catch (error) {
            console.warn('Error processing recipe' + error);
        }

    }
}
////////////////////////////////////////////////////////////////////////
//CONVERTIR VARIOS EVENTOS EN UNO


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))



////////////////////////////////////////////////////////////////////////

comun.elementsSelectors.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec')
            recipeView.updateServingsIngredients(state.recipe)
        }

    }
    if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
    }
    console.log(state.recipe);
})