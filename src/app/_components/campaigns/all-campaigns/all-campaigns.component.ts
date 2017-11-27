import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../_services';
import * as _ from 'lodash';
import { Campaign } from '../../../_interfaces';
import { CampaignService } from './../../../_services/campaign.service';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.scss']
})
export class AllCampaignsComponent implements OnInit {

  constructor(private state: StateService, private campaignService: CampaignService) { }

  ngOnInit() {
    this.campaignService.getAll()
    .subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  campaigns: Array<Campaign> = [];
  newCampaign;

  addCampaign(): void {
    this.state.setTab({ subtitle: 'New Campaign', route: [ '/campaigns', { outlets: { out: 'new-campaign' } } ] });
  }

  goToCampaign(campaign) {
    this.state.setTab({ subtitle: campaign._id, route: [ '/campaigns', { outlets: { out: `${campaign._id}` } } ] });
  }

  delete(id) {
    this.state.setTab({
      subtitle: 'Delete',
      route: [ '/campaigns', { outlets: { out: `delete/${id}` } } ]
    })
  }
}
