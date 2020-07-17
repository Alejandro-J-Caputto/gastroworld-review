import {
    elementsSelectors
} from "../common/selector-html";

export const getInput = () => elementsSelectors.searchInput.value;
////////////////////////////////////////////////////////////////
// ACORTADOR DE TEXTO
const limitRecipeTitle = (title, limit = 17) => {
    const newShortTitle = [];
    //MANERA TUTORIAL
    // if (title.length > limit) {
    //     title.split(' ').reduce((acc, curr) => {
    //         if (acc + curr.length <= limit) {
    //             newShortTitle.push(curr);
    //         }
    //         return acc + curr.length;
    //     }, 0);
    //     return `${newShortTitle.join(' ')} ...`

    // }

    // console.log(acc + newShortTitle.length);

    // console.warn({
    //     array: newShortTitle.length,
    //     contador: acc
    // });
    // MANERA CASERA Y DOLOROSA
    let acc = 0;
    if (title.length > limit) {
        title.split(' ').forEach(palabra => {
            if (acc + palabra.length < limit) {
                newShortTitle.push(palabra);
            }
            return acc = newShortTitle.join(' ').length
        })
        return `${newShortTitle.join(' ')} ...`
    }
    return title;
}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//Limpiador de campos

export const clearInput = () => {
    elementsSelectors.searchInput.value = '';
};
// Limpiador de busqueda
export const clearSearchView = () => {
    elementsSelectors.searchResultList.innerHTML = '';
    elementsSelectors.searchResPages.innerHTML = '';
}

////////////////////////////////////////////////////////////////

// Renderiza la receta

const renderRecipe = recipe => {
    const htmlMarkUp = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`
    // coloca cada elemento traido de la api uno bajo el otro
    elementsSelectors.searchResultList.insertAdjacentHTML('beforeend', htmlMarkUp);
}

const createButton = (page, type) => {
    return `
    <button class="btn-inline results__btn--${type}" data-goTo = ${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="./assets/img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    </button>
`
};
let button;
const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage)

    if (page === 1 && pages > 1) {
        //Button go to next page
        button = createButton(page, 'next')
    } else if (page < pages) {
        button = `${createButton(page, 'prev') }
                  ${createButton(page, 'next')}
                  `
    } else if (page === pages && pages > 1) {
        // Only button go to prev pages
        button = createButton(page, 'prev')
    }
    elementsSelectors.searchResPages.insertAdjacentHTML('afterbegin', button)
};


// ESTA FUNCION COGE CADA UNA DE LAS RECETAS
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //RENDER RESULT OF CURRENT PAGE

    const start = (page - 1) * resPerPage;

    const end = page * resPerPage


    recipes.slice(start, end).forEach(el => {
        return renderRecipe(el)
    });
    // RENDER PAGINATION BUTTONS

    renderButtons(page, recipes.length, resPerPage);
}


export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => el.classList.remove('results__link--active'))
    document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}