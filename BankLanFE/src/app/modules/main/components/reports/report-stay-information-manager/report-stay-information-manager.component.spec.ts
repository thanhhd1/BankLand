import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStayInformationManagerComponent } from './report-stay-information-manager.component';

describe('ReportStayInformationManagerComponent', () => {
  let component: ReportStayInformationManagerComponent;
  let fixture: ComponentFixture<ReportStayInformationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStayInformationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStayInformationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
