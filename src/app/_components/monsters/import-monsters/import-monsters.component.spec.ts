import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMonstersComponent } from './import-monsters.component';

describe('ImportMonstersComponent', () => {
  let component: ImportMonstersComponent;
  let fixture: ComponentFixture<ImportMonstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportMonstersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMonstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
