import {
  Component,
  OnInit,
  forwardRef,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm } from '@angular/forms';
const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateTimePickerComponent),
  multi: true
};
declare var $: any;
@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  providers: [TYPE_CONTROL_ACCESSOR, DatePipe]
})
export class DateTimePickerComponent
  implements AfterViewInit, ControlValueAccessor, OnDestroy {
  @Input() hasTime: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() placeholder: string = '';
  @ViewChild('dapicker') dapicker: ElementRef;
  @ViewChild('tapicker') tapicker: ElementRef;
  isNeedOnSet: boolean = true;
  isNeedOnSetTime: boolean = true;
  isFirst: boolean = false;
  public value: string;
  private onTouch: any = () => { };
  private onModelChange: any = () => { };
  constructor(private datePipe: DatePipe, private ele: ElementRef) {

  }

  ngAfterViewInit() {
    this.isFirst = true;
    this.register();
  }

  ngOnDestroy() {
    //this.isFirst = true;
  }

  register() {
    if (this.hasTime) {
      $(this.tapicker.nativeElement).pickatime({
        // Escape any “rule” characters with an exclamation mark (!).
        format: ' HH:i',
        formatLabel: 'HH:i',
        formatSubmit: 'HH:i',
        hiddenPrefix: 'prefix__',
        hiddenSuffix: '__suffix',
        onSet: function (event) {
          if (event && event.hasOwnProperty('clear')) { 
            return;
          }
          if (event != undefined) {
            if (event.select != undefined) {
              //get date selected 
              var date = this.value;
              date = date ? new Date(this.datePipe.transform(date, 'MM/dd/yyyy'))
                : new Date(this.datePipe.transform(new Date(), 'MM/dd/yyyy'));
              var totalHours = Math.floor(event.select / 60);
              var totalMinutes = (event.select % 60);
              date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), totalHours, totalMinutes);
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
        if (event && event.hasOwnProperty('clear')) { 
          this.writeValue(null);
          return;
        }

        
        if (event) {
          if (event.select) {
            var date = new Date(event.select);
            //get time of timepicker
            var time = this.value;
            if (time != undefined) {
              time = new Date(this.value);
              var hour = time.getHours() ? time.getHours() : 0;
              var minute = time.getMinutes() ? time.getMinutes() : 0;
              date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
            }
            this.writeValue(date);
          }
          else {
            if (event.highlight && event.highlight.length == 3) {
              var dateHL = new Date(event.highlight[0], event.highlight[1], event.highlight[2]);
              this.writeValue(dateHL);
              $(this.dapicker.nativeElement).pickadate('picker').set('select', dateHL);
            }
            else {
              this.writeValue(null);
              $(this.dapicker.nativeElement).pickadate('picker').clear();
              //clear time 
              if (this.hasTime) {
                $(this.tapicker.nativeElement).pickatime('picker').clear();
              }
            }
          }
        }
      }.bind(this)
    });
  }

  writeValue(obj: any): void {
    if (obj && !(obj instanceof Date)) {
      obj = new Date(obj);
    }
    this.value = obj;
    this.onModelChange(obj);
    this.onTouch(obj);
    if (obj && this.isFirst) {
      this.isFirst = false;
      $(this.dapicker.nativeElement)
        .pickadate('picker')
        .set('select', obj);
      if (this.hasTime)
        $(this.tapicker.nativeElement)
          .pickatime('picker')
          .set('select', obj.getHours() * 60 + obj.getMinutes());
    }
    else if (!this.isFirst && !obj) {
      this.isFirst = true;
      $(this.dapicker.nativeElement).pickadate('picker').clear();
      //clear time 
      if (this.hasTime) { 
        $(this.tapicker.nativeElement).pickatime('picker').clear();
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
