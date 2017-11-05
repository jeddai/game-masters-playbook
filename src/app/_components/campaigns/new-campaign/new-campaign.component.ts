import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';

import { CampaignService, StateService } from '../../../_services';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, OnDestroy {

  constructor(private campaignService: CampaignService, private state: StateService) { }

  campaigns;
  campaign: any = {};
  campaignForm: FormGroup;

  ngOnInit() {
    this.campaignForm = new FormGroup({
      'name': new FormControl(this.campaign.name, [
        Validators.required,
        this.isInvalidName()
      ]),
      'description': new FormControl(this.campaign.description, []),
      'image': new FormControl(this.campaign.image)
    });

    let state = this.state.getState();
    this.campaignForm.setValue(state || {
      name: '',
      description: '',
      image: ''
    });

    this.campaignService.getCampaigns()
    .subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  ngOnDestroy() {
    this.campaign = this.campaignForm.value;
    if(this.campaign.name)
      this.state.setTab({
        state: _.cloneDeep(this.campaign)
      });
  }

  submit() {
    if(!this.campaignForm.invalid) {
      this.campaign = this.campaignForm.value;
      this.campaignService.addCampaign(_.cloneDeep(this.campaign));
      this.state.setTab({
        route: [ '/campaigns', { outlets: { out: 'all-campaigns' } } ],
        subtitle: ''
      });
    }
  }

  isInvalidName(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let filtered = _.filter(this.campaigns, c => {
        return c.name === control.value;
      });
      return !!filtered.length ? { 'isInvalidName': { value: control.value}} : null;
    }
  }

  get name() { return this.campaignForm.get('name') }
  get description() { return this.campaignForm.get('description') }
  get image() { return this.campaignForm.get('image') }
}