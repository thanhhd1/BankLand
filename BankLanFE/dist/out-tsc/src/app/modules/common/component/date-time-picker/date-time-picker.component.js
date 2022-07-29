import * as tslib_1 from "tslib";
import { Component, forwardRef, ElementRef, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var TYPE_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DateTimePickerComponent; }),
    multi: true
};
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(datePipe, ele) {
        this.datePipe = datePipe;
        this.ele = ele;
        this.hasTime = true;
        this.isDisabled = false;
        this.placeholder = '';
        this.isFirst = false;
        this.onTouch = function () { };
        this.onModelChange = function () { };
    }
    DateTimePickerComponent.prototype.ngAfterViewInit = function () {
        this.isFirst = true;
        this.register();
    };
    DateTimePickerComponent.prototype.register = function () {
        if (this.hasTime) {
            $(this.tapicker.nativeElement).pickatime({
                // Escape any “rule” characters with an exclamation mark (!).
                format: ' HH:i',
                formatLabel: 'HH:i',
                formatSubmit: 'HH:i',
                hiddenPrefix: 'prefix__',
                hiddenSuffix: '__suffix',
                interval: 10,
                onSet: function (event) {
                    this.isFirst = false;
                    if (event != undefined) {
                        if (event.select != undefined) {
                            //get date selected
                            var date = this.value;
                            date = date
                                ? new Date(this.datePipe.transform(date, 'MM/dd/yyyy'))
                                : new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy'));
                            var totalHours = Math.floor(event.select / 60);
                            var totalMinutes = event.select % 60;
                            date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), totalHours, totalMinutes);
                            this.writeValue(new Date(date));
                        }
                        else {
                            this.writeValue(null);
                        }
                    }
                }.bind(this)
            });
        }
        $(this.dapicker.nativeElement).pickadate({
            // Strings and translations
            monthsFull: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12'
            ],
            monthsShort: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12'
            ],
            weekdaysFull: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            // Buttons
            today: 'Hôm Nay',
            clear: 'Xoá',
            close: 'Đóng',
            labelMonthNext: 'Tháng Sau',
            labelMonthPrev: 'Tháng Trước',
            labelMonthSelect: 'Chọn Tháng',
            labelYearSelect: 'Chọn Năm',
            selectMonths: true,
            selectYears: 120,
            format: 'dd/mm/yyyy',
            onSet: function (event) {
                this.isFirst = false;
                if (event) {
                    if (event.select) {
                        var date = new Date(event.select);
                        //get time of timepicker
                        var time = this.value;
                        if (time != undefined) {
                            time = new Date(this.value);
                            var hour = time.getHours() ? time.getHours() : 0;
                            var minute = time.getMinutes() ? time.getMinutes() : 0;
                            date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), hour, minute);
                        }
                        this.writeValue(date);
                    }
                    else {
                        this.writeValue(null);
                        //clear time
                        if (this.hasTime) {
                            $('#tapicker')
                                .pickatime('picker')
                                .clear();
                        }
                    }
                }
            }.bind(this)
        });
    };
    DateTimePickerComponent.prototype.writeValue = function (obj) {
        if (obj && !(obj instanceof Date)) {
            obj = new Date(obj);
        }
        this.value = obj;
        this.onModelChange(obj);
        this.onTouch(obj);
        if (obj && this.isFirst) {
            $('#dapicker')
                .pickadate('picker')
                .set('select', obj);
            if (this.hasTime)
                $('#tapicker')
                    .pickatime('picker')
                    .set('select', obj.getHours() * 60 + obj.getMinutes());
        }
    };
    DateTimePickerComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    DateTimePickerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouch = fn;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], DateTimePickerComponent.prototype, "hasTime", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], DateTimePickerComponent.prototype, "isDisabled", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateTimePickerComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        ViewChild('dapicker'),
        tslib_1.__metadata("design:type", ElementRef)
    ], DateTimePickerComponent.prototype, "dapicker", void 0);
    tslib_1.__decorate([
        ViewChild('tapicker'),
        tslib_1.__metadata("design:type", ElementRef)
    ], DateTimePickerComponent.prototype, "tapicker", void 0);
    DateTimePickerComponent = tslib_1.__decorate([
        Component({
            selector: 'app-date-time-picker',
            templateUrl: './date-time-picker.component.html',
            styleUrls: ['./date-time-picker.component.css'],
            providers: [TYPE_CONTROL_ACCESSOR, DatePipe]
        }),
        tslib_1.__metadata("design:paramtypes", [DatePipe, ElementRef])
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
//# sourceMappingURL=date-time-picker.component.js.map