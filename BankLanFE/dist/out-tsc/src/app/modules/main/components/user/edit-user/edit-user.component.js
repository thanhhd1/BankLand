import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
var EditUserComponent = /** @class */ (function (_super) {
    tslib_1.__extends(EditUserComponent, _super);
    function EditUserComponent(authService, router, activeRouter) {
        var _this = _super.call(this, authService) || this;
        _this.router = router;
        _this.activeRouter = activeRouter;
        _this.id = '';
        _this.closeModal = new EventEmitter();
        _this.isFirstHACClick = false;
        activeRouter.params.subscribe(function (r) {
            _this.id = r['{id}'];
        });
        return _this;
    }
    EditUserComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], EditUserComponent.prototype, "closeModal", void 0);
    EditUserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.component.html',
            styleUrls: ['./edit-user.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            Router,
            ActivatedRoute])
    ], EditUserComponent);
    return EditUserComponent;
}(BaseComponent));
export { EditUserComponent };
//# sourceMappingURL=edit-user.component.js.map