import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';
import { Monster } from '../../_interfaces';
import { StateService, MonsterService } from './../../_services';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss']
})
export class MonstersComponent implements OnInit, OnDestroy {

  constructor(private state: StateService, private monsterService: MonsterService, 
    private electron: ElectronService, private zone: NgZone) { }

  monsters: Monster[]
  filter: string = ''
  deleting: boolean = false

  ngOnInit() {
    this.monsters = this.monsterService.getAll();
    this.electron.ipcRenderer.on('storage/delete/response', () => {
      this.zone.run(() => {
        this.monsters = this.monsterService.getAll();
      });
    });
    this.electron.ipcRenderer.on('storage/put/response', () => {
      this.zone.run(() => {
        this.monsters = this.monsterService.getAll();
      });
    });
  }

  ngOnDestroy() {
    this.electron.ipcRenderer.removeAllListeners('storage/delete/response');
    this.electron.ipcRenderer.removeAllListeners('storage/put/response');
  }

  newMonster() {
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: 'new-monster' } } ],
      subtitle: 'New Monster'
    });
  }

  importMonsters() {
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: 'import' } } ],
      subtitle: 'Import'
    });
  }

  deleteMonsters() {
    this.monsterService.deleteMany(this.filteredMonsters());
    this.deleting = false;
  }

  requestDeleteMonsters() {
    this.deleting = true;
  }

  selectMonster(name: string) {
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: `${name}` } } ],
      subtitle: `${name}`
    });
  }

  filteredMonsters() {
    let arrs: any[][] = [];
    _.forEach(this.filter.split(';'), term => {
      let reg = new RegExp(_.toLower(_.trim(term)), 'i');
      arrs.push(_.filter(this.monsters, m => {
        return reg.test(m.name) || reg.test(m.type) || reg.test(m.alignment) || reg.test(m.size) || reg.test(m.challenge) || reg.test(m.from);
      }));
    });
    if(arrs.length === 1) return _.take(arrs[0], 50);

    let val = arrs[0];
    for(let i = 1; i < arrs.length; i++) {
      val = _.intersectionWith(val, arrs[i], (a, b) => {
        return a.name === b.name;
      });
    }
    return _.take(val, 50);
  }
}