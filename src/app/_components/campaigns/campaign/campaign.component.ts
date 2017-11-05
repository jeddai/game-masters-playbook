import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from './../../../_services/state.service';
import { CampaignService } from './../../../_services/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  campaign: any = {};

  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private state: StateService) { }

  ngOnInit() {
    let cid = this.route.snapshot.paramMap.get('name');
    this.campaignService.getCampaign(cid)
    .subscribe(campaign => {
      this.campaign = campaign;
    });
  }

}
