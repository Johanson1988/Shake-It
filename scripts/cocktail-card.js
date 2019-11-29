
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
            
            <h3 id='drink' class="card-title">${cocktail.strDrink}</h3>
            <p id='glass' class="card-text">Glass Type: ${cocktail.strGlass}</p>
            <p id='alcoholic' class="card-text">Alcoholic: ${cocktail.strAlcoholic}</p>
            <p id='category' class="card-text">Category: ${cocktail.strCategory}</p>
            <img id='img-drink' class="card-img-top" src="${cocktail.strDrinkThumb}" alt='cocktail picture'>
            
            `

            ingredients.forEach(ingredient => {
                const liElement = document.createElement('li');
                liElement.classList.add('ingredients-class', 'list-group-item');
                liElement.innerHTML = ingredient;
                ingredientsList.appendChild(liElement);
                const ingredientImage = document.createElement('img');
                ingredientImage.src = `https://www.thecocktaildb.com/images/ingredients/${ingredient}.png`;
                liElement.appendChild(ingredientImage);
                
            })
            const instructions = cocktail.strInstructions;
            instructionsContainer.innerHTML = instructions;

        });
}

getCocktailById(cocktailId);

