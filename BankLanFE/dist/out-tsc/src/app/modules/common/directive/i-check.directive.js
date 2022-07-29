import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
var ICheckDirective = /** @class */ (function () {
    function ICheckDirective(ele, ngModel1) {
        this.ele = ele;
        this.ngModel1 = ngModel1;
        this.IsFirst = false;
        this.onChanged = new EventEmitter();
    }
    ICheckDirective.prototype.ngOnChanges = function (param) {
        if (param && param.ngModel && param.ngModel.currentValue && param.ngModel.currentValue != param.ngModel.previousValue) {
            if (this.IsFirst)
                return;
            this.IsFirst = true;
            var value = param.ngModel.currentValue;
            $(this.ele.nativeElement).iCheck(value ? 'check' : 'uncheck');
        }
    };
    ICheckDirective.prototype.ngAfterViewInit = function () {
        $(this.ele.nativeElement).iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green',
        });
        $(this.ele.nativeElement)
            .on('ifChecked', function (e) {
            this.ngModel1.update.emit(true);
            this.onChanged.emit(true);
        }.bind(this))
            .on('ifUnchecked', function (e) {
            this.ngModel1.update.emit(false);
            this.onChanged.emit(false);
        }.bind(this));
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", NgModel)
    ], ICheckDirective.prototype, "ngModel", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ICheckDirective.prototype, "onChanged", void 0);
    ICheckDirective = tslib_1.__decorate([
        Directive({
            selector: '[appICheck]',
            providers: [NgModel]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, NgModel])
    ], ICheckDirective);
    return ICheckDirective;
}());
export { ICheckDirective };
//# sourceMappingURL=i-check.directive.js.map