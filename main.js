const { app, BrowserWindow, ipcMain, Menu, MenuItem, remote } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
require('dotenv').config();
const packager = process.env.PACKAGE === 'true';

let window = null;
const store = new Store();

app.on('ready', function () {
  createWindow();
});

app.on('activate', () => {
  if (window === null) {
    createwindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwindow') {
    app.quit();
  }
});

function createWindow() {
  const screen = require('electron').screen;
  const { winWidth, winHeight } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: store.get('window/width') || Math.min(winWidth, 1600),
    height: store.get('window/height') || Math.min(winHeight, 1000),
    minWidth: 1200,
    minHeight: 900,
    title: 'Game Master\'s Playbook',
    titleBarStyle: 'hidden'
  });

  let template = require('./menu').template(app, window);
  require('./storage').storage(ipcMain, store);

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  if(process.env.DEV === 'true') {
    window.loadURL(process.env.HOST);
    window.webContents.openDevTools();
  } else {
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'ng-dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  window.on('closed', function () {
    window = null;
  });

  window.on('resize', event => {
    let bounds = event.sender.getBounds();
    store.set('window/height', bounds.height);
    store.set('window/width', bounds.width);
  });
}