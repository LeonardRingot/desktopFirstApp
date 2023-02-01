async function getCocktails(letter) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    console.log(data.drinks)
    return data.drinks;
  }
  
  async function displayCocktails(letter) {
    const cocktails = await getCocktails(letter);
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
      cocktailList.appendChild(row);
    });
  }
  
  document.getElementById('letter-select').addEventListener('change', event => {
    displayCocktails(event.target.value);
  });