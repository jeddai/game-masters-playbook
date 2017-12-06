import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ElectronService } from 'ngx-electron';
import { Campaign, CRUD, Session } from '../_interfaces';

@Injectable()
export class CampaignService implements CRUD {

  constructor(private electron: ElectronService) { }

  values: Campaign[];

  getAll(): Campaign[] {
    let res = this.electron.ipcRenderer.sendSync('storage/get/all', 'campaign');
    return res;
  }

  get(name: string): Campaign {
    let res = this.electron.ipcRenderer.sendSync('storage/get/one', 'campaign', name);
    return res;
  }

  save(campaign: Campaign): Campaign {
    let res = this.electron.ipcRenderer.sendSync('storage/put', 'campaign', campaign);
    return res;
  }

  delete(name: string): Boolean {
    let res = this.electron.ipcRenderer.sendSync('storage/delete/one', 'campaign', name);
    return res;
  }
}
