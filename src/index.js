import './styles.css';
import * as comun from './js/common/selector-html';
import Search from './js/models/Search';
import Recipe from './js/models/Recipe';
import List from './js/models/list'
import Likes from './js/models/Likes'
import * as searchView from './js/views/searchView'
import * as recipeView from './js/views/recipeView'
import * as listView from './js/views/listView'
import * as likesView from './js/views/likesView'


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
            recipeView.renderRecipe(state.recipe,
                // state.likes.isLiked(id)
            )



        } catch (error) {
            console.warn('Error processing recipe' + error);
        }

    }
}






////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROLADOR LISTA COMPRA
////////////////////////////////////////////////////////////////////////////////////////////////
comun.elementsSelectors.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    console.log(id);

    // Handle the delete item

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        console.log('patataa');
        state.list.deleteItem(id);

        listView.deleteItem(id)
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val)
    }

})




const controlList = () => {
    console.log(state.recipe.ingredients);

    //Create a new list IF there is none yet
    if (!state.list) state.list = new List();

    //Add ingredient to the list

    state.recipe.ingredients.forEach(el => {

        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
};





////////////////////////////////////////////////////////////////////////////////////////////////
//CONTROLADOR LIKE
////////////////////////////////////////////////////////////////////////////////////////////////

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;
    //user has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        )

        //toggle the like button

        likesView.toggleLikeButton(true)

        // add like to the ui
        likesView.renderLike(newLike)
        console.log(state.likes);
        // User has liked the current recipe

    } else {
        console.log(currentID);
        // remove like to the state
        state.likes.deleteLike(currentID);
        console.log(state.likes);
        //remove the like button
        likesView.toggleLikeButton(false)
        // remove like to the ui
        likesView.deleteLike(currentID)

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes())

};






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
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {

        //Like controller
        controlLike()
    }

})

//RESTORE LIKED RECIPES ON PAGE LOAD

window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.renderDataStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => likesView.renderLike(like))


})

//window.l = new List()