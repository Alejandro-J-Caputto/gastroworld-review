import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id
    };

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.img = res.data.recipe.image_url;
            this.author = res.data.recipe.publisher;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            console.log(error);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    };

    calcServings() {
        this.servings = 4;
    };

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']
        const newIngredients = this.ingredients.map(el => {

            // 1) Uniform Units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unitLong, i) => {
                ingredient = ingredient.replace(unitLong, unitsShort[i]);
            });



            // 2) Remove parentesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');


            // 3) Parse ingredients into count, unit and ingredient

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(indiceUnit => units.includes(indiceUnit));
            let objIng;
            if (unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex)
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'))
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

                //there is a unit
            } else if (parseInt(arrIng[0], 10)) {
                // there is no unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                //There is not unit and no number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }

            }



            return objIng;


        });

        this.ingredients = newIngredients
    }
    updateServings(type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;


        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= newServings / this.servings

        })

        this.servings = newServings
    };
}