import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';
import { Campaign, CRUD, Session } from '../_interfaces';
import { SessionService } from '../_services';

@Injectable()
export class CampaignService implements CRUD {

  constructor() {
    this.db = new PouchDB('campaigns', { adapter: 'websql' });
  }

  db: PouchDB;
  values: Campaign[];

  getAll(): Observable<Campaign[]> {
    return new Observable(observer => {
      this.db.allDocs({ include_docs: true }, (err, res) => {
        if(err) return observer.next(err);
        let campaigns: Campaign[] = [];
        _.forEach(res.rows, (c, i) => {
          campaigns[i] = c.doc;
        });
        campaigns = _.sortBy(campaigns, 'name');
        observer.next(campaigns);
        this.values = campaigns;
      });
    });
  }

  get(id: string): Observable<Campaign> {
    return new Observable(observer => {
      this.db.get(id).then(doc => {
        observer.next(doc);
      })
      .catch(err => {
        console.log(err);
        observer.next(err);
      });
    });
  }

  save(campaign: Campaign): Observable<Campaign> {
    if(!campaign._id) {
      campaign._id = campaign.name;
    }
    return new Observable(observer => {
      this.db.get(campaign.name)
      .then(doc => {
        if(doc) {
          Object.assign(doc, campaign);
          this.db.put(doc);
        }
        this.get(campaign.name)
        .subscribe(res => {
          return observer.next(res);
        });
      })
      .catch(err => {
        this.db.put(campaign);
        this.get(campaign.name)
        .subscribe(res => {
          return observer.next(res);
        });
      });
    });
  }

  delete(id: string): Observable<Boolean> {
    return new Observable(observer => {
      this.db.get(id)
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
