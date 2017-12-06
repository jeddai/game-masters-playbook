import { Component, NgZone, OnInit } from '@angular/core';
import { SettingsService, StateService } from './_services';
import { ElectronService } from 'ngx-electron';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private state: StateService, 
    private settingsService: SettingsService,
    private electron: ElectronService, 
    private zone: NgZone) { }
    
  theme: string = this.settingsService.getTheme();
  playbookItems = [{
    name: 'Campaigns',
    route: ['/campaigns', { outlets: { out: 'all-campaigns' } } ],
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
    name: 'Credits',
    route: ['/credits'],
    icon: 'fa-film',
    if: () => {
      return true;
    }
  }, {
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

  ngOnInit(): void {
    if(!this.state.getTabs()) {
      this.state.setTabs([{
        name: 'Welcome',
        route: ['/welcome'],
        icon: 'fa-university'
      }]);
      this.state.selectTab(0);
    }

    this.initializeShortcuts();
  }

  initializeShortcuts() {
    this.electron.ipcRenderer.on('new-campaign', () => {
      this.zone.run(() => {
        this.state.selectItem({
          name: 'Campaigns',
          route: [ '/campaigns', { outlets: { out: 'new-campaign' } } ],
          subtitle: 'New Campaign',
          icon: 'fa-cube'
        });
      });
    });

    this.electron.ipcRenderer.on('new-tab', () => {
      this.zone.run(() => {
        this.state.addTab();
      });
    });

    this.electron.ipcRenderer.on('tab-left', () => {
      this.zone.run(() => {
        this.state.selectTab(null, -1);
      });
    });

    this.electron.ipcRenderer.on('tab-right', () => {
      this.zone.run(() => {
        this.state.selectTab(null, 1);
      });
    });
  }
}
