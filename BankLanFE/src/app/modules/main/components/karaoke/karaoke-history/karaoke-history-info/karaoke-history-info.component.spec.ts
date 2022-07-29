import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeHistoryInfoComponent } from './karaoke-history-info.component';

describe('KaraokeHistoryInfoComponent', () => {
  let component: KaraokeHistoryInfoComponent;
  let fixture: ComponentFixture<KaraokeHistoryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaraokeHistoryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
