import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './_routing/app-routing.module';

import { CampaignService } from './_services/campaign.service';
import { MonsterService } from './_services/monster.service';
import { StateService } from './_services/state.service';
import { WelcomeComponent } from './_components/welcome/welcome.component';
import { CampaignsComponent } from './_components/campaigns/campaigns.component';
import { CarousingComponent } from './_components/carousing/carousing.component';
import { CombatComponent } from './_components/combat/combat.component';
import { MonstersComponent } from './_components/monsters/monsters.component';
import { SessionsComponent } from './_components/sessions/sessions.component';
import { LoginComponent } from './_components/login/login.component';
import { SettingsComponent } from './_components/settings/settings.component';
import { NewCampaignComponent } from './_components/campaigns/new-campaign/new-campaign.component';
import { AllCampaignsComponent } from './_components/campaigns/all-campaigns/all-campaigns.component';
import { CampaignComponent } from './_components/campaigns/campaign/campaign.component';
import { DeleteCampaignComponent } from './_components/campaigns/delete-campaign/delete-campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CampaignsComponent,
    CarousingComponent,
    CombatComponent,
    MonstersComponent,
    SessionsComponent,
    LoginComponent,
    SettingsComponent,
    NewCampaignComponent,
    AllCampaignsComponent,
    CampaignComponent,
    DeleteCampaignComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CampaignService,
    MonsterService,
    StateService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
