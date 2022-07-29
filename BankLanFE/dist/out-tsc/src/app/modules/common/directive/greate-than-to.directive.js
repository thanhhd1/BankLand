import * as tslib_1 from "tslib";
import { Directive, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
var GreateThanToDirective = /** @class */ (function () {
    function GreateThanToDirective() {
    }
    GreateThanToDirective_1 = GreateThanToDirective;
    GreateThanToDirective.prototype.ngOnChanges = function (params) {
        var _this = this;
        if (params && params.gtTo && params.gtTo.currentValue && params.gtTo.currentValue != params.gtTo.previousValue) {
            this.gtTo.valueChanges.subscribe(function (r) {
                if (_this._control) {
                    _this._control.updateValueAndValidity();
                }
            });
        }
    };
    GreateThanToDirective.prototype.validate = function (c) {
        this._control = c;
        if (!c.value)
            return null;
        return c.value > this.gtTo.value ? null : { gtt: true };
    };
    var GreateThanToDirective_1;
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", FormControl)
    ], GreateThanToDirective.prototype, "gtTo", void 0);
    GreateThanToDirective = GreateThanToDirective_1 = tslib_1.__decorate([
        Directive({
            selector: '[appGreateThanTo]',
            providers: [
                {
                    provide: NG_VALIDATORS, useExisting: forwardRef(function () { return GreateThanToDirective_1; }),
                    multi: true
                }
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GreateThanToDirective);
    return GreateThanToDirective;
}());
export { GreateThanToDirective };
//# sourceMappingURL=greate-than-to.directive.js.map