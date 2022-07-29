import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCulturalServicesComponent } from './report-cultural-services.component';

describe('ReportCulturalServicesComponent', () => {
  let component: ReportCulturalServicesComponent;
  let fixture: ComponentFixture<ReportCulturalServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCulturalServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCulturalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
