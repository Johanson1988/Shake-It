
const cocktailId = localStorage.getItem('cocktail-id').slice(9);
console.log(cocktailId);
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const cocktailContainer = document.querySelector('#cocktail-container')

const lookup = 'lookup.php';



const getCocktailById = (id) => {
    axios.get(baseUrl + lookup + '?i=' + id)
        .then ( responseFromAPI => {
            const {data} = responseFromAPI;
            const cocktail = data.drinks[0];
            console.log(cocktail);
            cocktailContainer.innerHTML = `
            <p>${cocktail.strDrink}</p>
            <p>${cocktail.strGlass}</p>
            <p>${cocktail.strAlcoholic}</p>
            <img src="${cocktail.strDrinkThumb}" alt='cocktail picture'>
            `

        })
}

getCocktailById(cocktailId);

