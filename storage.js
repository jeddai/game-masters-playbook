let _ = require('lodash');

function storage(ipcMain, store) {
  let d = store.get('data');
  if(!d) {
    store.set('data', {
      campaign: [],
      npc: [],
      session: [],
      monster: [],
      combat: [],
      settings: []
    });
  }

  ipcMain.on('storage/put', (event, type, obj) => {
    let data = store.get('data');
    let arr = data[type] || [];
    if(arr.length) {
      let i = _.findIndex(arr, (o) => {
        return o.name === obj.name;
      });
      if(i !== -1) {
        arr[i] = obj;
      } else {
        arr.push(obj);
      }
    } else {
      arr.push(obj);
    }
    data[type] = arr;
    store.set('data', data);
    event.returnValue = obj;
    event.sender.send('storage/put/response', obj);
  });

  ipcMain.on('storage/put/many', (event, type, objects) => {
    let data = store.get('data');
    let arr = data[type] || [];
    _.forEach(objects, (obj) => {
      if(arr.length) {
        let i = _.findIndex(arr, (o) => {
          return o.name === obj.name;
        });
        if(i !== -1) {
          arr[i] = obj;
        } else {
          arr.push(obj);
        }
      } else {
        arr.push(obj);
      }
    });
    data[type] = arr;
    store.set('data', data);
    event.returnValue = objects;
    event.sender.send('storage/put/response', objects);
  });

  ipcMain.on('storage/get/all', (event, type) => {
    let res = _.sortBy(store.get('data')[type], 'name');
    event.returnValue = res;
    event.sender.send('storage/get/all/response', res);
  });

  ipcMain.on('storage/get/one', (event, type, name) => {
    let arr = store.get('data')[type] || [];
    let res = _.filter(arr, o => {
      return o.name === name;
    });
    res = res[0] || {
      name: `Unable to find campaign with name ${name}`
    }
    event.returnValue = res;
    event.sender.send('storage/get/one/response', res);
  });

  ipcMain.on('storage/delete/one', (event, type, name) => {
    let data = store.get('data');
    let arr = data[type] || [];
    let index = _.findIndex(arr, (o) => {
      return o.name === name;
    });
    if(index !== -1) {
      arr.splice(index, 1);
    } else {
      event.returnValue = false;
      event.sender.send('storage/delete/response', false);
      return;
    }
    data[type] = arr;
    store.set('data', data);
    event.returnValue = true;
    event.sender.send('storage/delete/response', true);
  });

  ipcMain.on('storage/delete/many', (event, type, objects) => {
    let data = store.get('data');
    let arr = data[type] || [];
    _.forEach(objects, obj => {
      let index = _.findIndex(arr, (o) => {
        return o.name === obj.name;
      });
      if(index !== -1) {
        arr.splice(index, 1);
      } else {
        event.returnValue = false;
        event.sender.send('storage/delete/response', false);
        return;
      }
    });
    data[type] = arr;
    store.set('data', data);
    event.returnValue = true;
    event.sender.send('storage/delete/response', true);
  });
}

exports.storage = storage;