import { Component, OnInit } from '@angular/core';
import { CampaignService, StateService } from '../../../_services';
import * as _ from 'lodash';

@Component({
  selector: 'app-all-campaigns',
  templateUrl: './all-campaigns.component.html',
  styleUrls: ['./all-campaigns.component.scss']
})
export class AllCampaignsComponent implements OnInit {

  constructor(private campaignService: CampaignService, private state: StateService) { }

  ngOnInit() {
    this.campaignService.getCampaigns()
    .subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  campaigns: Array<any> = [];
  newCampaign;

  addCampaign(): void {
    this.state.setTab({ subtitle: 'New Campaign', route: [ '/campaigns', { outlets: { out: 'new-campaign' } } ] });
  }

  goToCampaign(campaign) {
    this.state.setTab({ subtitle: campaign.name, route: [ '/campaigns', { outlets: { out: `${campaign.name}` } } ] });
  }

  delete(name) {
    this.state.setTab({
      subtitle: 'Delete',
      route: [ '/campaigns', { outlets: { out: `delete/${name}` } } ]
    })
  }
}
