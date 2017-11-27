import { Observable } from 'rxjs/Observable';
import PouchDB from 'pouchdb';

export interface CRUD {
  db: PouchDB
  getAll(): Observable<any>
  get(name: string): Observable<any>
  save(obj: any): void
  delete(name: string): Observable<any>
}