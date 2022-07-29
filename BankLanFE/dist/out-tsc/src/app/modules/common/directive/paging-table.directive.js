import * as tslib_1 from "tslib";
import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Global from '../../../Global';
var PagingTableDirective = /** @class */ (function () {
    function PagingTableDirective(ele, http) {
        this.ele = ele;
        this.http = http;
        this.isRowReorder = false;
        this.indexColReorder = 0;
        this.tableEvent = new EventEmitter();
        this.onFilterColumn = new EventEmitter();
    }
    PagingTableDirective.prototype.ngAfterViewInit = function () {
        this.url = "" + Global.apiUrl + this.serverLink;
        this.registertable();
        this.tableEvent.emit(this.table);
    };
    PagingTableDirective.prototype.registertable = function () {
        var _this = this;
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
            "fnServerData": function (sSource, aoData, fnCallback) {
                var criteria = _this.compRef[_this.setCriteriaFn ? _this.setCriteriaFn : "SetCriteria"](aoData);
                return _this.http.post(sSource, criteria)
                    .subscribe(function (data) {
                    if (data) {
                        var dt = data;
                        var result = { "aaData": dt.Data, "iTotalRecords": dt.TotalRecords, "iTotalDisplayRecords": dt.TotalRecords };
                        fnCallback(result);
                    }
                    else {
                        fnCallback();
                    }
                });
            },
            "drawCallback": function (settings) {
                if (!_this.isRowReorder)
                    return;
                var rows = _this.table.rows({ page: 'current' }).nodes();
                var last = null;
                var totalColumn = _this.aoColumns.length;
                _this.table.column(_this.indexColReorder, { page: 'current' }).data().each(function (group, i) {
                    if (last !== group) {
                        $(rows).eq(i).before('<tr class="group"><td colspan="' + totalColumn + '"><span class="badge badge-success badge-md">' + group + '</span></td></tr>');
                        last = group;
                    }
                });
            },
        });
        var id = $(this.ele.nativeElement).attr('id');
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
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PagingTableDirective.prototype, "aoColumnDefs", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PagingTableDirective.prototype, "aoColumns", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PagingTableDirective.prototype, "aaSorting", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PagingTableDirective.prototype, "extraParams", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], PagingTableDirective.prototype, "serverLink", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PagingTableDirective.prototype, "compRef", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PagingTableDirective.prototype, "isFilter", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PagingTableDirective.prototype, "isLengthChange", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], PagingTableDirective.prototype, "setCriteriaFn", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], PagingTableDirective.prototype, "isRowReorder", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], PagingTableDirective.prototype, "indexColReorder", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PagingTableDirective.prototype, "tableEvent", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], PagingTableDirective.prototype, "onFilterColumn", void 0);
    PagingTableDirective = tslib_1.__decorate([
        Directive({
            selector: '[appPagingTable]'
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, HttpClient])
    ], PagingTableDirective);
    return PagingTableDirective;
}());
export { PagingTableDirective };
//# sourceMappingURL=paging-table.directive.js.map