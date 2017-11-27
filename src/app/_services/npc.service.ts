import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { CRUD, NPC } from './../_interfaces';

@Injectable()
export class NpcService implements CRUD {

  constructor() {
    this.db = new PouchDB('npcs', { adapter: 'websql' });
  }

  db: PouchDB;
  npcs;

  getAll(): Observable<NPC> {
    return new Observable(observer => {
      this.db.allDocs({ include_docs: true }, (err, res) => {
        if(err) return observer.next(err);
        let npcs = res.rows;
        _.forEach(npcs, (n, i) => {
          npcs[i] = n.doc;
        });
        npcs = _.sortBy(npcs, 'name');
        observer.next(npcs);
        this.npcs = npcs;
      });
    });
  }

  get(name): Observable<NPC> {
    return new Observable(observer => {
      this.db.get(name).then(doc => {
        observer.next(<NPC> doc);
      });
    });
  }

  save(npc) {
    npc._id = npc.name;
    if(_.filter(this.npcs, n => {
      return n._id === npc._id;
    }).length > 0)
      return false;
    this.db.put(npc);
  }

  delete(name): Observable<NPC> {
    return new Observable(observer => {
      this.db.get(name).then(doc => {
        return observer.next(this.db.remove(doc));
      });
    });
  }

  generate(_race: string, _class: string, _gender: string, _age: string): NPC {
    
    return {} as NPC;
  }

}
