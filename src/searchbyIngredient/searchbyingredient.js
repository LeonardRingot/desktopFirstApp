const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cocktailList = document.getElementById("cocktail-list");

function displayCocktails(searchTerm = '') {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const mycocktails = data.drinks;
      console.log(mycocktails)
      console.log('test1')
      let html = '';
      console.log('test2')
      mycocktails.map(drink => {
        console.log('test3')
        if(drink.strDrink.toLowerCase()){
            html+= `
            <div class="cocktail-card" onclick="displayCocktails('${drink.idDrink}')">
              <h2>${drink.strDrink}</h2>
              <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
            </div>
          `;
        }
      });
      cocktailList.innerHTML = html;
      console.log('ma liste',cocktailList)
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        cocktailList.innerHTML = '<p>Could not load cocktails. Please try again later.</p>';
    });
}

displayCocktails();

searchInput.addEventListener("input", function() {
  let searchTerm = searchInput.value;
  if (!searchTerm) {
    searchTerm = '';
  }
  displayCocktails(searchTerm);
});