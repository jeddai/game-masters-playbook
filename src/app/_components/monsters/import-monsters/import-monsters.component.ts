import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService, MonsterService } from '../../../_services';

const emptyMonster = `{
  "name": "",
  "size": "", // [tiny, small, medium, large, huge, gargantuan] - must be one of, determines hit die
  "type": "",
  "subtype": "",
  "alignment": "",
  "armor_class": null, // Number
  "hit_points": null, // Number of dice to roll, not calculated HP
  "speed": "",
  "ability_scores": { // Numbers
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
  },
  "saving_throws": { // Numbers
    "strength": null,
    "dexterity": null,
    "constitution": null,
    "intelligence": null,
    "wisdom": null,
    "charisma": null,
  },
  "skills": { // Numbers, should include proficiency bonus
    "athletics": null,
    "acrobatics": null,
    "sleight_of_hand": null,
    "stealth": null,
    "demolitions": null, // For my Star Wars handbook, leave null unless you want to use it
    "history": null,
    "investigation": null,
    "nature": null,
    "religion": null,
    "repair": null,
    "security": null, // For my Star Wars handbook, leave null unless you want to use it
    "arcana": null,
    "animal_handling": null,
    "insight": null,
    "medicine": null,
    "perception": null,
    "survival": null,
    "deception": null,
    "intimidation": null,
    "performance": null,
    "persuasion": null
  },
  "damage_vulnerabilities": "",
  "damage_resistances": "",
  "damage_immunities": "",
  "condition_immunities": "",
  "senses": "",
  "languages": "",
  "challenge": null,
  "special_abilities": [{ // Passive abilities
    "name": "",
    "desc": "",
    "attack_bonus": 0
  }],
  "actions": [{ // Attacks, spells, multiattack
    "name": "",
    "desc": "",
    "attack_bonus": 0,
    "damage_dice": "",
    "damage_bonus": 0
  }],
  "legendary_actions": [{ // Legendary actions
    "name": "",
    "desc": "",
    "attack_bonus": 0
  }],
  "from": ""
}`

@Component({
  selector: 'app-import-monsters',
  templateUrl: './import-monsters.component.html',
  styleUrls: ['./import-monsters.component.scss']
})
export class ImportMonstersComponent implements OnInit {

  constructor(private state: StateService, private monsterService: MonsterService) { }

  monsters: string = `[${emptyMonster}]`
  @ViewChild('editor') editor;

  ngOnInit() {

  }

  addMonsterJSON() {
    this.monsters = this.monsters.replace(new RegExp(/]$/), `, ${emptyMonster}]`);
  }

  save() {
    this.monsterService.import(JSON.parse(this.monsters));
    this.cancel();
  }

  cancel() {
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: null } } ],
      subtitle: null
    });
  }

}
