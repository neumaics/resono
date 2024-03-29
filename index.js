const { app, BrowserWindow, globalShortcut } = require('electron');
const commonConfig = require('./conf/common');
const platformConfig = require(`./conf/${process.platform}`);

let win;

function createWindow () {
  const { width, height } = platformConfig.browser;

  win = new BrowserWindow({ width: width, height: height, titleBarStyle: 'hidden' });

  win.loadURL(`file://${__dirname}/index.html`);

  if (commonConfig.debug) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  const ret = globalShortcut.register('MediaPlayPause', () => {
    win.webContents.send('MediaPlayPause');
  });

  if (!ret) {
    console.error('registration failed');
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  // ipcMain.removeAllListeners();
});
