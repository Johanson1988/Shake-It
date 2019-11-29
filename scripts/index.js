const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const resultsContainer = document.querySelector('#results-container');

const search = 'search.php';
const filter = 'filter.php';
const lookup = 'lookup.php';
const random = 'random.php';

const cleanInnerHtml = (el) => {
    while (el.firstChild) 
    { el.removeChild(el.firstChild)}};

const  getCocktailByName = (name) => {
    axios.get(baseUrl + search + '?s=' + name)
        .then( responseFromAPI => {
            const {data} = responseFromAPI;
            cleanInnerHtml(resultsContainer);
            const cocktailsList = document.createElement('ul');
            data.drinks.forEach(cocktail =>{
                let liElement = document.createElement('li');
                liElement.innerHTML = `<h2>${cocktail.strDrink}</h2>`
                cocktailsList.appendChild(liElement);
            })
            resultsContainer.appendChild(cocktailsList);
            
        })
        .catch( (err) => console.log(err));
}



const submitButton = document.querySelector('#form-button');

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    const name = document.querySelector('#input-name').value;
    getCocktailByName(name);
})




