const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const { autoUpdater } = require('electron-updater');
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
let win
//./database/cocktail.db
const database = new sqlite3.Database(__dirname + "/db.sqlite3", (err) => {
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
    strInstructions TEXT NOT NULL,
    strGlass TEXT NOT NULL,
    strIngredient1 TEXT,
    strIngredient2 TEXT,
    strIngredient3 TEXT,
    UserId INTEGER NOT NULL,
  FOREIGN KEY (UserId) REFERENCES User(id)
  );
`);
const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: __dirname + '/images/icon.ico',
      webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
    win.loadFile('login.html')

    win.once('ready-to-show', () => {
      autoUpdater.checkForUpdatesAndNotify();
    })
  
  }
  ipcMain.on("authenticated", async event => {
    win.loadURL(__dirname,'index.html')
  })
  app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    const NOTIFICATION_TITLE = 'Salut'
  const NOTIFICATION_BODY = 'App open'
  const a = new Notification({title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY})
  a.show()
  console.log(a);
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

  ipcMain.on('saveToWishlist', (event, idDrink, strDrink, strInstructions, strGlass,strIngredient1,strIngredient2,strIngredient3 ) => {
    database.get(`SELECT * FROM wishlist WHERE idDrink = ?`, [idDrink], (err, row) => {
    if (err) {
    throw err;
    } else if (row) {
    console.log(`Cocktail already exists in the wishlist`);
    event.sender.send('saveToWishlist error', 'Le Cocktail existe deja dans la wishlist');
    } else {
      UserId = '1'
    database.run( `INSERT INTO wishlist (idDrink, strDrink, strInstructions, strGlass, strIngredient1, strIngredient2,strIngredient3, UserId) VALUES (?, ?, ?, ?, ?,?,?,? )` , [idDrink, strDrink,strInstructions, strGlass,strIngredient1,strIngredient2,strIngredient3, UserId], function(err) {
    if (err) {
    throw err;
    } else {
    console.log(`Cocktail added to the wishlist: test`);
    event.sender.send('saveToWishlist success', 'Le cocktail a été ajouté dans la wishlist');
    }
    });
    }
    });
    });
    ipcMain.on('displayWishlist', (event) => {
      database.all(`SELECT * FROM wishlist`, [], (err, rows) => {
        console.log('ouai allo')
      if (err) {
      throw err;
      } else {
      console.log(`Wishlist fetched`);
      event.sender.send('displayWishlist success', rows);
      }
      });
      });
      ipcMain.on('deleteWishlistItem', (event, idDrink) => {
        console.log('test 1')
        database.get(`SELECT * FROM wishlist WHERE idDrink = ?`, [idDrink], (err, row) => {
          console.log('test 2')
            if (err) {
              console.log('test 3')
              console.log(err)
              event.sender.send('deleteWishlistItem error', `An error occurred while retrieving the cocktail from the database: ${err}`);
            } else if (!row) {
              console.log('test 4')
                console.log(`Cocktail doesn't exist in the wishlist`);
                event.sender.send('deleteWishlistItem error', `Le Cocktail n'existe pas dans la wishlist`);
            } else {
              console.log('test 5')
                database.run(`DELETE FROM wishlist WHERE idDrink = ?`, [idDrink], function(err) {
                    if (err) {
                      console.log('test 6')
                        throw err;
                    } else {
                      console.log('test 7')
                        console.log(`Cocktail deleted from the wishlist: ${idDrink}`);
                        event.sender.send('deleteWishlistItem success', `Le Cocktail a été supprimé de la wishlist`);
                    }
                });
            }
        });
    });

    const insertSql = `INSERT OR IGNORE INTO user (username, password)
    VALUES ('admin', 'admin')`;

database.run(insertSql, function (err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log("User created successfully");
    }
});
    ipcMain.on('login', (event, username, password) => {
      console.log('aaaaaaaaaaaaa')
      const sql = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
    console.log('test')
      database.get(sql, (err, row) => {
          if (err) {
              console.error(err.message);
              event.sender.send('login-error', 'An error occurred while checking the credentials');
          } else if (row) {
              event.sender.send('login-success');
          } else {
              event.sender.send('login-error', 'Invalid username or password');
          }
      });
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