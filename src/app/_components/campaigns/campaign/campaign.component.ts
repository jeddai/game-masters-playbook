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
  
  campaignName: string = null;
  campaign: Campaign = {} as Campaign;
  editing: boolean = false;
  
  ngOnInit() {
    this.campaignName = this.route.snapshot.paramMap.get('name');
    console.log(this.campaignName);
    this.campaign = this.campaignService.get(this.campaignName)
    let state = this.state.getState();
    Object.assign(this, state || {});
  }

  ngOnDestroy() {
    this.state.setState({
      campaignId: this.campaignName,
      campaign: this.campaign,
      editing: this.editing
    }, this.state.previouslySelectedTab);
  }

  refresh() {
    this.campaign = this.campaignService.get(this.campaignName);
  }

  edit() {
    this.editing = true;
  }

  save() {
    let res = this.campaignService.save(this.campaign)
    this.campaign = res;
    this.campaignName = res.name;
    this.editing = false;
  }

}
