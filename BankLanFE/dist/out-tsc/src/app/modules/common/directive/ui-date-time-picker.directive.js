import * as tslib_1 from "tslib";
import { Directive, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
var UiDateTimePickerDirective = /** @class */ (function () {
    function UiDateTimePickerDirective(ele, ngModel1, datePipe) {
        this.ele = ele;
        this.ngModel1 = ngModel1;
        this.datePipe = datePipe;
        this.onChanged = new EventEmitter();
    }
    UiDateTimePickerDirective.prototype.ngOnInit = function () {
        this.register();
    };
    UiDateTimePickerDirective.prototype.ngOnChanges = function (param) {
        if (param && param.watchField && param.watchField.currentValue && param.watchField.currentValue != param.watchField.previousValue) {
            var date = this.datePipe.transform(new Date(param.watchField.currentValue), 'dd/MM/yyyy');
            $(this.ele.nativeElement).datetimepicker("option", 'minDate', new Date(date));
            $(this.ele.nativeElement).datetimepicker("option", 'maxDate', new Date(date));
            $(this.ele.nativeElement).datetimepicker("setDate", new Date(date));
        }
        if (param && param.ngModel && param.ngModel.currentValue
            && param.ngModel.currentValue != param.ngModel.previousValue) {
            var date = this.datePipe.transform(new Date(param.ngModel.currentValue), 'dd/MM/yyyy HH:mm');
            if (this.ngModel1) {
                this.ngModel1.update.emit(date);
                $(this.ele.nativeElement).datetimepicker("setDate", new Date(date));
            }
        }
    };
    UiDateTimePickerDirective.prototype.isValidDate = function (d) {
        return d instanceof Date && !isNaN(Date.parse(d.toDateString()));
    };
    UiDateTimePickerDirective.prototype.register = function () {
        var _this = this;
        $(this.ele.nativeElement).on('change', function (event) {
            if (_this.ngModel1.model) {
                var date = new Date(_this.ngModel1.model);
                if (!_this.isValidDate(date)) {
                    _this.ngModel1.update.emit('');
                }
                else {
                    var strDate = _this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
                    _this.ngModel1.update.emit(strDate);
                }
            }
        });
        $(this.ele.nativeElement).datetimepicker({
            dateFormat: 'dd/mm/yy HH:mm',
            changeMonth: true,
            changeYear: true,
            controlType: 'select',
            oneLine: true,
            timeFormat: 'HH:mm ',
            showOn: "button",
            minDate: this.isFutureDate ? new Date(this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:00')) : null,
            stepMinute: this.stepMinute ? this.stepMinute : 1,
            yearRange: this.yearRange ? this.yearRange : "-20:+0",
            buttonText: "<i class='la la-calendar'></i>",
            onSelect: function (dateText, inst) {
                this.ngModel1.update.emit(dateText);
                this.onChanged.emit(dateText);
            }.bind(this)
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", NgModel)
    ], UiDateTimePickerDirective.prototype, "ngModel", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], UiDateTimePickerDirective.prototype, "onChanged", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Date)
    ], UiDateTimePickerDirective.prototype, "watchField", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], UiDateTimePickerDirective.prototype, "isFutureDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], UiDateTimePickerDirective.prototype, "yearRange", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], UiDateTimePickerDirective.prototype, "stepMinute", void 0);
    UiDateTimePickerDirective = tslib_1.__decorate([
        Directive({
            selector: '[appUiDateTimePicker]',
            providers: [DatePipe, NgModel]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, NgModel,
            DatePipe])
    ], UiDateTimePickerDirective);
    return UiDateTimePickerDirective;
}());
export { UiDateTimePickerDirective };
//# sourceMappingURL=ui-date-time-picker.directive.js.map