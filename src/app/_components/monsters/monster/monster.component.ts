import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Monster } from '../../../_interfaces';
import { MonsterService, StateService } from './../../../_services';
import * as _ from 'lodash';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss']
})
export class MonsterComponent implements OnInit {

  constructor(private state: StateService, private monsterService: MonsterService, private route: ActivatedRoute) { }

  _ = _;
  name: string
  monster: Monster
  abilityScores: any[] = [{
    label: 'STR',
    name: 'strength'
  }, {
    label: 'DEX',
    name: 'dexterity'
  }, {
    label: 'CON',
    name: 'constitution'
  }, {
    label: 'INT',
    name: 'intelligence'
  }, {
    label: 'WIS',
    name: 'wisdom'
  }, {
    label: 'CHA',
    name: 'charisma'
  }]
  abilities: any[]

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.monster = this.monsterService.get(this.name);
    this.state.onRouteChange(() => {
      this.name = this.route.snapshot.paramMap.get('name');
      this.monster = this.monsterService.get(this.name);
    });
    
    this.abilities = [{
      name: 'Special Abilities', 
      value: this.monster.special_abilities
    }, {
      name: 'Actions', 
      value: this.monster.actions
    }, {
      name: 'Legendary Actions',
      value: this.monster.legendary_actions
    }];
  }

  delete() {
    this.state.setTab({
      route: ['/monsters', { outlets: { out: `${this.name}/delete` } } ],
      subtitle: `Delete ${this.name}`
    });
  }

  getAbilityScoreModifier(ability_score: string) {
    let mod = Math.floor((this.monster.ability_scores[ability_score] - 10) / 2);
    return {
      string: `${this.monster.ability_scores[ability_score]} (${ mod >= 0 ? '+' : '' }${mod})`,
      value: mod
    }
  }

  getChallengeRating(): string {
    if(this.monster.challenge === 0.5) return '1/2';
    if(this.monster.challenge === 0.25) return '1/4';
    if(this.monster.challenge === 0.125) return '1/8';
    return `${this.monster.challenge}`
  }

  getHP(): string {
    let rolled = Math.ceil(((this.getHitDie() / 2) + 0.5) * this.monster.hit_points);
    let con = this.monster.hit_points * this.getAbilityScoreModifier('constitution').value;
    let str = `${rolled + con} (${this.monster.hit_points}d${this.getHitDie()}`;
    if(con !== 0) str += `${getNumberWithPlus(con)}`;
    str += ')';
    return str;
  }

  getHitDie(): number {
    if(this.monster.size === 'tiny') return 4;
    if(this.monster.size === 'small') return 6;
    if(this.monster.size === 'medium') return 8;
    if(this.monster.size === 'large') return 10;
    if(this.monster.size === 'huge') return 12;
    if(this.monster.size === 'gargantuan') return 20;
  }

  stats(): any[] {
    if(!this.monster) return [];
    let abilities: any[] = [];
    let stats: any = {}
    let names = {
      'saving_throws': 'Saving Throws',
      'skills': 'Skills',
      'damage_vulnerabilities': 'Damage Vulnerabilities',
      'damage_resistances': 'Damage Resistances',
      'damage_immunities': 'Damage Immunities',
      'condition_immunities': 'Condition Immunities',
      'senses': 'Senses',
      'languages': 'Languages'
    }
    _.forEach(this.monster.saving_throws, (value, key) => {
      if(value && !stats.saving_throws) stats.saving_throws = '';
      if(value) stats.saving_throws += `${_.capitalize(key)} ${getNumberWithPlus(value)}; `;
    });
    
    _.forEach(this.monster.skills, (value, key) => {
      if(value && !stats.skills) stats.skills = '';
      if(value) stats.skills += `${_.capitalize(key)} ${getNumberWithPlus(value)}; `;
    });

    stats.damage_vulnerabilities = this.monster.damage_vulnerabilities;
    stats.damage_resistances = this.monster.damage_resistances;
    stats.damage_immunities = this.monster.damage_immunities;
    stats.condition_immunities = this.monster.condition_immunities;
    stats.senses = this.monster.senses;
    stats.languages = this.monster.languages;

    _.forEach(stats, (value, key) => {
      if(value) {
        abilities.push({
          name: names[key],
          value: value
        });
      }
    });
    return abilities;
  }
}

function getNumberWithPlus(num: number): string {
  return num > 0 ? `+${num}` : ``;
}