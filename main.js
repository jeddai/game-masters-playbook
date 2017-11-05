const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
require('dotenv').config();
require('electron-reload')(__dirname);

let window = null;

app.on('ready', function () {
  const screen = require('electron').screen;
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: Math.min(width, 1600), 
    height: Math.min(height, 1000),
    minWidth: 800,
    minHeight: 600,
    title: 'Game Master\'s Playbook',
    titleBarStyle: 'hidden'
  });

  if (process.env.PACKAGE === 'true'){
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    window.loadURL(process.env.HOST);
    window.webContents.openDevTools();
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