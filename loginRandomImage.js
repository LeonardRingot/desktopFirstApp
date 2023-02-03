const cocktailRandom = document.getElementById("random-cocktail");

function displayRandomCocktails() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;
      console.log(cocktails)
      let html = '';
      cocktails.map(cocktail => {
        if (cocktail.strDrink.toLowerCase()) {
          html += `
            <div class="cocktail-card" >
            <h2>Cocktail du moment</h2>
              <h2>Nom du Cocktail: ${cocktail.strDrink}</h2>
              <p>Catégorie: ${cocktail.strCategory}</p>
              <p>Instructions:${cocktail.strInstructions}<p>
              <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}"/>
            </div>
          `;
        }
      });
      cocktailRandom.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
    });
}
displayRandomCocktails();