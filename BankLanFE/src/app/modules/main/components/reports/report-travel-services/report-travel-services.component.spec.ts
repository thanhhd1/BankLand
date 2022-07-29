import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTravelServicesComponent } from './report-travel-services.component';

describe('ReportTravelServicesComponent', () => {
  let component: ReportTravelServicesComponent;
  let fixture: ComponentFixture<ReportTravelServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTravelServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTravelServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
