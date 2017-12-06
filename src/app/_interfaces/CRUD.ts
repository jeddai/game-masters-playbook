import { Observable } from 'rxjs/Observable';
import PouchDB from 'pouchdb';

export interface CRUD {
  getAll(): any
  get(name: string): any
  save(obj: any): void
  delete(name: string): any
}