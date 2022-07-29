import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaraokeRoomInfoComponent } from './karaoke-room-info.component';

describe('KaraokeRoomInfoComponent', () => {
  let component: KaraokeRoomInfoComponent;
  let fixture: ComponentFixture<KaraokeRoomInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaraokeRoomInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaraokeRoomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
