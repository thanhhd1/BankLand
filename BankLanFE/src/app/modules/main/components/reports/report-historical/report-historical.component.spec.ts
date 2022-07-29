import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHistoricalComponent } from './report-historical.component';

describe('ReportHistoricalComponent', () => {
  let component: ReportHistoricalComponent;
  let fixture: ComponentFixture<ReportHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHistoricalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
