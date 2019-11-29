
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const resultsContainer = document.querySelector('#results-container');

const search = 'search.php';
const filter = 'filter.php';
const lookup = 'lookup.php';
const random = 'random.php';

const cleanInnerHtml = (el) => {
    while (el.firstChild) 
    { el.removeChild(el.firstChild)}};

const  getCocktailsByLiquor = (name) => {
    axios.get(baseUrl + filter + '?i=' + name)
        .then( responseFromAPI => {
            const {data} = responseFromAPI;
            console.log(data);
            cleanInnerHtml(resultsContainer);
            const cocktailsList = document.createElement('ul');
            data.drinks.forEach((cocktail,index) =>{
                let liElement = document.createElement('li');
                liElement.setAttribute('id','cocktail-' + cocktail.idDrink);
                liElement.innerHTML = `<a href="cocktail-card.html"><h2>${cocktail.strDrink}</h2></a>`
                cocktailsList.appendChild(liElement);
                liElement.addEventListener('click', () =>{
                    localStorage.setItem("cocktail-id", liElement.getAttribute('id'));
                    console.log('id saved');
                })
            })
            resultsContainer.appendChild(cocktailsList);
            
        })
        .catch( (err) => console.log(err));
}

 

const submitButton = document.querySelector('#form-button');

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    const name = document.querySelector('#input-name').value;
    getCocktailsByLiquor(name);
})




