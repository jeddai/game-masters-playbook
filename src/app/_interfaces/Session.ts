import { Encounter } from '../_interfaces';

export interface Session {
  name: String
  encounters?: (String[]|Encounter[])
  notes: String
}