import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMonsterComponent } from './delete-monster.component';

describe('DeleteMonsterComponent', () => {
  let component: DeleteMonsterComponent;
  let fixture: ComponentFixture<DeleteMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
