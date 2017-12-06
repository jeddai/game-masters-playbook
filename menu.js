function getTemplate(app, window) {
  const temp = [{
    label: 'File',
    submenu: [{
      label: 'New Campaign',
      accelerator: 'CmdOrCtrl+N',
      click: () => { window.webContents.send('new-campaign') }
    }]
  }, {
    label: 'Edit',
    submenu: [{
        role: 'undo'
      }, {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  }, {
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  }, {
    role: 'window',
    submenu: [{
      label: 'New Tab',
      accelerator: 'CmdOrCtrl+T',
      click: () => { window.webContents.send('new-tab') }
    }, {
      label: 'Previous Tab',
      accelerator: 'CmdOrCtrl+Shift+[',
      click: () => { window.webContents.send('tab-left') }
    }, {
      label: 'Next Tab',
      accelerator: 'CmdOrCtrl+Shift+]',
      click: () => { window.webContents.send('tab-right') }
    }, {
      type: 'separator'
    }, {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  }, {
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click() {
        require('electron').shell.openExternal('http://electron.atom.io')
      }
    }]
  }]
  
  if (process.platform === 'darwin') {
    const name = app.getName()
    temp.unshift({
      label: name,
      submenu: [{
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }]
    })
  }

  return temp;
}

exports.template = getTemplate;