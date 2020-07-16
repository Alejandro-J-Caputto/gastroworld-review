import axios from 'axios';

export default class Search {

    constructor(query) {
        this.query = query
    };

    async getResults() {
        try {
            console.log('hola');
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes

            //console.log(results);


        } catch (error) {
            throw error
        };
    };


};