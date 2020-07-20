export const elementsSelectors = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesLists: document.querySelector('.likes__list')

};

export const elementsStrings = {
    loader: 'loader'
}

export const renderLoader = (parent) => {
    const loader = `
    <div class="${elementsStrings.loader}">
        <svg>
            <use href="../assets/img/icons.svg#icon-cw"></use>
        </svg>    
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader)
};


export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}