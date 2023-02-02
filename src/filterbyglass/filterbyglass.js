async function displayCocktails(type) {
    let response, data;
  
    if (type === 'cocktail_glass') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass');
      data = await response.json();
    } else if (type === 'champagne_flute') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute');
      data = await response.json();
    }
  
    // Clear previous data
    document.getElementById('cocktail-list').innerHTML = '';
  
    // Display the cocktail data on the page
    data.drinks.forEach(cocktail => {
      const template = `
        <div class="cocktail">
          <h2>${cocktail.strDrink}</h2>
          <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        </div>
      `;
      document.getElementById('cocktail-list').insertAdjacentHTML('beforeend', template);
    });
  }
  
  document.getElementById('cocktail_glass').addEventListener('click', () => {
    displayCocktails('cocktail_glass');
  });
  
  document.getElementById('champagne_flute').addEventListener('click', () => {
    displayCocktails('champagne_flute');
  });