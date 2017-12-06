import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../../_services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    
  }

  setTheme(name: string) {
    this.settingsService.setTheme(name);
  }

}
