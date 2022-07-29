import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dialog) {
        this.dialog = dialog;
    }
    DashboardComponent.prototype.ngOnInit = function () { };
    DashboardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [CommonDialogService])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map