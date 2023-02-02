async function getCocktails(letter) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    console.log(data.drinks)
    return data.drinks;
  }
  
  async function displayCocktails(letter) {
    const cocktails = await getCocktails(letter);
    console.log(cocktails)
    const cocktailList = document.getElementById('cocktail-list');
    cocktailList.innerHTML = '';
    cocktails.forEach(cocktail => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.textContent = cocktail.strDrink;
      row.appendChild(nameCell);
      const imageCell = document.createElement('td');
      const image = document.createElement('img');
      image.src = cocktail.strDrinkThumb;
      imageCell.appendChild(image);
      row.appendChild(imageCell);

      // Add cells for the additional properties
      const categoryCell = document.createElement('td');
      categoryCell.textContent = cocktail.strCategory;
      row.appendChild(categoryCell);
      const alcoholicCell = document.createElement('td');
      alcoholicCell.textContent = cocktail.strAlcoholic;
      row.appendChild(alcoholicCell);
      const glassCell = document.createElement('td');
      glassCell.textContent = cocktail.strGlass;
      row.appendChild(glassCell);
      const instructionsCell = document.createElement('td');
      instructionsCell.textContent = cocktail.strInstructions;
      row.appendChild(instructionsCell);
      const ingredient1Cell = document.createElement('td');
      ingredient1Cell.textContent = cocktail.strIngredient1;
      row.appendChild(ingredient1Cell);
      const ingredient2Cell = document.createElement('td');
      ingredient2Cell.textContent = cocktail.strIngredient2;
      row.appendChild(ingredient2Cell);
      const ingredient3Cell = document.createElement('td');
      ingredient3Cell.textContent = cocktail.strIngredient3;
      row.appendChild(ingredient3Cell);
      const ingredient4Cell = document.createElement('td');
      ingredient4Cell.textContent = cocktail.strIngredient4;
      row.appendChild(ingredient4Cell);
      const measure1Cell = document.createElement('td');
      measure1Cell.textContent = cocktail.strMeasure1;
      row.appendChild(measure1Cell);
      const measure2Cell = document.createElement('td');
      measure2Cell.textContent = cocktail.strMeasure2;
      row.appendChild(measure2Cell);
      const measure3Cell = document.createElement('td');
      measure3Cell.textContent = cocktail.strMeasure3;
      row.appendChild(measure3Cell);
      const measure4Cell = document.createElement('td');
      measure4Cell.textContent = cocktail.strMeasure4;
      row.appendChild(measure4Cell);

      cocktailList.appendChild(row);
    });
  }
  
  document.getElementById('letter-select').addEventListener('change', event => {
    displayCocktails(event.target.value);
  });