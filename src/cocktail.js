const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cocktailList = document.getElementById("cocktail-list");

function displayCocktails(searchTerm = '') {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;
      let html = '';
      cocktails.forEach(cocktail => {
        if (cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase())) {
          html += `
            <div class="cocktail-card" onclick="displayCocktail('${cocktail.idDrink}')">
              <h2>${cocktail.strDrink}</h2>
              <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}"/>
            </div>
          `;
        }
      });
      cocktailList.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
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