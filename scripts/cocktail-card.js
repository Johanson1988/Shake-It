
const cocktailId = localStorage.getItem('cocktail-id').slice(9);
console.log(cocktailId);
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

const lookup = 'lookup.php';



const getCocktailById = (id) => {
    axios.get(baseUrl + lookup + '?i=' + id)
        .then ( responseFromAPI => {
            console.log(responseFromAPI);
        })
}

getCocktailById(cocktailId);

