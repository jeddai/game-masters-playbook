import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';
import * as Q from 'Q';
import { Campaign, CRUD, Session } from '../_interfaces';

@Injectable()
export class SessionService implements CRUD {

  constructor() { 
    this.db = new PouchDB('sessions', { adapter: 'websql' });
  }

  db: PouchDB;
  values;

  getAll(): Observable<Session[]> {
    return new Observable(observer => {
      this.db.allDocs({ include_docs: true }, (err, res) => {
        if(err) return observer.next(err);
        let sessions = res.rows;
        _.forEach(sessions, (s, i) => {
          sessions[i] = s.doc;
        });
        sessions = _.sortBy(sessions, 'name');
        observer.next(sessions);
        this.values = sessions;
      });
    });
  }

  get(name): Observable<Session> {
    return new Observable(observer => {
      this.db.get(name).then(doc => {
        observer.next(<Session> doc);
      });
    });
  }

  save(session: Session) {
    return new Observable(observer => {
      this.db.get(session.name)
      .then(doc => {
        if(doc) {
          Object.assign(doc, session);
          this.db.put(doc);
        }
        return observer.next(session);
      })
      .catch(err => {
        this.db.put(session);
        return observer.next(session);
      });
    });
  }

  delete(name: string): Observable<Boolean> {
    return new Observable(observer => {
      this.db.get(name)
      .then(doc => {
        this.db.remove(doc)
        .then(doc => {
          return observer.next(true);
        })
        .catch(err => {
          return observer.next(false);
        });
      })
      .catch(err => {
        return observer.next(false);
      });
    });
  }

}
