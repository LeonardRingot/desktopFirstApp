async function displayCocktails(type) {
    let response, data;
  
    if (type === 'ordinary_drink') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink');
      data = await response.json();
    } else if (type === 'cocktail') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
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
  
  document.getElementById('ordinary_drink').addEventListener('click', () => {
    displayCocktails('ordinary_drink');
  });
  
  document.getElementById('cocktail').addEventListener('click', () => {
    displayCocktails('cocktail');
  });