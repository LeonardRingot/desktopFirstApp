const myWishList = document.getElementById("wishlist");

function displayWishlist() {
  window.postMessage({ type: "displayWishlist" }, "*");
}
function deleteWishlistItem(idDrink) {
  console.log(`Deleting wishlist item with id: ${idDrink}`);
  window.postMessage({ type: "deleteWishlistItem", idDrink: idDrink }, "*");
  console.log('Wishlist item deleted');
}

window.addEventListener("message", event => {
  if (event.data.type === "displayWishlist success") {
    console.log('aaaaaaaaaaaaaaa')
    const wishlist = event.data.wishlist;
    myWishList.innerHTML = "";
    wishlist.forEach((row) => {
      const drink = document.createElement("div");
      drink.innerHTML = `<p>ID: ${row.idDrink}</p> <p>Nom: ${row.strDrink}</p>`;
      myWishList.appendChild(drink);
    });
    console.log("Wishlist displayed");
  }
});
