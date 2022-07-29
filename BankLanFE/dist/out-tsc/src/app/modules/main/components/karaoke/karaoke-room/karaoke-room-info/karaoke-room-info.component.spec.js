import { async, TestBed } from '@angular/core/testing';
import { KaraokeRoomInfoComponent } from './karaoke-room-info.component';
describe('KaraokeRoomInfoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [KaraokeRoomInfoComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(KaraokeRoomInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=karaoke-room-info.component.spec.js.map