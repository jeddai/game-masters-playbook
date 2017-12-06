import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from '../_components/welcome/welcome.component';
import { CampaignsComponent } from '../_components/campaigns/campaigns.component';
import { CarousingComponent } from '../_components/carousing/carousing.component';
import { CombatComponent } from '../_components/combat/combat.component';
import { CreditsComponent } from './../_components/credits/credits.component';
import { MonstersComponent } from '../_components/monsters/monsters.component';
import { SessionsComponent } from '../_components/sessions/sessions.component';
import { LoginComponent } from '../_components/login/login.component';
import { SettingsComponent } from '../_components/settings/settings.component';
import { NewCampaignComponent } from '../_components/campaigns/new-campaign/new-campaign.component';
import { AllCampaignsComponent } from '../_components/campaigns/all-campaigns/all-campaigns.component';
import { CampaignComponent } from '../_components/campaigns/campaign/campaign.component';
import { DeleteCampaignComponent } from './../_components/campaigns/delete-campaign/delete-campaign.component';
import { MonsterComponent } from './../_components/monsters/monster/monster.component';
import { NewMonsterComponent } from './../_components/monsters/new-monster/new-monster.component';
import { DeleteMonsterComponent } from './../_components/monsters/delete-monster/delete-monster.component';
import { ImportMonstersComponent } from '../_components/monsters/import-monsters/import-monsters.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'campaigns', component: CampaignsComponent, children: [
    { path: 'all-campaigns', component: AllCampaignsComponent, outlet: 'out' },
    { path: 'new-campaign', component: NewCampaignComponent, outlet: 'out' },
    { path: ':name', component: CampaignComponent, outlet: 'out' },
    { path: ':name/delete', component: DeleteCampaignComponent, outlet: 'out' }
  ] },
  { path: 'carousing', component: CarousingComponent },
  { path: 'combat', component: CombatComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'monsters', component: MonstersComponent, children: [
    { path: 'new-monster', component: NewMonsterComponent, outlet: 'out' },
    { path: 'import', component: ImportMonstersComponent, outlet: 'out' },
    { path: ':name', component: MonsterComponent, outlet: 'out' },
    { path: ':name/delete', component: DeleteMonsterComponent, outlet: 'out' }
  ] },
  { path: 'sessions', component: SessionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}