
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';
const resultsContainer = document.querySelector('#results-container');

const search = 'search.php';
const filter = 'filter.php';
const lookup = 'lookup.php';
const random = 'random.php';

const cleanInnerHtml = (el) => {
    while (el.firstChild) 
    { el.removeChild(el.firstChild)}};

const getCocktailsByIngredient = (name) => {
    return axios.get(baseUrl + filter + '?i=' + name)
        .then( responseFromAPI => {
            const {data} = responseFromAPI;
            return data;
        })
        .catch( (err) => console.log(err));
}

 

const submitButton = document.querySelector('#form-button');

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    const name = document.querySelector('#input-name').value;
    const ingredient1 = document.querySelector('#ingredient-1').value;
    const pr1 = getCocktailsByIngredient(name);
    const pr2 = getCocktailsByIngredient(ingredient1);
    Promise.all([pr1,pr2])
        .then( (result) => {
            const finalDrinksList = [];
            const drinksListIng1 = result[0].drinks;
            const drinksListIng2 = result[1].drinks;
            for(let i=0;i<drinksListIng1.length;i++) {
                for (let j=0;j<drinksListIng2.length;j++) {
                    if (drinksListIng1[i].idDrink === drinksListIng2[j].idDrink) { 
                        finalDrinksList.push(drinksListIng1[i]);
                    }
                }
            }
            showCocktails(finalDrinksList);
                    
            })
        
        
})

function showCocktails (cocktails) {
    cleanInnerHtml(resultsContainer);
    const cocktailsList = document.createElement('ul');
    cocktails.forEach((cocktail,index) =>{
        let liElement = document.createElement('li');
        liElement.setAttribute('id','cocktail-' + cocktail.idDrink);
        liElement.innerHTML = `<a href="cocktail-card.html"><h2>${cocktail.strDrink}</h2></a>`
        cocktailsList.appendChild(liElement);
        liElement.addEventListener('click', () =>{
            localStorage.setItem("cocktail-id", liElement.getAttribute('id'));
        })
    })
    resultsContainer.appendChild(cocktailsList);
}


