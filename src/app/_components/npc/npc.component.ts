import { Component, Input, OnInit } from '@angular/core';
import { NpcService } from './../../_services/npc.service';
import { NPC } from './../../_interfaces';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {

  @Input() name: String
  info: NPC = {} as NPC

  constructor(private npc: NpcService) { }

  ngOnInit() {
    this.npc.get(name)
    .subscribe(npc => {
      console.log(npc);
      this.info = npc;
    });
  }

}
