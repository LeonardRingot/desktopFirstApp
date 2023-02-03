const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', async () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const version = document.getElementById("version");

  const notification = document.getElementById("notification");
  const message = document.getElementById("message");
  const restartButton = document.getElementById("restart-button");

  ipcRenderer.on("update_available", () => {
    ipcRenderer.removeAllListeners("update_available");
    message.innerText = "A new update is available. Downloading now...";
    notification.classList.remove("hidden");
  });

  ipcRenderer.on("update_downloaded", () => {
    ipcRenderer.removeAllListeners("update_downloaded");
    message.innerText =
      "Update Downloaded. It will be installed on restart. Restart now?";
    restartButton.classList.remove("hidden");
    notification.classList.remove("hidden");
  });

  ipcRenderer.send("app_version");
  ipcRenderer.on("app_version", (event, arg) => {
    ipcRenderer.removeAllListeners("app_version");
    console.log(arg);
    version.innerText = "Version " + arg.version;
  });
 

  window.addEventListener("message", event => {
    if (event.data.type === "saveToWishlist") {
    ipcRenderer.send("saveToWishlist", event.data.idDrink, event.data.strDrink);
    }
    });

    ipcRenderer.on("saveToWishlist", (event, arg) => {
      console.log("Received IPC message:", arg);
      });
      
      ipcRenderer.on("saveToWishlist error", (event, message) => {
        console.log(message);
        alert(message);
      });
      
      ipcRenderer.on("saveToWishlist success", (event, message) => {
        console.log(message);
        alert(message);
      });

      ipcRenderer.on("displayWishlist success", (event, wishlist) => {
        console.log(wishlist);
        const myWishList = document.getElementById("wishlist");

        myWishList.innerHTML = "";

        wishlist.forEach((row) => {

          const drink = document.createElement("div");

          drink.innerHTML = `<p>ID: ${row.idDrink}</p> <p>Nom: ${row.strDrink}</p>`;

          myWishList.appendChild(drink);
        });
      });
      
      // Attach event listener for displayWishlistError message from main process
      ipcRenderer.on("displayWishlist error", (event, message) => {

        console.log(message);

        alert(message);
      });
      
      // Send displayWishlist message to main process
      ipcRenderer.send("displayWishlist");

      document.getElementById('submit').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
          alert("Username and password are required");
        } else {
          ipcRenderer.send('login', username, password);
        }
      });
      
      ipcRenderer.on('login-success', () => {
        // Redirect the user to the next page
        window.location.href = 'index.html';
      });
      
      ipcRenderer.on('login-error', (event, message) => {
        alert(message);
      });
})

contextBridge.exposeInMainWorld('api', {
  closeNotification : () => {
    notification.classList.add("hidden");
  },
  restartApp : () => {
    ipcRenderer.send("restart_app");
  }
})