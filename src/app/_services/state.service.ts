import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class StateService {

  constructor(private router: Router) {}

  tabs;
  selectedTab: number = -1;
  previouslySelectedTab: number = 0;

  getState() {
    return this.tabs[this.selectedTab].state;
  }

  navigate(index?): void {
    if(index && this.tabs[index].route)
      this.router.navigate(this.tabs[index].route);
    else this.router.navigate(this.tabs[this.selectedTab].route);
  }

  addTab(): void {
    if(this.tabs.length <= 6) {
      this.tabs.push({ 
        name: 'Welcome',
        route: ['/welcome'],
        icon: 'fa-university'
      });
      this.selectTab(this.tabs.length - 1);
    }
  }

  removeTab(index): void {
    if(this.tabs.length > 1) {
      this.tabs.splice(index, 1);
      if((this.selectedTab === index || this.tabs.length - 2 === index) && this.selectedTab - 1 >= 0)
        this.selectTab(this.selectedTab - 1);
    }
  }

  activeTab(index): boolean {
    return this.selectedTab === index;
  }

  public selectTab(index, direction?): void {
    this.previouslySelectedTab = this.selectedTab;
    if(direction) {
      if(direction === 1) this.selectedTab += 1;
      else this.selectedTab -= 1;
      if(this.selectedTab >= this.tabs.length) this.selectedTab = 0;
      else if(this.selectedTab < 0) this.selectedTab = this.tabs.length - 1;
    }
    this.selectedTab = index;
    this.navigate();
    console.log(this.tabs[this.selectedTab]);
  }

  activeItem(item) {
    try {
      let bool = this.tabs[this.selectedTab].name === item.name;
      return bool;
    } catch(e) { return false; }
  }

  selectItem(item) {
    this.tabs[this.selectedTab] = _.cloneDeep(item);
    this.navigate();
  }

  setTab(tab, index?) {
    if(index !== undefined)
      this.tabs[index] = Object.assign(this.tabs[index], tab);
    else 
      this.tabs[this.selectedTab] = Object.assign(this.tabs[this.selectedTab], tab);
    this.navigate();
  }
}
