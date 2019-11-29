
const cocktailId = localStorage.getItem('cocktail-id').slice(9);
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const cocktailContainer = document.querySelector('#cocktail-info-container');
const ingredientsList= document.querySelector('#ingredients-list');
const instructionsContainer = document.querySelector('#instructions-container');

const lookup = 'lookup.php';



const getCocktailById = (id) => {
    axios.get(baseUrl + lookup + '?i=' + id)
        .then ( responseFromAPI => {
            const {data} = responseFromAPI;
            const cocktail = data.drinks[0];
            const ingredients = [];
            let i = 1;
            console.log(cocktail);
            while (cocktail['strIngredient' + i] !== null) {
                ingredients.push(cocktail['strIngredient' + i]);
                i++;
            }
            cocktailContainer.innerHTML = `
            <p>${cocktail.strDrink}</p>
            <p>${cocktail.strGlass}</p>
            <p>${cocktail.strAlcoholic}</p>
            <p>${cocktail.strCategory}</p>
            <img src="${cocktail.strDrinkThumb}" alt='cocktail picture'>
            `

            ingredients.forEach(ingredient => {
                var liElement = document.createElement('li');
                liElement.classList.add('ingredients-class');
                liElement.innerHTML = ingredient;
                ingredientsList.appendChild(liElement);
            })
            const instructions = cocktail.strInstructions;
            instructionsContainer.innerHTML = instructions;

        });
}

getCocktailById(cocktailId);

