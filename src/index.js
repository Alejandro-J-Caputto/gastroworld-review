import './styles.css';

/* GLOBAL STATE
Search Object
Current recipe 
shopping list
liked recipes
 */

import Search from './js/models/Search';

const state = {};

const controlSearch = async () => {
    // 1. Get the query from view

    const query = 'pizza';
    // 2. 
    if (query) {
        state.search = new Search(query)
        //3. Prepare UI for results

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render Results on UI
        console.log(state.search.result);
    }

};
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
})


// const search = new Search('pizza');
// search.getResults()