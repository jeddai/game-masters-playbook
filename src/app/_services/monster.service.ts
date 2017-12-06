import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ElectronService } from 'ngx-electron';
import { Monster, CRUD, Session } from '../_interfaces';
const type = 'monster';

@Injectable()
export class MonsterService implements CRUD {

  constructor(private electron: ElectronService) { }

  values: Monster[];

  getAll(): Monster[] {
    let res = this.electron.ipcRenderer.sendSync('storage/get/all', type);
    return res;
  }

  get(name: string): Monster {
    let res = this.electron.ipcRenderer.sendSync('storage/get/one', type, name);
    return res;
  }

  save(monster: Monster): Monster {
    let res = this.electron.ipcRenderer.sendSync('storage/put', type, monster);
    return res;
  }

  import(monsters: Monster[]): Monster[] {
    let res = this.electron.ipcRenderer.sendSync('storage/put/many', type, monsters);
    return res;
  }

  delete(name: string): Boolean {
    let res = this.electron.ipcRenderer.sendSync('storage/delete/one', type, name);
    return res;
  }

  deleteMany(monsters: Monster[]): Monster[] {
    let res = this.electron.ipcRenderer.sendSync('storage/delete/many', type, monsters);
    return res;
  }
}
