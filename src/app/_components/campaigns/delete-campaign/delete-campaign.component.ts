import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService, StateService } from './../../../_services';
import { Campaign } from '../../../_interfaces';

@Component({
  selector: 'app-delete-campaign',
  templateUrl: './delete-campaign.component.html',
  styleUrls: ['./delete-campaign.component.scss']
})
export class DeleteCampaignComponent implements OnInit {

  name: string;

  constructor(private route: ActivatedRoute, private state: StateService, private campaignService: CampaignService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
  }

  delete() {
    this.campaignService.delete(this.name)
    .subscribe(() => {
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
