import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetLicenseTypeComponent } from './internet-license-type.component';

describe('InternetLicenseTypeComponent', () => {
  let component: InternetLicenseTypeComponent;
  let fixture: ComponentFixture<InternetLicenseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetLicenseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetLicenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
