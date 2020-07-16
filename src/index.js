import './styles.css';
import * as comun from './js/common/selector-html';
import * as searchView from './js/views/searchView'
import Search from './js/models/Search';

/* GLOBAL STATE
Search Object
Current recipe 
shopping list
liked recipes
 */


const state = {};

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
        await state.search.getResults()

        const resp = state.search.result

        console.log(resp);
        // 5. Render Results on UI
        searchView.renderResults(resp);
        comun.clearLoader()




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