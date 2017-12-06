import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';

import { Monster } from '../../../_interfaces';
import { MonsterService, StateService } from '../../../_services';

@Component({
  selector: 'app-new-monster',
  templateUrl: './new-monster.component.html',
  styleUrls: ['./new-monster.component.scss']
})
export class NewMonsterComponent implements OnInit {

  constructor(private state: StateService, private monsterService: MonsterService, private formBuilder: FormBuilder) { }

  monster: Monster = {
    name: '',
    size: '',
    type: '',
    subtype: '',
    alignment: '',
    armor_class: null,
    hit_points: null,
    speed: '',
    ability_scores: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    saving_throws: {
      strength: null,
      dexterity: null,
      constitution: null,
      intelligence: null,
      wisdom: null,
      charisma: null,
    },
    skills: {
      athletics: null,
      acrobatics: null,
      sleight_of_hand: null,
      stealth: null,
      demolitions: null,
      history: null,
      investigation: null,
      nature: null,
      religion: null,
      repair: null,
      security: null,
      arcana: null,
      animal_handling: null,
      insight: null,
      medicine: null,
      perception: null,
      survival: null,
      deception: null,
      intimidation: null,
      performance: null,
      persuasion: null
    },
    damage_vulnerabilities: '',
    damage_resistances: '',
    damage_immunities: '',
    condition_immunities: '',
    senses: '',
    languages: '',
    challenge: null,
    special_abilities: [],
    actions: [],
    legendary_actions: [],
    from: '',
    tags: []
  } as Monster;
  monsters: Monster[];
  monsterForm: FormGroup;

  ngOnInit() {
    this.monsterForm = this.formBuilder.group({
      'name': new FormControl(this.monster.name, [
        Validators.required,
        this.isInvalidName()
      ]),
      'size': new FormControl(this.monster.size, [
        Validators.required
      ]),
      'type': new FormControl(this.monster.type),
      'subtype': new FormControl(this.monster.subtype),
      'alignment': new FormControl(this.monster.alignment),
      'armor_class': new FormControl(this.monster.armor_class, [
        Validators.required
      ]),
      'hit_points': new FormControl(this.monster.hit_points, [
        Validators.required
      ]),
      'ability_scores': this.formBuilder.group({
        'strength': new FormControl(this.monster.ability_scores.strength, [ Validators.required ]),
        'dexterity': new FormControl(this.monster.ability_scores.dexterity, [ Validators.required ]),
        'constitution': new FormControl(this.monster.ability_scores.constitution, [ Validators.required ]),
        'intelligence': new FormControl(this.monster.ability_scores.intelligence, [ Validators.required ]),
        'wisdom': new FormControl(this.monster.ability_scores.wisdom, [ Validators.required ]),
        'charisma': new FormControl(this.monster.ability_scores.charisma, [ Validators.required ])
      }),
      'speed': new FormControl(this.monster.speed),
      'saving_throws': new FormControl(this.monster.saving_throws),
      'skills': new FormControl(this.monster.skills),
      'damage_vulnerabilities': new FormControl(this.monster.damage_vulnerabilities),
      'damage_resistances': new FormControl(this.monster.damage_resistances),
      'damage_immunities': new FormControl(this.monster.damage_immunities),
      'condition_immunities': new FormControl(this.monster.condition_immunities),
      'senses': new FormControl(this.monster.senses),
      'languages': new FormControl(this.monster.languages),
      'challenge': new FormControl(this.monster.challenge, [
        Validators.required
      ]),
      'special_abilities': new FormControl(this.monster.special_abilities),
      'actions': new FormControl(this.monster.actions),
      'legendary_actions': new FormControl(this.monster.legendary_actions),
      'from': new FormControl(this.monster.from),
      'tags': new FormControl(this.monster.tags)
    });

    let state = this.state.getState() as Monster;
    this.monsterForm.patchValue(!!state ? state : {} as Monster);

    this.monsters = this.monsterService.getAll();
  }

  save() {
    this.monster = _.cloneDeep(this.monsterForm.value);
    this.monsterService.save(this.monster);
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: null } } ],
      subtitle: null
    });
  }

  isInvalidName(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let filtered = _.filter(this.monsters, m => {
        return m.name === control.value;
      });
      return !!filtered.length ? { 'isInvalidName': { value: control.value}} : null;
    }
  }

  get name() { return this.monsterForm.get('name') }
  get size() { return this.monsterForm.get('size') }
  get armor_class() { return this.monsterForm.get('armor_class') }
  get hit_points() { return this.monsterForm.get('hit_points') }
  get challenge() { return this.monsterForm.get('challenge') }
}
