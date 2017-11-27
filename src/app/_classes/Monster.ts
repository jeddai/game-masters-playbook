// import * as _ from 'lodash';

// import { Monster, MonsterAbility, IMonsterAction } from '../_interfaces';
// import { AbilityScores, Skills } from '../_classes';

// export class Monster implements Monster {
//   constructor() {
//     this.name = '';
//     this.size = '';
//     this.type = '';
//     this.alignment = '';
//     this.armor_class = null;
//     this.hit_points = null;
//     this.speed = '';
//     this.ability_scores = new AbilityScores();
//     this.saving_throws = new AbilityScores();
//     this.skills = new Skills();
//     this.damage_vulnerabilities = '';
//     this.damage_resistances = '';
//     this.damage_immunities = '';
//     this.condition_immunities = '';
//     this.senses = '';
//     this.languages = '';
//     this.challenge = '';
//     this.special_abilities = [];
//     this.actions = [];
//     this.legendary_actions = [];
//     this.from = '';
//   }

//   name: string
//   size: string
//   type: string
//   subtype: string
//   alignment: string
//   armor_class: number
//   hit_points: number
//   current_hit_points: number
//   speed: string
//   ability_scores: AbilityScores
//   saving_throws: AbilityScores
//   skills: Skills
//   damage_vulnerabilities: string
//   damage_resistances: string
//   damage_immunities: string
//   condition_immunities: string
//   senses: string
//   languages: string
//   challenge: string
//   special_abilities: MonsterAbility[]
//   actions: IMonsterAction[]
//   legendary_actions: MonsterAbility[]
//   initiative: number
//   from: string

//   public set(monster: Monster): Monster {
//     _.forIn(monster, function(value, key) {
//       this[key] = monster[key];
//     });
//     this.ability_scores = AbilityScores.ParseScores(this.ability_scores);
//     this.saving_throws = AbilityScores.ParseScores(this.saving_throws);
//     this.skills = Skills.ParseSkills(this.skills);
//     return this;
//   }

//   public static MakeMonster(monster: any): Monster {
//     let newMonster: Monster = new Monster();
//     _.forIn(newMonster, function(value, key) {
//       newMonster[key] = monster[key];
//     });
//     newMonster.ability_scores = AbilityScores.ParseScores(newMonster.ability_scores);
//     newMonster.saving_throws = AbilityScores.ParseScores(newMonster.saving_throws);
//     newMonster.skills = Skills.ParseSkills(newMonster.skills);
//     return newMonster;
//   }

//   public static SetMonsterFromSRD(obj: any): Monster {
//     let monster: Monster = <Monster>{};
//     monster.name = obj.name;
//     monster.size = _.lowerCase(obj.size);
//     monster.type = obj.type;
//     monster.subtype = obj.subtype;
//     monster.alignment = obj.alignment;
//     monster.armor_class = obj.armor_class;
//     monster.hit_points = obj.hit_dice.slice(0, obj.hit_dice.indexOf('d'));
//     monster.speed = obj.speed;
//     monster.ability_scores = AbilityScores.MakeScores(obj.strength, obj.dexterity, obj.constitution, obj.intelligence, obj.wisdom, obj.charisma);
//     monster.saving_throws = AbilityScores.MakeScores(
//       !!obj.strength_save ? obj.strength_save : null,
//       !!obj.dexterity_save ? obj.dexterity_save : null,
//       !!obj.constitution_save ? obj.constitution_save : null,
//       !!obj.intelligence_save ? obj.intelligence_save : null,
//       !!obj.wisdom_save ? obj.wisdom_save : null,
//       !!obj.charisma_save ? obj.charisma_save : null,
//     );
//     monster.skills = new Skills();
//     for(let key in monster.skills) {
//       monster.skills[key] = !!obj[key] ? obj[key] : null;
//     }
//     monster.damage_vulnerabilities = obj.damage_vulnerabilities;
//     monster.damage_resistances = obj.damage_resistances;
//     monster.damage_immunities = obj.damage_immunities;
//     monster.condition_immunities = obj.condition_immunities;
//     monster.senses = obj.senses;
//     monster.languages = obj.languages;
//     monster.challenge = obj.challenge_rating;
//     monster.special_abilities = obj.special_abilities;
//     monster.actions = obj.actions;
//     monster.legendary_actions = obj.legendary_actions;
//     return monster;
//   }

//   public static IsMonster(obj): boolean {
//     return obj.hasOwnProperty('ability_scores');
//   }
// }
