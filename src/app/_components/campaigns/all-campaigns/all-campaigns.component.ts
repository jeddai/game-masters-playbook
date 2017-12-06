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
    this.campaigns = this.campaignService.getAll();
  }

  campaigns: Array<Campaign> = [];
  newCampaign;

  addCampaign(): void {
    this.state.setTab({ subtitle: 'New Campaign', route: [ '/campaigns', { outlets: { out: 'new-campaign' } } ] });
  }

  goToCampaign(campaign) {
    this.state.setTab({ subtitle: campaign.name, route: [ '/campaigns', { outlets: { out: `${campaign.name}` } } ] });
  }

  delete(name) {
    this.state.setTab({
      route: [ '/campaigns', { outlets: { out: `${name}/delete` } } ],
      subtitle: `Delete ${name}`
    })
  }
}
