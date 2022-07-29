import { Directive, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Global from '../../../Global';
declare var $: any;

@Directive({
  selector: '[appPagingTable]'
})
export class PagingTableDirective implements AfterViewInit {
  @Input() aoColumnDefs: any;
  @Input() aoColumns: any;
  @Input() aaSorting: any;
  @Input() extraParams: any;
  @Input() serverLink: string;
  @Input() compRef: any;
  @Input() isFilter: boolean;
  @Input() isLengthChange: boolean;
  @Input() setCriteriaFn: any;
  @Input() isRowReorder: boolean = false;
  @Input() indexColReorder: number = 0;
  @Output() tableEvent: EventEmitter<any> = new EventEmitter();
  @Output() onFilterColumn: EventEmitter<any> = new EventEmitter();
  table: any;
  url: string;
  constructor(private ele: ElementRef, private http: HttpClient) {

  }

  ngAfterViewInit() {
    this.url = `${Global.apiUrl}${this.serverLink}`;
    this.registertable();
    this.tableEvent.emit(this.table);
  }

  registertable() {
    this.table = $(this.ele.nativeElement).DataTable({
      responsive: true,
      isRowReorder: this.isRowReorder,
      "bProcessing": true,
      "sAjaxSource": this.url,
      "sPaginationType": "full_numbers",
      "aoColumns": this.aoColumns,
      "aoColumnDefs": this.aoColumnDefs,
      "aaSorting": this.aaSorting,
      "bPaginate": true,
      "iDisplayLength": 20,
      "aLengthMenu": [[20, 50, 100], [20, 50, 100]],
      'bFilter': this.isFilter ? true : false,
      'bSort': true,
      'bInfo': true,
      "bLengthChange": this.isLengthChange != undefined ? this.isLengthChange : true,
      "bServerSide": true,
      "fnServerData": (sSource, aoData, fnCallback) => {
        var criteria = this.compRef[this.setCriteriaFn ? this.setCriteriaFn : "SetCriteria"](aoData);

        return this.http.post(sSource, criteria)
          .subscribe((data: any) => {
            if (data) {
              var dt = data;
              var result = { "aaData": dt.Data, "iTotalRecords": dt.TotalRecords, "iTotalDisplayRecords": dt.TotalRecords };
              fnCallback(result);
            } else {
              fnCallback();
            }
          });
      },
      "drawCallback": (settings) => {
        if (!this.isRowReorder) return;

       
        var rows = this.table.rows({ page: 'current' }).nodes();
        var last = null;
        var totalColumn = this.aoColumns.length;
        this.table.column(this.indexColReorder, { page: 'current' }).data().each(function (group, i) {
          if (last !== group) {
            $(rows).eq(i).before(
              '<tr class="group"><td colspan="' + totalColumn + '"><span class="badge badge-success badge-md">'+group+'</span></td></tr>'
            );
            last = group;
          }
        })
      },
    });
    var id = $(this.ele.nativeElement).attr('id')
     
    $('#' + id + ' tbody').on('mouseover', 'div', function (event) {
      if (event && event.currentTarget) {
        $(event.currentTarget).addClass('show');
      }
    }.bind(this));
    $('#' + id + ' tbody').on('mouseout', 'div', function (event) {
      if (event && event.currentTarget) {
        $(event.currentTarget).removeClass('show');
      }
    }.bind(this));
    $('#' + id + ' tbody').on('click', 'button', function (event) {
      var rowId = $(event.currentTarget.outerHTML).attr('param');
      if (event && event.currentTarget && rowId) {
        var methodName = $(event.currentTarget).attr('method-name');
        if (methodName && this.compRef[methodName]) {
          this.compRef[methodName](rowId);
        }
      }
    }.bind(this));
    $('#' + id + ' tbody').on('click', 'a', function (event) {
      var rowId = $(event.currentTarget.outerHTML).attr('param');
      if (event && event.currentTarget && rowId) {
        var methodName = $(event.currentTarget).attr('method-name');
        if (methodName && this.compRef[methodName]) {
          this.compRef[methodName](rowId);
        }
      }
    }.bind(this));
  }
}
