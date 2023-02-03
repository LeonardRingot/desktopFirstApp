const myWishList = document.getElementById("wishlist");

function displayWishlist() {
  console.log('je suis passé')
  window.postMessage({ type: "displayWishlist" }, "*");
  console.log('je suis passé et la ?')
}

window.addEventListener("load", displayWishlist);