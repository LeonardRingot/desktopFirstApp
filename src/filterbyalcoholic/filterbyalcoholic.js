async function displayCocktails(type) {
    let response, data;
  
    if (type === 'alcoholic') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
      data = await response.json();
    } else if (type === 'non-alcoholic') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
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
  
  document.getElementById('alcoholic').addEventListener('click', () => {
    displayCocktails('alcoholic');
  });
  
  document.getElementById('non-alcoholic').addEventListener('click', () => {
    displayCocktails('non-alcoholic');
  });