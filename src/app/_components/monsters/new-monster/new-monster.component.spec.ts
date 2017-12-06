import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMonsterComponent } from './new-monster.component';

describe('NewMonsterComponent', () => {
  let component: NewMonsterComponent;
  let fixture: ComponentFixture<NewMonsterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMonsterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
