import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { NgxElectronModule } from 'ngx-electron';
import { TagInputModule } from 'ngx-chips';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './_routing/app-routing.module';

import { CampaignService, MonsterService, NpcService, SessionService, SettingsService, StateService } from './_services';
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
import { NpcComponent } from './_components/npc/npc.component';
import { SessionComponent } from './_components/sessions/session/session.component';
import { NotesComponent } from './_components/notes/notes.component';
import { CreditsComponent } from './_components/credits/credits.component';
import { NewMonsterComponent } from './_components/monsters/new-monster/new-monster.component';
import { DeleteMonsterComponent } from './_components/monsters/delete-monster/delete-monster.component';
import { MonsterComponent } from './_components/monsters/monster/monster.component';
import { ImportMonstersComponent } from './_components/monsters/import-monsters/import-monsters.component';

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
    DeleteCampaignComponent,
    NpcComponent,
    SessionComponent,
    NotesComponent,
    CreditsComponent,
    NewMonsterComponent,
    DeleteMonsterComponent,
    MonsterComponent,
    ImportMonstersComponent
  ],
  imports: [
    AceEditorModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MarkdownModule.forRoot(),
    NgbModule.forRoot(),
    NgxElectronModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  providers: [
    CampaignService,
    MonsterService,
    NpcService,
    SessionService,
    StateService,
    SettingsService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
