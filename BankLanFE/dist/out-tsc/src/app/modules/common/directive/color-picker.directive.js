import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
var ColorPickerDirective = /** @class */ (function () {
    function ColorPickerDirective(ele, ngModel) {
        var _this = this;
        this.ele = ele;
        this.ngModel = ngModel;
        this.ngModel.valueChanges.subscribe(function (r) {
            if (r)
                $(_this.ele.nativeElement).ColorPickerSetColor(r);
        });
    }
    ColorPickerDirective.prototype.ngAfterViewInit = function () {
        this.register();
    };
    ColorPickerDirective.prototype.register = function () {
        $(this.ele.nativeElement).ColorPicker({
            eventName: 'click',
            onChange: function (hsb, hex, rgb, el) {
                this.ngModel.update.emit("#" + hex);
            }.bind(this)
        });
    };
    ColorPickerDirective = tslib_1.__decorate([
        Directive({
            selector: '[ngModel][appColorPicker]',
            providers: [NgModel]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, NgModel])
    ], ColorPickerDirective);
    return ColorPickerDirective;
}());
export { ColorPickerDirective };
//# sourceMappingURL=color-picker.directive.js.map