const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater');
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
let win

const database = new sqlite3.Database("./database/cocktail.db", (err) => {
  if (err) console.error('Database opening error: ', err);
  console.log('Connected to the in-memory sqlite db')
});
database.run(`
    CREATE TABLE IF NOT EXISTS cocktail (
      id INTEGER NOT NULL,
      idDrink INTEGER NOT NULL,
      strDrink TEXT NOT NULL,
      strCategory TEXT NOT NULL,
      strAlcoholic TEXT NOT NULL,
      strGlass TEXT NOT NULL,
      strInstructions TEXT NOT NULL
    );
  `);
console.log('ma bdd',database)
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
    win.loadFile('index.html')

    win.once('ready-to-show', () => {
      autoUpdater.checkForUpdatesAndNotify();
    })
  
  }

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
  ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
  });
  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
  });