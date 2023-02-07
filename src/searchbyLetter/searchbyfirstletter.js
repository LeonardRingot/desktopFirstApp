async function getCocktails(letter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.drinks;
}

async function displayCocktails(letter) {
  const cocktails = await getCocktails(letter);
  const cocktailList = document.getElementById('cocktail-list');
  cocktailList.innerHTML = '';
  cocktails.forEach(cocktail => {
    const card = document.createElement('div');
    card.classList.add('card');

    // Add image
    const image = document.createElement('img');
    image.src = cocktail.strDrinkThumb;
    image.classList.add('card-img-top');
    card.appendChild(image);

    // Add body
    const body = document.createElement('div');
    body.classList.add('card-body');
    card.appendChild(body);

    // Add title
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = cocktail.strDrink;
    body.appendChild(title);

    // Add category
    const category = document.createElement('p');
    category.classList.add('card-text');
    category.textContent = cocktail.strCategory;
    body.appendChild(category);

    // Add alcoholic status
    const alcoholic = document.createElement('p');
    alcoholic.classList.add('card-text');
    alcoholic.textContent = cocktail.strAlcoholic;
    body.appendChild(alcoholic);

    // Add glass
    const glass = document.createElement('p');
    glass.classList.add('card-text');
    glass.textContent = cocktail.strGlass;
    body.appendChild(glass);

    // Add instructions
    const instructions = document.createElement('p');
    instructions.classList.add('card-text');
    instructions.textContent = cocktail.strInstructions;
    body.appendChild(instructions);

    cocktailList.appendChild(card);
  });
}

document.getElementById('letter-select').addEventListener('change', event => {
  displayCocktails(event.target.value);
});