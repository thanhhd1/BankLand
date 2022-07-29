import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DatePipe } from '@angular/common';
var UiDatePickerDirective = /** @class */ (function () {
    function UiDatePickerDirective(ele, ngModel1, datePipe) {
        this.ele = ele;
        this.ngModel1 = ngModel1;
        this.datePipe = datePipe;
        this.onChanged = new EventEmitter();
    }
    UiDatePickerDirective.prototype.ngOnInit = function () {
        this.register();
    };
    UiDatePickerDirective.prototype.validateStrDate = function (testdate) {
        var date_regex = /^\d{2}\/\d{2}\/\d{4}$/;
        return date_regex.test(testdate);
    };
    UiDatePickerDirective.prototype.ngOnChanges = function (param) {
        if (param && param.ngModel && param.ngModel.currentValue && param.ngModel.currentValue != param.ngModel.previousValue) {
            if (this.isRender) {
                return;
            }
            if (!this.isRender) {
                this.isRender = true;
            }
            var date = new Date(param.ngModel.currentValue);
            if (this.isValidDate(date)) {
                var strDate = this.datePipe.transform(date, 'dd/MM/yyyy');
                if (this.ngModel1) {
                    this.ngModel1.update.emit(strDate);
                }
            }
            //this.isRender = false;
        }
    };
    UiDatePickerDirective.prototype.isValidDate = function (d) {
        return d instanceof Date && !isNaN(Date.parse(d.toDateString()));
    };
    UiDatePickerDirective.prototype.register = function () {
        var _this = this;
        $(this.ele.nativeElement).on('change', function (event) {
            _this.isRender = false;
            if (_this.ngModel1.model) {
                var date = new Date(_this.ngModel1.model);
                if (!_this.isValidDate(date)) {
                    _this.ngModel1.update.emit('');
                    _this.onChanged.emit(null);
                }
                else {
                    var strDate = _this.datePipe.transform(date, 'dd/MM/yyyy');
                    _this.ngModel1.update.emit(strDate);
                    _this.onChanged.emit(strDate);
                }
            }
        });
        $(this.ele.nativeElement).datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: this.yearRange ? this.yearRange : "-20:+0",
            minDate: this.isFutureDate ? 0 : null,
            onSelect: function (dateText, inst) {
                this.ngModel1.update.emit(dateText);
                this.onChanged.emit(dateText);
            }.bind(this),
            showButtonPanel: true,
            closeText: 'Clear',
            beforeShow: function (input) {
                setTimeout(function () {
                    var buttons = $('.ui-datepicker-buttonpane').find('button');
                    if (buttons && buttons.length > 0) {
                        for (var i = 0; i < buttons.length; i++) {
                            var btn = buttons[i];
                            if (btn && btn.innerText == 'Clear') {
                                $(btn).unbind('click');
                                $(btn).bind('click', function () {
                                    this.ngModel1.update.emit('');
                                    $(input).val('');
                                    this.onChanged.emit('');
                                }.bind(this));
                            }
                        }
                    }
                }.bind(this), 300);
            }.bind(this)
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", NgModel)
    ], UiDatePickerDirective.prototype, "ngModel", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], UiDatePickerDirective.prototype, "isFutureDate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], UiDatePickerDirective.prototype, "yearRange", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], UiDatePickerDirective.prototype, "onChanged", void 0);
    UiDatePickerDirective = tslib_1.__decorate([
        Directive({
            selector: '[appUiDatePicker]',
            providers: [NgModel, DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, NgModel,
            DatePipe])
    ], UiDatePickerDirective);
    return UiDatePickerDirective;
}());
export { UiDatePickerDirective };
//# sourceMappingURL=ui-date-picker.directive.js.map