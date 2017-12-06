import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterService, StateService } from './../../../_services';

@Component({
  selector: 'app-delete-monster',
  templateUrl: './delete-monster.component.html',
  styleUrls: ['./delete-monster.component.scss']
})
export class DeleteMonsterComponent implements OnInit {

  constructor(private state: StateService, private monsterService: MonsterService, private route: ActivatedRoute) { }

  name: string;

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
  }

  delete() {
    this.monsterService.delete(this.name);
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: null } } ],
      subtitle: null
    });
  }

  cancel() {
    this.state.setTab({
      route: [ '/monsters', { outlets: { out: this.name } } ],
      subtitle: this.name
    });
  }

}
