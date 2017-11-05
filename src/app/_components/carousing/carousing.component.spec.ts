import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousingComponent } from './carousing.component';

describe('CarousingComponent', () => {
  let component: CarousingComponent;
  let fixture: ComponentFixture<CarousingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
