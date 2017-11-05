import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class CampaignService {

  constructor() {
    this.db = new PouchDB('campaigns', { adapter: 'websql' });
    if (!this.db.adapter) {
      this.db = new PouchDB('campaigns');
    }
  }

  db: PouchDB;
  campaigns;

  getCampaigns(): Observable<any> {
    return new Observable(observer => {
      this.db.allDocs({ include_docs: true }, (err, res) => {
        if(err) return observer.next(err);
        let campaigns = res.rows;
        _.forEach(campaigns, (c, i) => {
          campaigns[i] = c.doc;
        });
        campaigns = _.sortBy(campaigns, 'name');
        observer.next(campaigns);
        this.campaigns = campaigns;
      });
    });
  }

  getCampaign(name): Observable<any> {
    return new Observable(observer => {
      this.db.get(name).then(doc => {
        observer.next(doc);
      });
    });
  }

  addCampaign(campaign) {
    campaign._id = campaign.name;
    if(_.filter(this.campaigns, c => {
      return c._id === campaign._id;
    }).length > 0)
      return false;
    this.db.put(campaign);
  }

  deleteCampaign(name): Observable<any> {
    return new Observable(observer => {
      this.db.get(name).then(doc => {
        return observer.next(this.db.remove(doc));
      });
    });
  }

}
