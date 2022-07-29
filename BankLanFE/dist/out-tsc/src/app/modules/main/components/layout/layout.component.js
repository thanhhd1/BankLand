import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
var LayoutComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LayoutComponent, _super);
    function LayoutComponent(authService) {
        var _this = _super.call(this, authService) || this;
        _this.stringChange = new Date().toJSON();
        return _this;
    }
    LayoutComponent.prototype.ngOnInit = function () {
        $('body').attr('class', 'horizontal-layout horizontal-menu 2-columns');
        $('body').attr('data-col', '2-column');
    };
    LayoutComponent.prototype.changeMode = function (event) {
        this.stringChange = new Date().toJSON();
    };
    LayoutComponent.prototype.changepassword = function () {
        if (this.currentUser) {
        }
    };
    LayoutComponent = tslib_1.__decorate([
        Component({
            selector: '[app-layout]',
            templateUrl: './layout.component.html',
            styleUrls: ['./layout.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], LayoutComponent);
    return LayoutComponent;
}(BaseComponent));
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map