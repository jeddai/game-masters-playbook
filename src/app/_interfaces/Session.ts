import { Encounter } from '../_interfaces';

export interface Session {
  _id: String
  name: String
  encounters?: (String[]|Encounter[])
  notes: String
}