const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
require('dotenv').config();
const package = process.env.PACKAGE === 'true';

let window = null;

app.on('ready', function () {
  const screen = require('electron').screen;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: Math.min(width, 1600), 
    height: Math.min(height, 1000),
    minWidth: 1200,
    minHeight: 900,
    title: 'Game Master\'s Playbook',
    titleBarStyle: 'hidden'
  });

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