const { app, BrowserWindow, globalShortcut, Menu, ipcMain } = require('electron');
const commonConfig = require('./conf/common');
const platformConfig = require(`./conf/${process.platform}`);

let win;

function createWindow () {
  const { width, height } = platformConfig.browser;

  Menu.setApplicationMenu(null); // Removes menu

  win = new BrowserWindow({ width: width, height: height, titleBarStyle: 'hidden', frame: false });

  win.loadURL(`file://${__dirname}/index.html`);

  if (commonConfig.debug) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });

  win.on('maximize', () => {
    ipcMain.send('window-maximized');
  });

  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => win.maximize());
  ipcMain.on('window-restore', () => win.unmaximize());
  ipcMain.on('window-close', () => win.close());
  ipcMain.on('window-is-maximized', (event) => {
    event.returnValue = win.isMaximized();
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
});
