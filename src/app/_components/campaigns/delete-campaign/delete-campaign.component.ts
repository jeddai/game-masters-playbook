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

  id: string;

  constructor(private route: ActivatedRoute, private state: StateService, private campaignService: CampaignService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  delete() {
    this.campaignService.delete(this.id)
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
