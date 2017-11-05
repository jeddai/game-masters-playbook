import * as _ from 'lodash';

import { IMonsterAbility, IMonsterAction } from '../_interfaces';
import { AbilityScores, Skills } from '../_classes';

export interface IMonster {
  name: string
  size: string
  type: string
  subtype: string
  alignment: string
  armor_class: number
  hit_points: number
  current_hit_points: number
  speed: string
  ability_scores: AbilityScores
  saving_throws: AbilityScores
  skills: Skills
  damage_vulnerabilities: string
  damage_resistances: string
  damage_immunities: string
  condition_immunities: string
  senses: string
  languages: string
  challenge: string
  special_abilities: IMonsterAbility[]
  actions: IMonsterAction[]
  legendary_actions: IMonsterAbility[]
  initiative: number
  from: string
}
