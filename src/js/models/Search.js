import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query
    };

    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            const results = res.data.recipes
            console.log(results);

        } catch (error) {
            throw error
        };
    };

};