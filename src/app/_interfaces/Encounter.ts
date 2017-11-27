import { Monster, Player } from '../_interfaces';

export interface Encounter {
  name: String
  description: String
  players?: (String[]|Player[])
  monsters?: (String[]|Monster[])
  xp: Number
  difficulty: String
}