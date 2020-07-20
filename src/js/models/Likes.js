export default class Likes {
    constructor() {
        this.likes = []


    };

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };

        this.likes.push(like)
        // Persist data in the localStorage

        this.persistData();
        return like
    };


    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index, 1);
        this.persistData();

    };

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1
    }

    getNumLikes() {

        return this.likes.length;
    }

    //persistData
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    renderDataStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }

};