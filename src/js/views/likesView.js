import * as comun from '../common/selector-html';

export const toggleLikeButton = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'
    document.querySelector('.recipe__love use').setAttribute('href', `./assets/img/icons.svg#${iconString}`)
};

export const toggleLikeMenu = numLikes => {
    comun.elementsSelectors.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden'
};

export const renderLike = like => {

    const likeHtml = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>`
    comun.elementsSelectors.likesLists.insertAdjacentHTML('beforeend', likeHtml)
};

export const deleteLike = id => {
    console.log(id);
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    console.log(el);

    if (el) el.parentElement.removeChild(el);
}