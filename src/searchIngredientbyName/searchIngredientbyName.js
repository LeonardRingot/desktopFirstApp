const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const IngredientList = document.getElementById("ingredient-list");
console.log('test')
function displayIngredients(searchTerm= ''){
    console.log('moi aussi ouuuu ?')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const myingredient = data.ingredients;
        console.log(myingredient)
        let html = '';
        myingredient.forEach(ingredient => {
            if(ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())){
                html+=`
                <div onClick="displayIngredient('${ingredient.idIngredient}')>">
                <h2>${ingredient.strIngredient}</h2>
                <p>${ingredient.strDescription}</p>
                <p>Alcolisé :${ingredient.strAlcohol}</p>
                </div>
                `;
            }
        });
        IngredientList.innerHTML = html;
        console.log(IngredientList)
    }).catch(error => {
        console.error(error);
      });
    }
      displayIngredients();

      searchInput.addEventListener("input", function() {
        let searchTerm = searchInput.value;
        if (!searchTerm) {
          searchTerm = '';
        }
        displayIngredients(searchTerm);
      });
