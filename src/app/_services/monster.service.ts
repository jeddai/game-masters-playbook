import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Monster } from '../_classes';

@Injectable()
export class MonsterService {

  constructor() {
    this.db = new PouchDB('monsters', { adapter: 'websql' });
    if (!this.db.adapter) {
      this.db = new PouchDB('monsters');
    }
  }

  db: PouchDB;

  getMonsters(): Observable<Monster> {
    return new Observable(observer => {
      this.db.allDocs((err, res) => {
        if(err) return observer.next(err);
        observer.next(res);
      });
    });
  }

}
