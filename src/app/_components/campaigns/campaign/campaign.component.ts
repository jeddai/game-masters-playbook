import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService, StateService } from './../../../_services';
import { Campaign } from './../../../_Interfaces';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private state: StateService, private campaignService: CampaignService) { }
  
  campaignId: string = null;
  campaign: Campaign = {} as Campaign;
  editing: boolean = false;
  
  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');

    this.campaignService.get(this.campaignId)
    .subscribe(campaign => {
      this.campaign = campaign;

      let state = this.state.getState();
      Object.assign(this, state || {});
    });
  }

  ngOnDestroy() {
    this.state.setTab({
      state: {
        campaignId: this.campaignId,
        campaign: this.campaign,
        editing: this.editing
      }
    }, this.state.previouslySelectedTab);
  }

  refresh() {
    this.campaignService.get(this.campaignId)
    .subscribe(campaign => {
      this.campaign = campaign;
    });
  }

  edit() {
    this.editing = true;
  }

  save() {
    this.campaignService.save(this.campaign)
    .subscribe(res => {
      this.campaign = res;
      this.campaignId = res._id;
      this.editing = false;
    })
  }

}
