import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeLicenseTypeComponent } from './karaoke-license-type.component';

describe('KaraokeLicenseTypeComponent', () => {
  let component: KaraokeLicenseTypeComponent;
  let fixture: ComponentFixture<KaraokeLicenseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaraokeLicenseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeLicenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
