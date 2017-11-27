import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Campaign, Session } from '../../../_interfaces';
import { CampaignService, StateService } from '../../../_services';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
})
export class NewCampaignComponent implements OnInit, OnDestroy {

  constructor(private state: StateService, private campaignService: CampaignService) { }

  campaigns: Campaign[];
  campaign: Campaign = {} as Campaign;
  campaignForm: FormGroup;
  session: String;
  player: String;

  sessions: any[];
  players: any[];
  npcs: any[];

  ngOnInit() {
    this.campaignForm = new FormGroup({
      'name': new FormControl(this.campaign.name, [
        Validators.required,
        this.isInvalidName()
      ]),
      'description': new FormControl(this.campaign.description)
    });

    let state = this.state.getState() as Campaign;
    this.campaignForm.patchValue(!!state ? state : {} as Campaign);

    this.campaignService.getAll()
    .subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }

  ngOnDestroy() {
    this.campaign = this.campaignForm.value;
    if(this.campaign.name)
      this.state.setTab({
        state: _.cloneDeep(this.campaign)
      }, this.state.previouslySelectedTab);
  }

  submit() {
    if(!this.campaignForm.invalid) {
      this.campaign = _.cloneDeep(this.campaignForm.value);
      this.campaignService.save(this.campaign)
      .subscribe(() => {
        this.state.setTab({
          route: [ '/campaigns', { outlets: { out: 'all-campaigns' } } ],
          subtitle: ''
        });
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

  querySessions(text$: Observable<String>) {
    return text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(query => query.length < 3 ? []
      : _.take(_.filter(this.sessions, s => _.includes(_.toLower(s.name), _.toLower(query))), 10));
  }

  queryPlayers(text$: Observable<String>) {
    return text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(query => query.length < 3 ? []
      : _.take(_.filter(this.players, s => _.includes(_.toLower(s.name), _.toLower(query))), 10));
  }

  queryNPCs(text$: Observable<String>) {
    return text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(query => query.length < 3 ? []
      : _.take(_.filter(this.npcs, s => _.includes(_.toLower(s.name), _.toLower(query))), 10));
  }

  formatForName = (x: {name: string}) => x.name || '';

  duplicate(formItem: string, value: string): boolean {
    return _.includes(this.campaignForm.controls[formItem].value, value) || !value;
  }

  add(formItem: string, value: string) {
    let arr: String[] = this.campaignForm.controls[formItem].value;
    if(!_.includes(arr, value))
      arr.push(value);
    this.campaignForm.controls[formItem].setValue(arr);
  }

  remove(formItem: string, value: string) {
    let arr: String[] = this.campaignForm.controls[formItem].value;
    arr = _.filter(arr, i => {
      return i !== value;
    });
    this.campaignForm.controls[formItem].setValue(arr);
  }

  get name() { return this.campaignForm.get('name') }
  get description() { return this.campaignForm.get('description') }
  get image() { return this.campaignForm.get('image') }
}