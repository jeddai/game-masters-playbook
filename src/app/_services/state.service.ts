import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable()
export class StateService {

  constructor(private router: Router) {}

  private tabs;
  private selectedTab: number = 0;
  public previouslySelectedTab: number = 0;

  private navigate(index?): void {
    if(index && this.tabs[index].route)
      this.router.navigate(this.tabs[index].route);
    else this.router.navigate(this.tabs[this.selectedTab].route);
  }

  public getState() {
    return this.tabs[this.selectedTab].state;
  }

  public setState(state, index?) {
    if(index !== undefined)
      this.tabs[index].state = state;
    else 
      this.tabs[this.selectedTab].state = state;
  }

  public addTab(): void {
    if(this.tabs.length <= 6) {
      this.tabs.push({ 
        name: 'Welcome',
        route: ['/welcome'],
        icon: 'fa-university'
      });
      this.selectTab(this.tabs.length - 1);
    }
  }

  public removeTab(index): void {
    if(this.tabs.length > 1) {
      this.tabs.splice(index, 1);
      if((this.selectedTab === index || this.tabs.length - 2 === index) && this.selectedTab - 1 >= 0)
        this.selectTab(this.selectedTab - 1);
    }
  }

  public activeTab(index): boolean {
    return this.selectedTab === index;
  }

  public selectTab(index, direction?): void {
    this.previouslySelectedTab = this.selectedTab;
    if(direction) {
      if(this.tabs.length === 1) return;
      if(direction === 1) this.selectedTab += 1;
      else this.selectedTab -= 1;
      if(this.selectedTab >= this.tabs.length) this.selectedTab = 0;
      else if(this.selectedTab < 0) this.selectedTab = this.tabs.length - 1;
    } else {
      this.selectedTab = index;
    }
    this.navigate();
  }

  public activeItem(item) {
    try {
      let bool = this.tabs[this.selectedTab].name === item.name;
      return bool;
    } catch(e) { return false; }
  }

  public selectItem(item) {
    this.tabs[this.selectedTab] = _.cloneDeep(item);
    this.navigate();
  }

  public getTab(index?: number): any {
    if(index !== undefined) return this.tabs[index];
    return this.tabs[this.selectedTab];
  }

  public setTab(tab, index?) {
    if(index !== undefined)
      Object.assign(this.tabs[index], tab);
    else 
      Object.assign(this.tabs[this.selectedTab], tab);
    this.navigate();
  }

  public getTabs(): any[] {
    return this.tabs;
  }

  public setTabs(tabs) {
    this.tabs = tabs;
  }

  public onRouteChange(callback: Function) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd)
        callback();
    });
  }
}
