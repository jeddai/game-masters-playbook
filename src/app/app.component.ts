import { Component, OnInit } from '@angular/core';
import { StateService } from './_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  playbookItems = [{
    name: 'Campaigns',
    route: ['/campaigns', { outlets: { out: ['all-campaigns'] } }],
    icon: 'fa-cube'
  }, {
    name: 'Carousing',
    route: ['/carousing'],
    icon: 'fa-beer'
  }, {
    name: 'Combat',
    route: ['/combat'],
    icon: 'fa-shield-alt'
  }, {
    name: 'Monsters',
    route: ['/monsters'],
    icon: 'fa-child'
  }, {
    name: 'Sessions',
    route: ['/sessions'],
    icon: 'fa-cubes'
  }];
  settingsItems = [{
    name: 'Settings',
    route: ['/settings'],
    icon: 'fa-cog',
    if: () => {
      return true;
    }
  }, {
    name: 'Login',
    route: ['/login'],
    icon: 'fa-sign-in',
    if: () => {
      return true;
    }
  }, {
    name: 'Logout',
    route: ['/login'],
    icon: 'fa-sign-out',
    if: () => {
      return false;
    }
  }];

  constructor(public state: StateService){}

  ngOnInit(): void {
    if(!this.state.tabs) {
      this.state.tabs = [{
        name: 'Welcome',
        route: ['/welcome'],
        icon: 'fa-university'
      }];
      this.state.selectedTab = 0;
      this.state.navigate(0);
    }
  }
}
