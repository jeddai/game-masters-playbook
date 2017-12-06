import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class SettingsService {

  constructor(private electron: ElectronService) { }

  theme: string;

  getTheme(): string {
    let res = this.electron.ipcRenderer.sendSync('storage/get/one', 'settings', 'theme').theme;
    if(!res) {
      this.setTheme('light');
      return 'light';
    }
    return res;
  }

  setTheme(name: string) {
    this.electron.ipcRenderer.sendSync('storage/put', 'settings', {
      name: 'theme',
      theme: name
    });
  }
}
