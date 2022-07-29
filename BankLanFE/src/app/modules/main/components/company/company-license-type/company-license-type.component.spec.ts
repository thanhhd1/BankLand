import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLicenseTypeComponent } from './company-license-type.component';

describe('CompanyLicenseTypeComponent', () => {
  let component: CompanyLicenseTypeComponent;
  let fixture: ComponentFixture<CompanyLicenseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLicenseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLicenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
