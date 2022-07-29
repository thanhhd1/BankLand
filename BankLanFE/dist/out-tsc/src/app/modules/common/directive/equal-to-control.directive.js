import * as tslib_1 from "tslib";
import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
var EqualToControlDirective = /** @class */ (function () {
    function EqualToControlDirective() {
    }
    EqualToControlDirective_1 = EqualToControlDirective;
    EqualToControlDirective.prototype.ngOnChanges = function (params) {
        var _this = this;
        if (params && params.gtTo && params.gtTo.currentValue && params.gtTo.currentValue != params.gtTo.previousValue) {
            this.equalControl.valueChanges.subscribe(function (r) {
                if (_this._control) {
                    _this._control.updateValueAndValidity();
                }
            });
        }
    };
    EqualToControlDirective.prototype.validate = function (c) {
        this._control = c;
        if (!c.value)
            return null;
        return c.value === this.equalControl.value ? null : { equalC: true };
    };
    var EqualToControlDirective_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormControl)
    ], EqualToControlDirective.prototype, "equalControl", void 0);
    EqualToControlDirective = EqualToControlDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[appEqualToControl]',
            providers: [
                {
                    provide: NG_VALIDATORS, useExisting: forwardRef(function () { return EqualToControlDirective_1; }),
                    multi: true
                }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], EqualToControlDirective);
    return EqualToControlDirective;
}());
export { EqualToControlDirective };
//# sourceMappingURL=equal-to-control.directive.js.map