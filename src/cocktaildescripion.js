const urlParams = new URLSearchParams(window.location.search);
const cocktailId = urlParams.get('id');

fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
  .then(response => response.json())
  .then(data => {
    const cocktail = data.drinks[0];
    cocktailContainer.innerHTML = `
      <h2>${cocktail.strDrink}</h2>
      <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}"/>
      <p>${cocktail.strInstructions}</p>
    `;
  })
  .catch(error => {
    console.error(error);
  });