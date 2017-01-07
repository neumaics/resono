const { app, BrowserWindow } = require('electron');
const platformConfig = require(`./resources/${process.platform}`)

let win;

function createWindow () {
  const { width, height } = platformConfig.browser;

  win = new BrowserWindow({ width: width, height: height, titleBarStyle: 'hidden' });

  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
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
