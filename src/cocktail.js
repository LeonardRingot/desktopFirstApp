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
              <h2>${cocktail.strDrink}</h2>
              <p>${cocktail.idDrink}</p>
              <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}"/>
             <button onclick="saveToWishlist('${cocktail.idDrink}', '${cocktail.strDrink}')">Add to Wishlist</button>
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
function saveToWishlist(idDrink,strDrink) {
  const objet = {
    idDrink:idDrink,
    strDrink:strDrink
  }
  window.postMessage({ type: "saveToWishlist", idDrink: idDrink, strDrink: strDrink }, "*");
  console.log(wishlist);
  console.log('mon objet',objet)

}
