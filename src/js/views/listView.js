import * as comun from "../common/selector-html";
export const renderItem = item => {
    console.log(item);
    console.log('hola');
    const markup = `
    
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="./assets/img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    comun.elementsSelectors.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    console.log(item);
    if (item) {
        item.parentElement.removeChild(item);
    }

};