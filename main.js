const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
let win
//./database/cocktail.db
const database = new sqlite3.Database("./db.sqlite3", (err) => {
  if (err) console.error('Database opening error: ', err);
  console.log('Connected to the in-memory sqlite db')
});
database.run(`
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
    );
  `);
  database.run(`
  CREATE TABLE IF NOT EXISTS wishlist (
    id INTEGER PRIMARY KEY,
    idDrink INTEGER NOT NULL UNIQUE,
    strDrink TEXT NOT NULL,
    UserId INTEGER NOT NULL,
  FOREIGN KEY (UserId) REFERENCES User(id)
  );
`);
const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: __dirname + '/images/cocktail.ico',
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.loadFile('login.html')

    // win.once('ready-to-show', () => {
    //   autoUpdater.checkForUpdatesAndNotify();
    // })
  
  }
  ipcMain.on("authenticated", async event => {
    win.loadURL(__dirname,'index.html')
  })
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


  ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });
  ipcMain.on('cocktail', (event)=>{
    database.all("SELECT * FROM cocktail where id=1", [],(err, rows)=>{
      if(err){
        throw err
      }
      console.log(rows);
      event.sender.send('cocktail', rows );
    })
  });

  ipcMain.on('saveToWishlist', (event, idDrink, strDrink) => {
    database.get(`SELECT * FROM wishlist WHERE idDrink = ?`, [idDrink], (err, row) => {
    if (err) {
    throw err;
    } else if (row) {
    console.log(`Cocktail already exists in the wishlist`);
    event.sender.send('saveToWishlist error', 'Le Cocktail existe deja dans la wishlist tu vas quand meme pas en abuser hein :)');
    } else {
      UserId = '1'
    database.run( `INSERT INTO wishlist (idDrink, strDrink, UserId) VALUES (?, ?, ?)` , [idDrink, strDrink, UserId], function(err) {
    if (err) {
    throw err;
    } else {
    console.log(`Cocktail added to the wishlist: test`);
    event.sender.send('saveToWishlist success', 'Le cocktail a été ajouté dans la wishlist sale alcoolique');
    }
    });
    }
    });
    });

    ipcMain.on("displayWishlist", (event) => {
      database.all("SELECT * FROM wishlist", [], (err, rows) => {
      if (err) {
      event.sender.send("displayWishlist error", err.message);
      } else {
      event.sender.send("displayWishlist success", rows);
      }
      });
      });
      ipcMain.on('login', (event, username, password) => {
        // Perform the necessary checks to validate the user credentials
        // For example, you can check if the username and password match with the database
        if (username === 'admin' && password === 'admin') {
        event.sender.send('login-success');
        } else {
        event.sender.send('login-error', 'Invalid username or password');
        }
        });
  
  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
  });
  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
  });