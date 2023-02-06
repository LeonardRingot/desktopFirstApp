const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cocktailList = document.getElementById("cocktail-list");

const wishlist = [];


function displayCocktails(searchTerm = '') {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;
      console.log(cocktails)
      let html = '';
      cocktails.map(cocktail => {
        if (cocktail.strDrink.toLowerCase().includes(searchTerm.toLowerCase())) {
          html += `
            <div class="cocktail-card" >
              <h2>Nom: ${cocktail.strDrink}</h2>
              <p>identifiant cocktail: ${cocktail.idDrink}</p>
              <p>Instructions: ${cocktail.strInstructions}</p>
              <p>Verre: ${cocktail.strGlass}</p>
              <p>Ingredients 1 : ${cocktail.strIngredient1}</p>
              <p>Ingredient 2: ${cocktail.strIngredient2}</p>
              <p>Ingredeients 3: ${cocktail.strIngredient3}</p>
              <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}"/>
             <button onclick="saveToWishlist('${cocktail.idDrink}', '${cocktail.strDrink}','${cocktail.strInstructions}','${cocktail.strGlass}','${cocktail.strIngredient1}','${cocktail.strIngredient2}','${cocktail.strIngredient3}')">Add to Wishlist</button>
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
function saveToWishlist(idDrink,strDrink, strInstructions, strGlass, strIngredient1, strIngredient2, strIngredient3) {
  const objet = {
    idDrink:idDrink,
    strDrink:strDrink,
    strInstructions:strInstructions,
    strGlass:strGlass,
    strIngredient1:strIngredient1,
    strIngredient2:strIngredient2,
    strIngredient3:strIngredient3

  }
  window.postMessage({ type: "saveToWishlist", idDrink: idDrink, strDrink: strDrink ,strInstructions: strInstructions, strGlass:strGlass, strIngredient1:strIngredient1 ,strIngredient2:strIngredient2, strIngredient3:strIngredient3}, "*");
  console.log(wishlist);
  console.log('mon objet',objet)

}
