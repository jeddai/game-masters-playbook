import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from './../../../_services/state.service';
import { CampaignService } from './../../../_services/campaign.service';

@Component({
  selector: 'app-delete-campaign',
  templateUrl: './delete-campaign.component.html',
  styleUrls: ['./delete-campaign.component.scss']
})
export class DeleteCampaignComponent implements OnInit {

  name: string;

  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private state: StateService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
  }

  delete() {
    this.campaignService.deleteCampaign(this.name)
    .subscribe(res => {
      this.cancel();
    });
  }

  cancel() {
    this.state.setTab({
      subtitle: '',
      route: [ '/campaigns', { outlets: { out: 'all-campaigns' } } ]
    });
  }
}
